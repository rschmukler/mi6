(function(global, module) {

  var mi6 = function(obj, target) {
    if(!target) return new Spy(obj);

    var original = obj[target];
    var spy = new Spy(obj[target], obj);
    obj[target] = spy;

    spy.restore = function() {
      obj[target] = original;
    };
    return spy;
  };

  function Spy(fn, ctx) {
    if(!(this instanceof Spy)) return new Spy(fn);
    var spy = function() {
      var args = Array.prototype.slice.call(arguments);
      spy._calledWith = args;
      spy._called++;
      if(spy._fn && spy._returns) throw new Error("Ambiguous configuration, #calls and #returns called");
      if(spy._fn) return spy._fn.apply(this, args);
      if(spy._returns) return spy._returns;
    };
    spy = spy.bind(ctx || spy);
    spy._original = fn;
    spy._called = 0;
    mixin(spy, Spy.prototype);
    return spy;
  }

  // Behavior methods

  Spy.prototype.calls = function(fn) {
    this._fn = fn;
    return this;
  };

  Spy.prototype.callsThrough = function() {
    this._fn = this._original;
    return this;
  };

  Spy.prototype.returns = function(val) {
    this._returns = val;
    return this;
  };

  // Testing Methods

  Spy.prototype.called = function () {
    return this._called > 0;
  };

  Spy.prototype.callCount = function () {
    return this._called;
  };

  Spy.prototype.calledWith = function () {
    var args = Array.prototype.slice.call(arguments),
        calledWith = this._calledWith;

    if(!calledWith) throw new Error("Attempted to call calledWith() before calling spy");
    if(!args.length) {
      return calledWith;
    } else {
      if(!this._called) return false;
      var result = true;
      args.forEach(function(val, index) {
        if(val !== calledWith[index]) result = false;
      });
      return result;
    }
  };

  // Manipulation methods

  Spy.prototype.reset = function() {
    this._called = 0;
    this._calledWith = undefined;
    return this;
  };

  mi6.Spy = Spy;

  module.exports = mi6;

  function mixin(dest, src) {
    Object.getOwnPropertyNames(src).forEach(function(key) {
      dest[key] = src[key];
    });
  }

  if('undefined' != typeof window) {
    window.mi6 = module.exports;
  }
})(this, 'undefined' != typeof module ? module : {exports: {}} );

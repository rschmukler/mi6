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

module.exports = Spy;

function mixin(dest, src) {
  Object.getOwnPropertyNames(src).forEach(function(key) {
    dest[key] = src[key];
  });
}

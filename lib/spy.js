function Spy(fn) {
  if(!(this instanceof Spy)) return new Spy(fn);
  this._original = fn;
  var spy = function() {
  };
  spy.prototype = Spy.prototype;
  spy.__proto__ == spy.prototype;

  return spy;
}

Spy.prototype.call = function(fn) {
  debugger;
  this._fn = fn;
};

module.exports = Spy;

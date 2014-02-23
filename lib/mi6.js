var Spy = require('./spy.js');

var mi6 = function(obj, target) {
  if(!target) return new Spy(obj);

  var original = obj[target];
  var spy = new Spy(obj[target]);
  obj[target] = spy;

  spy.restore = function() {
    obj[target] = original;
  };
  return spy;
};

mi6.Spy = Spy;

module.exports = mi6;

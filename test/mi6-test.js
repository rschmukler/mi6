var expect = require('expect.js');

var mi6 = require('../');

describe('mi6', function() {
  it('exposes the Spy class', function() {
    expect(mi6.Spy).to.be.a(Function);
  });

  it('instantiates spys when called with a function', function() {
    var fn = function() {};
    expect(mi6(fn).calls).to.be.a(Function);
  });

  describe('target and object', function() {
    it('overwrites a function on an object', function() {
      var obj = {
        fn: function() { }
      };
      var spy = mi6(obj, 'fn');
      expect(obj.fn).to.be(spy);
    });

    it('maintains context', function() {
      var obj = {
        name: 'Tom',
        fn: function() { this.fnA(this.name); },
        fnA: function() { }
      };

      mi6(obj, 'fn').callsThrough();
      var fnA = mi6(obj, 'fnA');
      obj.fn();
      expect(fnA.calledWith()).to.be('Tom');

      var User = function() {
        this.name = 'Bob';
      };

      User.prototype.sayName = function() {
        this.say(this.name);
      };

      User.prototype.say = function(name) {
      };

      var bob = new User();
      mi6(User.prototype, 'sayName').callsThrough();
      var say = mi6(User.prototype, 'say').callsThrough();
      bob.sayName();
      expect(say.calledWith()).to.be('Bob');
    });

    it('exposes a restore method on a spy', function() {
      var obj = {
        fn: function() { }
      };
      var original = obj.fn;
      var spy = mi6(obj, 'fn');
      spy.restore();
      expect(obj.fn).to.be(original);
    });
  });
});

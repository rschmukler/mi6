var expect = require('expect.js');

var Spy = require('../lib/spy.js');

describe('Spy', function() {
  describe('contructor', function() {
    it('returns a spy', function() {
      var spy = new Spy();
      expect(spy).to.be.a(Function);
    });
    it('can be called without new', function() {
      var spy = Spy();
      expect(spy).to.be.a(Function);
    });
  });

  describe('call', function() {
    it('sets the _fn', function() {
      var spy = new Spy(),
          bogus = function() { };

      spy.call(bogus);
      expect(spy._fn).to.be(bogus);
    });
  });
});

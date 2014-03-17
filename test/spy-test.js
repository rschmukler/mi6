var expect = require('expect.js');

var Spy = require('../').Spy;

describe('Spy', function() {
  var spy;
  beforeEach(function() {
    spy = new Spy();
  });
  describe('contructor', function() {
    it('returns a spy', function() {
      expect(spy).to.be.a(Function);
    });

    it('can be called without new', function() {
      spy = Spy();
      expect(spy).to.be.a(Function);
    });

    it('sets the original fn', function() {
      var a = function() { };
      var spy = new Spy(a);
      expect(spy._original).to.be(a);
    });
  });

  it('errors if you misconfigure a spy', function() {
    var spy = new Spy();
    spy.returns(1).calls(function() { return 2; });
    expect(spy).to.throwError();
  });

  describe('#calls', function() {
    it('sets the _fn', function() {
      var called = false;
      var bogus = function() { called = true; };
      spy.calls(bogus);
      spy();
      expect(called).to.be(true);
    });

    it('returns the spy', function() {
      expect(spy.calls()).to.be(spy);
    });
  });

  describe('#callsThrough', function() {
    it('sets the _fn to _original', function() {
      var called = false;
      var bogus = function() { called = true; };
      var spy = new Spy(bogus);
      spy.callsThrough();
      spy();
      expect(called).to.be(true);
    });

    it('returns the spy', function() {
      expect(spy.callsThrough()).to.be(spy);
    });
  });

  describe('#returns', function() {
    it('sets _returns', function() {
      spy.returns(1);
      var result = spy();
      expect(result).to.be(1);
    });

    it('works with falsy values', function() {
      spy.returns(0);
      var result = spy();
      expect(result).to.be(0);
    });

    it('returns the spy', function() {
      expect(spy.returns()).to.be(spy);
    });
  });

  describe('#called', function() {
    it('returns _called', function() {
      spy();
      expect(spy.called()).to.be(true);
    });
  });

  describe('#callCount', function() {
    it('returns the number of times called', function() {
      spy();
      spy();
      spy();
      expect(spy.callCount()).to.be(3);
    });
  });

  describe('#calledWith', function() {
    it('throws an error if the spy has not been called', function() {
      expect(spy.calledWith).to.throwError();
    });

    it('returns a single item if only zero or one argument', function() {
      spy();
      expect(spy.calledWith()).to.be(undefined);
      spy(1);
      expect(spy.calledWith()).to.be(1);
    });

    it('returns _calledWith with no arguments', function() {
      spy(1, 2, 3);
      expect(spy.calledWith()).to.eql([1, 2, 3]);
    });

    describe('with arguments', function() {
      it('throws an error if the spy has not been called', function() {
        expect(spy.calledWith.bind(this, 1)).to.throwError();
      });

      it('returns false if no equality with arguments', function() {
        spy(2);
        expect(spy.calledWith(1)).to.be(false);
      });

      it('returns true if equality with arguments', function() {
        spy(1, 2, 3);
        expect(spy.calledWith(1, 2, 3)).to.be(true);
      });
    });
  });

  describe('#reset', function() {
    it('resets _called', function() {
      spy();
      spy.reset();
      expect(spy.called()).to.be(false);
    });

    it('resets _calledWith', function() {
      spy(2);
      spy.reset();
      expect(spy.calledWith).to.throwError();
    });
    it('returns the spy', function() {
      expect(spy.reset()).to.be(spy);
    });
  });
});

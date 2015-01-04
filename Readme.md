# mi6
[![Build Status](https://api.travis-ci.org/rschmukler/mi6.png)](http://travis-ci.org/rschmukler/mi6)

A library for making spies.

## Example

```js
var Mi6 = require('mi6');
var spy = Mi6();

spy.returns(25)
// or
spy.calls(function() {
  return 25;
});
```
```js
var spy = Mi6(someFn);
spy.callsThrough();

spy(25);

expect(spy.calledWith(25)).to.be(true);
expect(spy.calledWith()).to.be(25);
expect(spy.called()).to.be(true);

spy();
expect(spy.calledWith()).to.be(undefined);

spy(1, 2, 3);
expect(spy.calledWith()).to.eql([1, 2, 3]);
expect(spy.calledWith(1, 2, 3)).to.be.ok();
expect(spy.callCount()).to.be(2);
```

### Building Spies

Mi6 exposes helpers to overwrite methods on objects, and later restore them.

```js
var Obj = {
  fn: function() { }
};
var Mi6 = require('mi6');

var spy = Mi6(Obj, 'fn');

spy.returns(5);
Obj.fn(); // returns 5;

Obj.fn.restore() // Restores fn to original fn
```


If a spy was created this way, you may later restore the original function on the object by calling `spy.restore()`.

### Working with Spies

#### Configuring Behavior
##### #calls(fn)

Makes a spy call `fn`.

```js
var Spy = require('mi6').Spy;
var spy = new Spy();
var called = false;
spy.calls(function() { 
  called = true;
  return 2
});
spy(); // returns 2, called == true;
```

##### #callsThrough()

Makes a spy call the function it was initiantiated with.

```js
var original = function() {
  return 5;
};
var spy = new Spy(original);
spy.callsThrough();
spy() == 5; // true
```

##### #returns(val)

Has a spy return a value rather than call a function.

```js
var spy = new Spy();
spy.returns(5);
spy() == 5; // true
```

#### Testing Methods

##### #called()

Returns `true` if spy has been called, otherwise returns `false`.

```js
var spy = new Spy();
spy();
expect(spy.called()).to.be(true);
```

##### #callCount()

Returns `num` where num is the number of times spy has been called.

```js
var spy = new Spy();
spy();
spy();
spy();
expect(spy.callCount()).to.be(3);
```

##### #calledWith(...args)

If `...args` is not specified, returns an array of what the spy was called with.

If `...args` is specified, returns `true` if the spy was called with those arguments, otherwise it returns `false`.

```js
var spy = new Spy();
spy(1);
expect(spy.calledWith()).to.eql([1]);
spy(2, 3);
expect(spy.calledWith(2, 3)).to.be(true);
```

#### Manipulation methods

##### #reset()

Resets the states of the spy for things like `called`, `callCount` and `calledWith`.

```js
var spy = new Spy();
spy(1);
spy.reset();
expect(spy.called()).to.be(false);
expect(spy.calledWith()).to.be(undefined);
```

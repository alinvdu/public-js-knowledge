**********************************************************************************************************************************************************
***********************************************************  Functional Programming Patterns *************************************************************
**********************************************************************************************************************************************************

Since functional programming doesnt have patterns per se (like OOP does) we are just going to highlight concepts and principles that are very useful
in functional programming (can be seen as patterns to implement).

1) Hexagonal Architecture in functional programming

** Hexagonal architecture:
    * Hexagonal Architecture (also called ports and adapters architecture) is an idea about structuring your application around the domain code.
    The main goal is that your business logic is the most important part of the application and it should be very loosely coupled with technical
    details like database or user interface.

    * ports represent side effects in your application and are decoupled from the business logic.

** Simple example of how ports can be used

const ProcessingCustomerCart = ports => {
    let cartItems = [];

    return {
        addItemToCart(item) {
            const cartItemsWithAddedItem = cartItems.concat([item]);
            if (10 < cartItemsWithAddedItem.length) {
                ports.cartErrorHappened("Too many items");
            } else {
                cartItems = cartItemsWithAddedItem;.
                ports.cartItemsAdded(cartItemsWithAddedItem, item);
            }
        },
        cartItemsConfirmed() {
            ports.cartItemsConfirmed(cartItems);
        }
    }
}

** Why dispatcher in certain implementation ?
- Passing messages through ports object is often replaced with different technical solutions. Global event bus
for multi-hex communication. Objects like dispatcher (generally glue objects) are responsible for defining what to do with outbound messages from the
use case and inbound messages to it.


2) First class functions
Functions in Javascript are first class (or first class citizen). Functions behave just like everyone else, in other words, you can treat functions
like any other data type and there is nothing particularly special about them - can be stored in arrays, passed around as function parameters, assigned to
variables, and so on.

This enables programmers to do all sort of function composition and mechanisms.
- Easier to implement high order functions.
- Removes unnecessary functions.

3) High Order Component:
   Generally speaking, a function that either takes functions as arguments, or returns a function, or both, is referred to as a “higher-order” function.

   ** Specific high order component:
        1) ** Combinator - Higher-order pure functions that take only functions as arguments and return a function.

            Example of compose combinator:
                const compose = (a, b) =>
                    (c) => a(b(c))

        2) ** Function Decorators:
            A function decorator is a higher-order function that takes one function as an argument, returns another function, and the returned function
            is a variation of the argument function

            Example:
                const not = (fn) => (x) => !fn(x)

4) Pure functions
    Function that given the same input will always return the same output and doesnt have any side effects.
    Ideally speaking, pure functions are functions that dont contain any free variables.

5) Composable functions heaven
Functional programming takes advantage of composing functions and exposes some concepts to help: currying, partial application, high order functions, functors,
monads.

For example Ramda is a library which automatically curries every function. You can compose several functions and apply them later, when you want to. Suppose
the following example:

const toUppercaseGrettings = R.compose(r.toUpper, (firstName, lastName) => ("Hey" + firstName + lastName));
toUppercaseGreetings("yo", "hey"); // yields "HEY YO HEY"

a) Functors - a functor is a type that implements map and obeys some laws. Strictly speaking functors come from category theory and what they usually do is
implement map (they take each values from a category / data -> transform it -> and returns them into a new structure).

A small example of error handling done in Functional Programming (same is done in Scala)

Either - either in FP helps us battle error handling.

var Left = (x) => {
    this.__value = x;
}

Left.of = (x) => new Left(x);

Left.prototype.map = f => this;

var Right = (x) => {
    this.__value = x;
}

Right.of = (x) => new Right(x);

Right.prototype.map = f => Right.of(f(this.__value));

Left Right are subclasses of an abstract type Either. They can be used as:
var getAge = curry(function(now, user) {
    var birthDay = moment(user.birthDate, 'YYYY-MM-DD');
    if (!birthdate.isValid()) return Left.of('Birthday cannot be parsed');
    return Right.of(now.diff(birthdate, 'years'));
});

var either = curry(function(f, g, e) {
    switch (e.constructor) {
        case Left:
            return f(e.__value);
        case Right
            return g(e.__value);
    }
})

Lifting - transforming a a function from a non-functory to a functory one. It can be accomplished for example surrounding it by map.

Side effects - meet IO

var IO = function(f) {
    this.__value = f;
};

IO.of = function(x) {
    return new IO(function() {
        return x;
    });
};

IO.prototype.map = function(f) {
    return new IO(_.compose(f, this.__value))
}

IO is a functor that differs from previous functors in that __value is always a function.

The caller is in charge of taking effects into considerations. Until then the functors are pure.

Functors can be composed. Here is a nice compose pattern:

var Compose = function(f_g_x) {
    this.getCompose = f_g_x;
}

// takes care of map(map()) nest
Compose.prototype.map = function(f) {
    return new Compose(map(map(f), this.getCompose));
}

// Task is an external library similar to promises from Folktale
var tmd = Task.of(Maybe.of('Rock over London'));

var ctmd = new Compose(tmd);

map(concat(', rock on, Chicago'), ctmd);
// Compose(Task(Maybe('Rock over London, rock on, Chicago)))

Meet monads -> Monads are pointed functors that can flatten
- what are pointed functors? Pointed functor is a function with an of method as shown above (of -> return new Something(function() {}))

-> any functor which defines a join method, has an of method and obeys a few law is a monad

Whats up with the join method? Well the thing with functors is that when you want to compose them you want to grab that something inside them and map and compose
again, same goes for functors with side effects, eg. IO(IO('something')) -> you would need to map(map()).

var mmo = Maybe.of(Maybe.of('something'))
// Maybe(Maybe('something))

mmo.join()
// Maybe('something)

- join in this cases flatten, they take a nested structure and output a flatten one.
join depends on the type of functor, for Maybe join looks like this:

Maybe.prototype.join = function() {
    return this.isNothing ? Maybe.of(null) : this.__value;
}

in most of the cases what we really do is m.map(f).join() which is incorporated as chain or flatMap
->
var chain = curry(function(f, m) {
    return m.map(f).join(); // or compose(join, map(f))(m);
})


Wooow! The ability to apply functors to each other -> Applicative Functors.

// YOU can't do this
add(Container.of(2), Container.of(3)) -> impossible, numbers are wrapped.

// so you could do
Container.of(2).chain(function(two) {
    return Container.of(3).map(add(two));
})

// which basically unrwaps 2 and applies it to 3

ap is a function that can apply the function contents of one functor to the value contents of another.

// looks like
Container.prototype.ap = function(other_container) {
    return other_container.map(this.__value);
}

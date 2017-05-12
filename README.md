```
    __   __  _____   
   / /  / / / ___ \   
  / /  / / / /  / /      (Logo inpiration from  MostJS https://github.com/cujojs/most)
 / /__/ / / /  / /      
 \_____/ /_/  /_/
```

# un.js
unframework for universal uncomponents

### Contributions and Feedback are highly welcome!

## Quick start

Install with

```sh
$ yarn add un.js (or npm install un.js -S)
```
and try the [active counter example](https://github.com/dmitriz/un/tree/master/examples/active-counter) or read the introduction below

## Philosophy

- Write your business logic as pure functions with no external dependencies
- No side-effects, testable by your favorite test runners
- No external imports, no packages, no libraries
- No extension of proprietary component classes (Backbone, React, ...)
- No lock-ins, your uncomponents should be usable as plugins with or without any framework
- Reuse your code and share with others accross frameworks with no boundaries


## Why unframework?

- Frameworks try to provide and cater for everything, `un` tries the opposite - give you the maximal possible freedom.

- Frameworks try to tell you exactly what to do, `un` tries the opposite - staying out of your way.

- Frameworks make your code coupled with proprietary syntax, `un` lets you write your code with plain JavaScript functions, undistinguishable from any other functions. There is not a single trace of `un` in any of your functions.

- Frameworks often like you to inherit from their proprietary classes, `un` tries to help you embrace the pure functional style and minimise use of classes and `this`. However, this is merely suggestive. Giving you maximum freedom and staying out of your way is a higher priority for `un`.


## What is provided?

Currently a single tiny factory function called `createMount`. [See here the complete code.](https://github.com/dmitriz/un/blob/master/index.js) Its role is similar to `React.render`, in which you would typically see it in only few places in your app. 

Here is a usage example. Instead of learning new API, new framework or long set of new methods, your simply import your favorite familiar libraries that you are already using anyway:


```js
const mount = createMount({	

	// your favorite stream factory
	// mithril/stream, TODO: flyd, most, xstream
	createStream: require("mithril/stream"),

	// your favorite element creator
	// mitrhil, TODO: (React|Preact|Inferno).createElement, snabbdom/h, hyperscript
	createElement: require('mithril'),

	// your favorite create tags helpers (optional)
	createTags: require('hyperscript-helpers'),

	// mithril.render, TODO: (React|Preact|Inferno).render, snabbdom-patch, replaceWith
	createRender: element => vnode => require('mithril').render(element, vnode)
})
```

So instead of having external dependencies in *every file*, 
`un` simply lets you provide those libraries **once** and return the `mount` function, the only function from `un` that you need. The role of the `mount` is similar (and inspired by) [`Mithril` `m.mount`](https://mithril.js.org/mount.html) or `React.render` with auto-redrawing facility. Our key vision is, attaching a live component to an element should be as simple as calling a function and `mount` does exactly that:


```js
// mount our live uncomponent and get back its writeable stream of actions
const actions = mount({ element, reducer, view, initState})
```

So we call `mount` with 4 basic properties:

- `element`: HTML element, where we attaching our uncomponent, similar to `React.render` the element's content will be overwritten

- `reducer`: Redux style reducer from our model logic

- `view`: Plain pure function taking `dispatcher` and `state` and returning new `state`, the state can be global, narrowed down, or completely local to the uncomponent, to cater for the [fractal architecture](https://staltz.com/unidirectional-user-interface-architectures.html). The view function dispatches actions just like in Redux and returns a virtual or real DOM element, depending on the library used in configuring the `mount`. But to be completely pure with no external dependency, the `view` must include the element creator factory as one of its parameters:

```js
const view = h => (state, dispatch) => 
	h('div', `Hello World, your ${state} is wonderful!`)
```

where `h` stands for our favorite element creator passed to `createMount`. We find the [`hyperscript`](https://github.com/hyperhype/hyperscript) API supported by many libraries (e.g. Mithril, Snabbdom, or [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript)) most convenient, but also using JSX should be possible at it is equivalent to the `React.createElement` calls.

Or use the `createTags` helpers (like [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers)) that you can conveniently destructure inside the view:

```js
const view = ({ div }) => (state, dispatch) => 
	div(`Hello World, your ${state} is wonderful!`)
```

The other two parameters of the `view` are `dispatch` and `state` that match the types (or more precisely, interfaces) of the `action` and the `state` parameters of the `reducer`. (Note how the `view` signature matches the one of the `reducer`. Further, it also matches the [native JS `Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) as well as [the general `reduce` method](http://ramdajs.com/0.18.0/docs/#reduce) signatures, the latter provided by the [Foldable Typeclass](https://github.com/fantasyland/fantasy-land#foldable).)
The state, updated by the reducer, will be passed directly to the view (from the same `mount` call). And every action value used to call the `dispatch` function, will be passed directly as action to the `reducer`. For example, calling `dispatch('foo')` in the event handler inside the `view` will result in `foo` being passed as `action` to the `reducer`.

This style of writing was inspired by https://github.com/ericelliott/react-pure-component-starter and https://medium.com/javascript-scene/baby-s-first-reaction-2103348eccdd

In `React` the role of the `view` would be played by the component `render` method, but we already have another static method `React.render`, so we prefer to call it the `view` as in Mithril. 


- `initState`: The state to initialise our uncomponent.

Why "uncomponent"? Because there isn't really much of a "component", the `reducer` and the `view` are just two plain functions and the initial state is a plain object.


## Streams

Streams are in the core of `un`. [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) by Andre Staltz is a great introduction to streams. [`flyd`](https://github.com/paldepind/flyd) is a great minimal but powerful stream library to use, including great examples to see the streams in action. The [Mithril stream library](https://mithril.js.org/stream.html) is even smaller but suffices to let `un` do its job. Note that some libraries, such as [`most`](https://github.com/cujojs/most) distingiush between "pending" and "active" streams, but to make things as simple as possible, all streams in `un` are always active, readable and writeable. 

Despite of their initial complexity, streams model very well the asyncronous processes such as user acton flow, and consequently help to greatly simplify the architecture. The state values are stored directly inside the stream, so no stores such as in Redux are needed.

Instead of letting the framework do some "magic" behind the scene, when updating the DOM, with `un`, your view listens to its state stream. Whenever the state changes, its new value is passed to any subscriber, or which the view is one. The view function is pure with no side-effects, so all it does is pass the new updated element to the rendering library you provided to
to `createMount`. It is then the library's responsibility to create the side-effect updating the DOM.

Note that you can absolutely ignore the stream part and write your code without seeing a single stream. Like in Redux, every action passed to dispatcher will go through the cycle. However, using streams can give you additional control. The `mount` method returns the action stream that is both readable and writeable. That means, you can attach other subscribers to your actions, or you can actively pipe new values into it, causing the same or additional actions passed to the reducer and subsequently updating the DOM.


A basic example below is demonstrating how the action stream can be externally driven in addition to user actions.


## Full reactive control of your uncomponents

The `un` mount function, created as described above, 
returns for every uncomponent, the object 
```js
{ 
	states: streamOfStates, 
	actions: streamOfActions 
}
```
holding the streams of the actions and the states
(we like to refer to streams by plurals to emphasize their collection nature).

That means, you can conveniently add any complex behavior
to your uncomponent by piping external actions into its action stream,
or you can attach an external subscriber to the state stream,
to be updated on any state changes in a reactive fashion.

[The active-counter example](https://github.com/dmitriz/un/tree/master/examples/active-counter) demonstrates this feature.


### `un` reactive vision

Right now the streams provided by `un` conform to the [Mithril Stream API](https://mithril.js.org/stream.html)

In order to make using `un` as universal and painless as possible, 
and accessible to broader audience, we would like to facilitate pluging other stream libraries. 
So you can use your favorite stream api to control your uncomponents.

Help and cotributions are welcome!


## [The active-counter example](https://github.com/dmitriz/un/tree/master/examples/active-counter)


### Pure reducer function

Our both state and action values are just numbers 
and the reducer simply adds the action value to the state:

```js
const reducer = (state, action) => 
	state + action
```

### Pure view function

Our view function example here demonstrates how a function helper inside
can reuse all the arguments of the outside function:

```js
const view = ({ button }) => (state, dispatch) => {

	const change = amount => 
		button( 
			{onclick: () => dispatch(amount)}, 
			(amount > 0) 
				? `+${amount}` 
				: `-${-amount}`
			)

	return [	
		`Increasing by 5 every second: `,
		change(10),
		` ${state} `,
		change(-10)
	]
}
```

Here we attach to the `onclick` listener (following `Mithril`s API flavour)
the anonymous function passing the `amount` to the `dispatch`. 
As mentioned above, that value is passed as action to the reducer.

Behind the scene, every time the user clicks that button,
the `amount` value is written into the `action` stream.
That is essentially what the `dispatch` function does.


### Drivers

```js
// the only method you ever use from 'un'
const createMount = require('un.js')

// or React.createElement

const mount = createMount({	

	// your favorite stream factory
	// TODO: flyd, most, xstream
	createStream: require("mithril/stream"),

	// your favorite element creator
	// TODO: (React|Preact|Inferno).createElement, snabbdom/h, hyperscript
	createElement: require('mithril'),

	// your favorite create tags helpers
	createTags: require('hyperscript-helpers'),

	// TODO: (React|Preact|Inferno).render, snabbdom-patch, replaceWith
	createRender: element => vnode => require('mithril').render(element, vnode)
})

// create dom element
const e = document.createElement('div')
document.body.appendChild(e)

// mount our live uncomponent and get back its writeable stream of actions
const actions = mount({ e, reducer, view, initState: 0 })
```

## Basic Examples

The Basic Examples are intentionally made very simple and focused.

[The sumbit example](https://github.com/dmitriz/un/tree/master/examples/basic/submit) demonstrates how to attach an simple update action to the `onsubmit` event of the `<form>`.

[The submit-with-reset example](https://github.com/dmitriz/un/tree/master/examples/basic/submit-with-reset) in addition resets the input field after submission by providing additional state variable to control it.

[The keypress example](https://github.com/dmitriz/un/tree/master/examples/basic/keypress) demonstrates how to pass all keys pressed to the dispatcher, and then via the reducer, back to the state.

[The todos example](https://github.com/dmitriz/un/tree/master/examples/todos) demonstrates a basic interactive todos collector.

[The todos-with-delete example](https://github.com/dmitriz/un/tree/master/examples/todos-with-delete) adds the delete feature to the previous example. It deviates slightly from the traditional todos examples, in which the deletion is done by name, i.e. all todos with the same name are deleted at the same time.



## Inspirations (incomplete and in random order)

<a href="https://drboolean.gitbooks.io/mostly-adequate-guide/content/">Professor Frisby's Mostly Adequate Guide to Functional Programming</a>
by the same author.

[Professor Frisby Introduces Composable Functional JavaScript](https://egghead.io/lessons/javascript-refactoring-imperative-code-to-a-single-composed-expression-using-box)

[The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) by Andre Staltz, as well as [many other of his always enlightening posts](https://staltz.com/blog.html) as well as his [CycleJS project](https://cycle.js.org/)

[@sindresorhus on reusable modules](https://github.com/sindresorhus/ama/issues/10#issuecomment-117766328)

The [Ramda](http://ramdajs.com/) and its sister [Fantasy Land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://github.com/sanctuary-js/sanctuary) projects

The [Mithril framework](https://mithril.js.org/index.html)

The [simple but powerful `flyd` stream library](https://github.com/paldepind/flyd)

[Functional Frontend Architecture](https://github.com/paldepind/functional-frontend-architecture)

The [Snabbdom virtual dom library](https://github.com/snabbdom/snabbdom) and the [broader Hyperscript Ecosystem](https://github.com/hyperhype/awesome-hyperscript)

The [Redux](http://redux.js.org/) and [Elm](https://guide.elm-lang.org/architecture/) projects

[TodoMVC example built with `most.js`](https://github.com/briancavalier/most-todomvc)

[Meiosis](https://github.com/foxdonut/meiosis)


To be extended...


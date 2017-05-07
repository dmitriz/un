# un.js
unframework for universal uncomponents

## Status

EXPERIMENTAL: in development, contributions welcome!

## Philosophy

- Write your business logic as pure functions with no external dependencies
- No side-effects, testable by your favorite test runners
- No external imports, no packages, no libraries
- No extension of proprietary component classes (Backbone, React, ...)
- No lock-ins, use your uncomponents with any framework or without any

## Why unframework?

- Frameworks try to provide and cater for everything, `un` tries the opposite - give you the maximal possible freedom.

- Frameworks try to tell you exactly what to do, `un` tries the opposite - staying out of your way.

- Frameworks make your code coupled with proprietary syntax, `un` lets you write your code with plain JavaScript functions, undistinguishable from any other functions. There is not a single trace of `un` in any of your functions.

- Frameworks often like you to inherit from their proprietary classes, `un` tries to help you embrace the pure functional style and minimise use of classes and `this`. However, this is merely suggestive. Giving you maximum freedom and staying out of your way is a higher priority for `un`.


## If nothing is provided, then what do I needed?

```js
createStream, 
createElement, 
createTags, 
createRender
```


## Basic example


### Pure reducer function

Write your pure reducer just like in [Redux](http://redux.js.org/) 

```js
const reducer = (state, action) => 
	state + action
```

### Pure view function

```js
const view = ({ button }) => dispatch => state => {

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

### Drivers

```js
// the only basic method you need to import
// const createMount = require('../../')
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


## Inspirations



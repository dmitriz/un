// uncomponent - no imports - no external dependencies!

const reducer = (state, action) => 
	state + action

// pure with no dependencies
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


// the only basic method you need to import from 'un.js'
const createMount = require('../../')
// const createMount = require('un.js')

// configure the 'mount' method, the only method we need
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
const el = document.createElement('div')
document.body.appendChild(el)

// mount our live uncomponent and get back its writeable stream of actions
const actions = mount({ el, reducer, view, initState: 0 })



// --- Some more action - generate periodic actions

const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}
delayedConstant(5, 1000)(actions)



// uncomponent - no imports - no external dependencies!

const reducer = (state, action) => 
	state + action

// pure with no dependencies
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


// configure mount - imports only now
const createElement = require('mithril')
const createMount = require('../../')
const mount = createMount({	
	createStream: require("mithril/stream"), 
	createElements: require('hyperscript-helpers')(createElement), 
	// createRender: e => vnode => m.render(e, vnode) 
	createRender: e => vnode => createElement.render(e, vnode)
})

// create dom element
const e = document.createElement('div')
document.body.appendChild(e)

// mount our live uncomponent and get back its writeable stream of actions
const actions = mount({ e, reducer, view, initState: 0 })



// --- Some more action - generate periodic actions

const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}
delayedConstant(5, 1000)(actions)



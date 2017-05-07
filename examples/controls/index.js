const elm = document.createElement('div')
document.body.appendChild(elm)

var { curryN } = require('ramda')

var m = require('mithril')
var { div, button, input } = hh = require('hyperscript-helpers')(m)

var Stream = require("mithril/stream")

const reducer = (state, action) => state + action


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


// Drivers

const mount = (elm, { reducer, view }, initState) => {
	const actions = Stream()

	Stream
	.scan(reducer, initState, actions)

	// pipe into view
	// view events wil update the actionStream
	.map(view(actions))

	// render to DOM
	.map(vnode => m.render(elm, vnode))

	return actions
}


const initState = 0

// mount live view and get back stream of actions
const actions = mount(elm, { reducer, view: view({ button }) }, initState)

// --- now pipe periodic actions

const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}
delayedConstant(5, 1000)(actions)



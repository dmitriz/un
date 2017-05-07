const elm = document.createElement('div')
document.body.appendChild(elm)

// var { curryN } = require('ramda')

var m = require('mithril')
var { div, button, input } = hh = require('hyperscript-helpers')(m)

var createStream = require("mithril/stream")

const reducer = (state, action) => state + action

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


// no dependencies
const mount = (
	createStream, 
	render, 
	hh
) => (elm, { reducer, view }, initState) => {
	const actions = createStream()

	createStream
	.scan(reducer, initState, actions)

	// pipe into view
	// view events wil update the actionStream
	.map(view(hh)(actions))

	// render to DOM
	.map(vnode => render(elm, vnode))

	return actions
}


const initState = 0

// mount live view and get back stream of actions
const actions = mount(
	createStream, 
	m.render,
	hh
)(
	elm, 
	// uncomponent
	{ reducer, view }, 
	initState
)

// --- now pipe periodic actions

const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}
delayedConstant(5, 1000)(actions)



const elm = document.createElement('div')
document.body.appendChild(elm)

var {curryN} = require('ramda')
var m = require('mithril')
var {div, button, input} = require('hyperscript-helpers')(m)

var Stream = require("mithril/stream")

var show = s => console.log(s), s

const reducer = (state, action) => state + action

const view = dispatch => state => div([
	div(`Your score is: ${state}`),
	change(dispatch)(-10),
	input({
		type: 'search', 
		placehoder: 'Enter some number',
		value: '100',
		onsubmit: _ => dispatch(value)
	})
])

const change = dispatch => amount => 
	button( 
		{onclick: _ => dispatch(amount)},
		`Change by ${amount}`
	)


actionStream = Stream(0)

// Drivers
const render = curryN(2, m.render)
const runApp = elm => (reducer, view) => actionStream => 
	// iterate over actions
	Stream
	.scan(reducer, actionStream(), actionStream)

	// pipe into view
	// view events wil update the actionStream
	.map(view(actionStream))

	// render to DOM
	.map(render(elm))

runApp(elm)(reducer, view)(actionStream)


const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}

// pipe constant 3 into our main actionStream
delayedConstant(3, 1000)(actionStream)

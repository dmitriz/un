const { curryN } = require('ramda')
const m = require('mithril')
const flyd = require('flyd')
var Stream = require("mithril/stream")

const { button } = require('hyperscript-helpers')(m)

const elm = document.createElement('div')
document.body.appendChild(elm)

const reducer = (state, action) =>
	(action === `+`) ? state + 1 :
	(action === `-`) ? state - 1 :
	state

const view = dispatch => state => 
	[ `Welcome to my uncounter: `
	,	button({onclick: dispatch(`+`)}, ` + `),
	,	` ${state} `,
	,	button({onclick: dispatch(`-`)}, ` - `),
	]


// const mount = (elm, {view}) =>
// 	actions
// 	.map(
// 		m.render(elm, view({button})(__)(initState))
// 	)

// mount(elm, {view})

const comp = view({button})

const initState = 0

const actions = flyd.stream(0)
const states = flyd.scan(reducer, initState, actions)

// states.map(view(actions))
// 			 .map(vnode => m.render(elm, vnode))

const actionStream = Stream(0)

// Drivers
const render = curryN(2, m.render)

const runApp = elm => (reducer, view) => actionStream => 
	// iterate over actions
	Stream
	.scan(reducer, 0, actionStream)

	// pipe into view
	// view events wil update the actionStream
	.map(view(actionStream))

	// render to DOM
	.map(render(elm))

runApp(elm)(reducer, view)(actionStream)



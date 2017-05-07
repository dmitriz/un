

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
const createMount = ({ createStream, createElements, render }) => 
	({ e, reducer, view, initState}) => {

		const actions = createStream()

		createStream
		.scan(reducer, initState, actions)

		// pipe into view
		// view events wil update the actionStream
		.map(view(createElements)(actions))

		// render to DOM
		.map(vnode => render(e, vnode))

		return actions
	}


// configure mount
const m = require('mithril')
const mount = createMount({	
	createStream: require("mithril/stream"), 
	createElements: require('hyperscript-helpers')(m), 
	render: m.render 
})

// create dom element
const e = document.createElement('div')
document.body.appendChild(e)

// mount our live component get back stream of actions
const actions = mount({ e, reducer, view, initState: 0 })

// --- now pipe periodic actions

const delayedConstant = (val, delay) => stream => {
	setInterval(() => stream(val), delay)
	return stream
}
delayedConstant(5, 1000)(actions)



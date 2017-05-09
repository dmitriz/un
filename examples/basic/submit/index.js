// uncomponent - no imports - no external dependencies!

const reducer = (state, action) => 
	state + action

const style = {width: '100%'}

// pure with no dependencies
const view = ({ input }) => (state, dispatch) => [
	`Welcome to my Submit: `,
	input({
		style,
		class: 'new-todo',
		placeholder: 'What is your string today?',
		autofocus: true
	})
]


// the only method we need
const mount = require('./un-mount')

// create dom element
const el = document.createElement('div')
document.body.appendChild(el)

// mount our live uncomponent and get back its writeable stream of actions
const { actions } = mount({ el, reducer, view, initState: 0 })

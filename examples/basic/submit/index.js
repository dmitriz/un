// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// simply return action's value as next state
const reducer = (submitted, value) => value

const style = {width: '100%'}

// pure with no dependencies
const view = ({ form, input }) => (submitted, dispatch) => [
	`Welcome to my Submit: `,
	`Type and hit ENTER: `,
	form({
		onsubmit: e => {
			// prevents page reload
			e.preventDefault()
			dispatch(e.target.in.value)
		}
	}, [
		input({
			name: 'in',
			style,
			class: 'new-todo',
			placeholder: 'What is your string today?',
			autofocus: true,
		})
	]),
	`You have submitted: ${ submitted }`
]


// the only method we need
const mount = require('./un-mount')

// create dom element
const el = document.createElement('div')
document.body.appendChild(el)

// mount our live uncomponent
mount({ 
	el, 
	reducer, 
	view, 
	initState: `Nothing as of yet` 
})

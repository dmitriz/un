// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// compute new state
const reducer = ({ submitted } = {}, value) => ({

	// add new value to submitted array
	submitted: submitted.concat([value]),
	changed: true
})

const style = {width: '100%'}

// pure with no dependencies
const view = ({ form, input, p, span }) => ({ submitted, changed }, dispatch) => [
	`Press some key: `,
	form({
		onkeypress: e => {
			// prevents page reload
			e.preventDefault()
			dispatch(e.code)
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
	changed 
		? `Thank you, `: ``,
	`You have pressed: `,
	p({style: {
		color: changed ? 'blue' : 'gray'
	}}, submitted.map(key => span(` ${key} `)))
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
	initState: {
		submitted: [],
		changed: false
	}
})

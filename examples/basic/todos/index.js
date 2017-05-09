// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// compute new state
const reducer = ({ submitted } = {}, title) => ({
	title: ``,

	// add new value to submitted array
	submitted: submitted.concat([title]),
	changed: true
})

const style = {width: '100%'}

// pure with no dependencies
const view = ({ form, input, p, li }) => 
	({ title, submitted, changed }, dispatch) => [
		`Enter your Todo: `,
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
				placeholder: 'Your next Todo...',
				autofocus: true,
				value: title
			})
		]),
		changed 
			? `Thank you, here are your Todos:`
			: `You have no Todos`,
		p({style: {
			color: changed ? 'blue' : 'gray'
		}}, submitted.map(key => li(` ${key} `)))
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

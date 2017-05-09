// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// old state is not used, only action value
const reducer = (state = {}, value) => ({

	// reset input value here
	inputVal: ``,
	submitted: value,
	changed: true
})

const style = {width: '100%'}

// pure with no dependencies
const view = ({ form, input, p }) => 
	({inputVal, submitted, changed }, dispatch) => [
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

				// inputs value is controlled by function argument
				value: inputVal
			})
		]),
		changed 
			? `Thank you, here is your submission: ` 
			: `You have submitted: `,
		p({style: {
			color: changed ? 'blue' : 'gray'
		}}, submitted)
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
		inputVal: ``,
		submitted: `Nothing as of yet`,
		changed: false
	}
})

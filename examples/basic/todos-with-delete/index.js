// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// compute new state
const reducer = (state = {}, { type, todo } = {}) => {
	const { submitted } = state
	return {
		'ADD': {
			title: ``,
			submitted: submitted.concat([todo]),
			changed: true		
		},
		'DELETE': Object.assign({}, {
			// delete by title!
			submitted: submitted.filter(t => t !== todo)
		})
	}[type] || state
}



// pure with no dependencies
const view = ({ div, header, form, input, label, p, ul, li, section, h1, button }) => 
	({ title, submitted, changed }, dispatch) => {

	const NewTodoInput = ({ title }) => 
		header('.header', [
			h1("todos"),
			form({
				onsubmit: e => {
					e.preventDefault()
					dispatch({type: 'ADD', todo: e.target.in.value})
				}
			}, [
				input('#new-todo', {
					name: 'in',
					placeholder: 'What needs to be done?',
					autofocus: true,
					value: title
				})
			])
		])

	const Todo = (todo) =>
		li([
			div(".view", [
				label(todo),
				button(".destroy", {
					onclick: () => dispatch({type: 'DELETE', todo})
				}),
			]),
		])

	const Main = ({ submitted }) =>
		section("#main", {
			style: {display: submitted.length > 0 ? "" : "none"}
		}, [
			ul('#todo-list', submitted.map(todo => Todo(todo)))
		])


	return [
		NewTodoInput({ title }),
		Main({ submitted })
	]
}


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
		title: ``,
		submitted: [],
		changed: false
	}
})

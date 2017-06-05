// uncomponent - the pair of functions,
// no imports - no external dependencies!

// compute new state
const reducer = ({ todos } = {}, { type, todo } = {}) => ({
	'ADD': {
		newTitle: ``,
		todos: todos.concat([todo]),
	},
	'DELETE': {
		// delete by name!
		todos: todos.filter(t => t !== todo)
	},
}[type])



// pure with no dependencies
const view = ({ div, form, input, label, ul, li, h1, button }) =>
	({ newTitle, todos }, dispatch) => {

	const NewTodoInput = newTitle =>
		form({
			onsubmit: e => {
				e.preventDefault()
        const todo = e.target.in.value.trim()
				todo && dispatch({ type: 'ADD', todo })
			}
		}, [
			input('#new-todo', {
				name: 'in',
				placeholder: 'What needs to be done?',
				autofocus: true,
				value: newTitle,
			})
		])

	const Todo = todo =>
		li([
			label(todo),
			button(".destroy", {
				onclick: () => dispatch({ type: 'DELETE', todo })
			}),
		])

	const Main = todos =>
		ul('#todo-list', todos.map(Todo))

	return [
    h1("my todos"),
		NewTodoInput(newTitle),
		Main(todos),
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
		newTitle: ``,
		todos: [],
	}
})

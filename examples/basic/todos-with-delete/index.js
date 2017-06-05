// uncomponent - the pair of functions,
// no imports - no external dependencies!

// compute new state
const reducer = (state = {}, { type, todo } = {}) => {
	const { todos } = state
	return {
		'ADD': {
			title: ``,
			todos: todos.concat([todo]),
		},
		'DELETE': Object.assign({}, {
			// delete by title!
			todos: todos.filter(t => t !== todo)
		})
	}[type] || state
}



// pure with no dependencies
const view = ({ div, header, form, input, label, p, ul, li, section, h1, button }) =>
	({ title, todos }, dispatch) => {

	const NewTodoInput = ( title ) =>
		header('.header', [
			h1("todos"),
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
					value: title
				})
			])
		])

	const Todo = todo =>
		li([
			div(".view", [
				label(todo),
				button(".destroy", {
					onclick: () => dispatch({type: 'DELETE', todo})
				}),
			]),
		])

	const Main = todos =>
		section("#main", {
			style: {display: todos.length > 0 ? "" : "none"}
		}, [
			ul('#todo-list', todos.map(todo => Todo(todo)))
		])


	return [
		NewTodoInput( title ),
		Main( todos )
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
		todos: [],
	}
})

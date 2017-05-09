// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// compute new state
const reducer = ({ submitted } = {}, { type, value } = {}) => ({
	'ADD': {
		title: ``,
		submitted: submitted.concat([value]),
		changed: true		
	}
})[type]



// pure with no dependencies
const view = ({ div, form, input, label, p, ul, li, header, section, h1, button }) => 
	({ title, submitted, changed }, dispatch) => {

	const NewTodoInput = ({ title }) => 
		header('.header', [
			h1("todos"),
			form({
				onsubmit: e => {
					e.preventDefault()
					dispatch({type: 'ADD', value: e.target.in.value})
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
					onclick: () => dispatch("destroy", [todo])
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
		changed 
			? `Thank you, here are your Todos:`
			: `You have no Todos`,
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
		submitted: [],
		changed: false
	}
})

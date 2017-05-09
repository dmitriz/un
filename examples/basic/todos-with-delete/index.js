// uncomponent - the pair of functions, 
// no imports - no external dependencies!

// compute new state
const reducer = ({ submitted } = {}, title) => ({
	title: ``,

	// add new value to submitted array
	submitted: submitted.concat([title]),
	changed: true
})



// pure with no dependencies
const view = ({ form, input, p, ul, li, header, section, h1 }) => 
	({ title, submitted, changed }, dispatch) => {

	const NewTodoInput = ({ title }) => 
		header('.header', [
			h1("todos"),
			form({
				onsubmit: e => {
					e.preventDefault()
					dispatch(e.target.in.value)
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

	const Main = ({ submitted }) =>
		section("#main", {
			style: {display: submitted.length > 0 ? "" : "none"}
		}, [
			ul('#todo-list', submitted.map(todo => 
				li(` ${todo} `)
			))
			// m("ul#todo-list", submitted.map(todo => 
			// 	Todo(todo, ui)
			// )),
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

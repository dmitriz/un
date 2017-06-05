// index.js -- the main app source file

const m = require('mithril')
const hh = require('hyperscript-helpers')(m)

var mount = require('./un-mount')

var saveLocal = (label, item) =>
	localStorage[label] = JSON.stringify(item)

//model
var state = {
	dispatch: (action, args) => {
		state[action].apply(state, args || [])
		requestAnimationFrame(() => saveLocal("todos-mithril", state.todos))
	},

	todos: JSON.parse(localStorage["todos-mithril"] || "[]"),
	editing: null,
	filter: "",
	remaining: 0,
	todosByStatus: [],

	createTodo: title =>
		state.todos.unshift({title: title.trim(), completed: false}),

	setStatuses: completed => {
		for (var i = 0; i < state.todos.length; i++) {
			state.todos[i].completed = completed
		}
	},

	setStatus: (todo, completed) => {
		todo.completed = completed
	},
	destroy: todo => {
		var index = state.todos.indexOf(todo)
		if (index > -1) state.todos.splice(index, 1)
	},
	clear: function() {
		for (var i = 0; i < state.todos.length; i++) {
			if (state.todos[i].completed) state.destroy(state.todos[i--])
		}
	},

	edit: function(todo) {
		state.editing = todo
	},
	update: function(title) {
		if (state.editing != null) {
			state.editing.title = title.trim()
			if (state.editing.title === "") state.destroy(state.editing)
			state.editing = null
		}
	},
	reset: function() {
		state.editing = null
	},

	computed: function(vnode) {
		state.showing = vnode.attrs.status || ""
		state.remaining = state.todos.filter(function(todo) {return !todo.completed}).length
		state.todosByStatus = state.todos.filter(function(todo) {
			switch (state.showing) {
				case "": return true
				case "active": return !todo.completed
				case "completed": return todo.completed
			}
		})
	}
}




var TodosClousure = ({
	div, span, h1, a, input, label, button, ul, li, header, section, footer, strong
}) => ({
	add: e => {
		if (e.keyCode === 13 && e.target.value) {
			state.dispatch("createTodo", [e.target.value])
			e.target.value = ""
		}
	},
	toggleAll: () => {
		var toggleAllEl = document.getElementById("toggle-all")
		return state.dispatch("setStatuses", [toggleAllEl.checked])
	},
	toggle: todo => state.dispatch("setStatus", [todo, !todo.completed]),
	focus: function(vnode, todo) {
		if (todo === state.editing && vnode.dom !== document.activeElement) {
			vnode.dom.value = todo.title
			vnode.dom.focus()
			vnode.dom.selectionStart = vnode.dom.selectionEnd = todo.title.length
		}
	},
	save: e => (e.keyCode === 13 || e.type === "blur")
		? state.dispatch("update", [e.target.value])
		: (e.keyCode === 27) && state.dispatch("reset")
		,

	oninit: state.computed,

	onbeforeupdate: state.computed,

	view: vnode => {
		var ui = vnode.state

		var TodoTextInput = dispatch =>
			input("#new-todo", {
				placeholder: 'What needs to be done?',
				autofocus: true,
				onkeypress: dispatch
			})


		var Header = dispatch =>
			header(".header", [
				h1("todos"),
				TodoTextInput(dispatch)
			])

		var TodoItem = (todo, dispatch) =>
			li(
				{
					class: (todo.completed ? "completed" : "")
						+ " "
						+ (todo === state.editing ? "editing" : "")
				},
				state.editing ?
					input(".edit", {
						onupdate: vnode => dispatch.focus(vnode, todo),
						onkeyup: dispatch.save,
						onblur: dispatch.save
					}) :
					div(".view", [
						input(".toggle", {
							type: 'checkbox',
							checked: todo.completed,
							onclick: () => dispatch.toggle(todo)
						}),
						label({
							ondblclick: () => state.dispatch("edit", [todo])
						}, todo.title),
						button(".destroy", {
							onclick: () => state.dispatch("destroy", [todo])
						}),
					])
				)

		var MainSection = (state, dispatch) =>
			section("#main", {
					style: {display: state.todos.length > 0 ? "" : "none"}
			}, [
				input("#toggle-all", {
					type: 'checkbox',
					checked: state.remaining === 0,
					onclick: dispatch
				}),
				label({
					for: 'toggle-all',
					onclick: dispatch
				}, "Mark all as complete"),

				ul("#todo-list", state.todosByStatus.map(todo =>
					TodoItem(todo, ui)
				)),
			])

		var routes = ['/', '/active', '/completed']

		var routeLabels = {
			'/': 'All',
			'/active': 'Active',
			'/completed': 'Completed'
		}

		var FilterLink = route =>
			li(
				a({
					href: route,
					oncreate: m.route.link,
					class: state.showing === route ? "selected" : ""
				}, routeLabels[route])
			)

		var Filter = (state, dispatch) =>
		 	footer("#footer", [
				span("#todo-count", [
					strong(state.remaining),
					state.remaining === 1 ? " item left" : " items left",
				]),
				ul("#filters", [
					FilterLink('/'),
					FilterLink('/active'),
					FilterLink('/completed'),
				]),
				button("#clear-completed", {
					onclick: () => dispatch("clear")
				}, "Clear completed"),
			])

		return [
			Header(ui.add),
			MainSection(state, ui.toggleAll),
			state.todos.length
        ? Filter(state, state.dispatch)
        : null,
		]
	}
})

var el = document.getElementById("todoapp")
m.route(el, "/", {
	// import the `hh` library, so our components remain pure!
	"/": TodosClousure(hh),
	"/:status": TodosClousure(hh),
})

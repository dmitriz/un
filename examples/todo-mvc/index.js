m = require('mithril')
var mount = require('./un-mount')

//model
var state = {
	dispatch: function(action, args) {
		state[action].apply(state, args || [])
		requestAnimationFrame(function() {
			localStorage["todos-mithril"] = JSON.stringify(state.todos)
		})
	},

	todos: JSON.parse(localStorage["todos-mithril"] || "[]"),
	editing: null,
	filter: "",
	remaining: 0,
	todosByStatus: [],

	createTodo: function(title) {
		state.todos.push({title: title.trim(), completed: false})
	},
	setStatuses: function(completed) {
		for (var i = 0; i < state.todos.length; i++) state.todos[i].completed = completed
	},
	setStatus: function(todo, completed) {
		todo.completed = completed
	},
	destroy: function(todo) {
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

//view
var Todos = {
	add: e => {
		if (e.keyCode === 13 && e.target.value) {
			state.dispatch("createTodo", [e.target.value])
			e.target.value = ""
		}
	},
	toggleAll: () =>
		state.dispatch("setStatuses", [
			document.getElementById("toggle-all").checked
		]),
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

		var NewTodoInput = (placeholder, dispatch) => 
			m("header.header", [
				m("h1", "todos"),
				m("input#new-todo", {
					placeholder,
					autofocus: true, 
					onkeypress: dispatch
				})
			])

		var Todo = (todo, dispatch) =>
			m("li", {
				class: (todo.completed ? "completed" : "") 
					+ " " 
					+ (todo === state.editing ? "editing" : "")
				}, [
					m(".view", [
						m("input.toggle", {
							type: 'checkbox',
							checked: todo.completed, 
							onclick: () => dispatch.toggle(todo)
						}),
						m("label", {
							ondblclick: () => state.dispatch("edit", [todo])
						}, todo.title),
						m("button.destroy", {
							onclick: () => state.dispatch("destroy", [todo])
						}),
					]),
					m("input.edit", {
						onupdate: vnode => dispatch.focus(vnode, todo), 
						onkeyup: dispatch.save, 
						onblur: dispatch.save
					})
				])

		var Main = (state, dispatch) =>
			m("section#main", {
					style: {display: state.todos.length > 0 ? "" : "none"}
			}, [
				m("input#toggle-all", {
					type: 'checkbox',
					checked: state.remaining === 0, 
					onclick: dispatch
				}),
				m("label", {
					for: 'toggle-all',
					onclick: dispatch
				}, "Mark all as complete"),

				m("ul#todo-list", state.todosByStatus.map(todo => 
					Todo(todo, ui)
				)),
			])

		var routes = ['/', '/active', '/completed']

		var routeLabels = { 
			'/': 'All', 
			'/active': 'Active', 
			'/completed': 'Completed' 
		}

		var FilterLink = route => 
			m("li", 
				m("a", {
					href: route,
					oncreate: m.route.link, 
					class: state.showing === route ? "selected" : ""
				}, routeLabels[route])
			)

		var Filter = (state, dispatch) =>
		 	m("footer#footer", [
				m("span#todo-count", [
					m("strong", state.remaining),
					state.remaining === 1 ? " item left" : " items left",
				]),
				m("ul#filters", [
					FilterLink('/'),
					FilterLink('/active'),
					FilterLink('/completed'),
				]),
				m("button#clear-completed", {
					onclick: () => dispatch("clear")
				}, "Clear completed"),
			]) 

		return [
			NewTodoInput('What needs to be done?', ui.add),
			Main(state, ui.toggleAll),
			state.todos.length ? Filter(state, state.dispatch) : null,
		]
	}
}

var el = document.getElementById("todoapp")
m.route(el, "/", {
	"/": Todos,
	"/:status": Todos,
})

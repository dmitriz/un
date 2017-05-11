// main factory - no external dependencies
const createMount = ({

	// configuration object
	createStream, createElement, createTags, createRender

}) => ({

	// component object
 	el, reducer, view, initState

// defaults
} = {

	// defaults to no action if not provided
	reducer: (state, actions) => state
}) => {

	const actions = createStream()

	const createElements = createTags(createElement)

	const states = createStream.scan(reducer, initState, actions)

	// pipe into view
	// view events wil update the actionStream
	const vnodes = states.map(state => view(createElements)(state, actions))

	// render to DOM
	vnodes.map(vnode => createRender(el)(vnode))

	// return stream of vnodes, with states and actions streams patched
	return Object.assign({}, vnodes, { states, actions })
}

module.exports = createMount

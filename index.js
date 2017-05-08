// main factory - no external dependencies

const createMount = ({

	// configuration object
	createStream, createElement, createTags, createRender

}) => ({

	// component object
 	e, reducer, view, initState

// defaults
} = {

	// defaults to no action if not provided
	reducer: (state, actions) => state
}) => {

	const actions = createStream()

	const createElements = createTags(createElement)

	createStream
	.scan(reducer, initState, actions)

	// pipe into view
	// view events wil update the actionStream
	.map(view(createElements)(actions))

	// render to DOM
	.map(vnode => createRender(e)(vnode))

	return actions
}

module.exports = createMount

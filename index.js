const createMount = ({ 
	createStream, createElements, createRender 
}) => ({
 	e, reducer, view, initState
}) => {

	const actions = createStream()
	// const render = e => vnode => createRender(e, vnode)

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
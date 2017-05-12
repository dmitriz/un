// the only basic method you need to import
const createMount = require('un.js')

const mount = createMount({	

	// your favorite stream factory
	// TODO: flyd, most, xstream
	createStream: require("mithril/stream"),

	// your favorite create tags helpers
	createTags: require('react-hyperscript-helpers'),

	// TODO: (React|Preact|Inferno).render, snabbdom-patch, replaceWith
	createRender: require('react').Render
})

// export configured 'mount' with our library choices
module.exports = mount

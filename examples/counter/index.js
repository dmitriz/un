const flyd = require('flyd')
const m = require('mithril')
const { button } = require('hyperscript-helpers')(m)

const elm = document.createElement('div')
document.body.appendChild(elm)

const reducer = action => state =>
	(action === `+`) ? state + 1 :
	(action === `-`) ? state - 1 :
	state

const view = ({button}) => dispatch => state => 
	[	button({onclick: dispatch(`+`)}, ` + `),
	,	` ${state} `,
	,	button({onclick: dispatch(`-`)}, ` - `),
	]

const actions = flyd.stream()

m.render(elm, view({button})(actions)(0))
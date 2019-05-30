import { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import hh from 'react-hyperscript-helpers'


// const reducer = ( state, { e, value } ) => ({
//   ...state,
//   // value will be updated and passed to view
//   value
// }) 

// pure function with no dependencies
const view = ({ input }) => ({ 

    // hold these simply in the closure instead of
    // everywhere prefixing with `this.props.`
    edit, newTodo, value, placeholder, onBlur
  }, 
  dispatch

) => input({
  className: classnames({ edit, 'new-todo': newTodo }),
  type: 'text',
  autoFocus: true,
  placeholder,
  value,
  onBlur,
  onChange: e => dispatch({value: e.target.value}),
  onKeyDown: e => dispatch({e, value: e.target.value})
})


// pure functional component
export default ({
  editing, newTodo, placeholder, text, onSave
}) => {

  const handleBlur = e => !newTodo && onSave(e.target.value)

  const handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      onSave(text)

      if (newTodo) {
        // this.setState({ text: '' })
      }
    }
  }

  return view(hh)(
    {
      edit: editing,
      newTodo: newTodo,
      placeholder: placeholder,
      value: text || '',
      onBlur: handleBlur,
      onKeyDown: handleSubmit
    }, 
    onSave
  )
}


// class TodoTextInputCl extends Component {
//   static propTypes = {
//     onSave: PropTypes.func.isRequired,
//     text: PropTypes.string,
//     placeholder: PropTypes.string,
//     editing: PropTypes.bool,
//     newTodo: PropTypes.bool
//   }

//   handleSubmit = e => {
//     const text = e.target.value.trim()
//     if (e.which === 13) {
//       this.props.onSave(text)

//       if (this.props.newTodo) {
//         // this.setState({ text: '' })
//       }

//     }
//   }

//   handleChange = e => {
//     // this.setState({ text: e.target.value })
//   }

//   handleBlur = e => {
//     if (!this.props.newTodo) {
//       this.props.onSave(e.target.value)
//     }
//   }

  render = () => view(hh)(
    {
      edit: this.props.editing,
      newTodo: this.props.newTodo,
      placeholder: this.props.placeholder,
      value: this.props.text || '',
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleSubmit
    }, 
    this.props.onSave
  )
}



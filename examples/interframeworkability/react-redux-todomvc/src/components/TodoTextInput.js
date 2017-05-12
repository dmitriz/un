import { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import hh from 'react-hyperscript-helpers'


const reducer = ( state, { e, value } ) => ({
  ...state,

  // value will be updated and passed to view
  value
}) 

// pure function with no dependencies
const view = ({ input }) => ({ 
  edit, newTodo, value, placeholder, onBlur, onChange, onKeyDown 
}, dispatch) => 
  input({
    className: classnames({ edit, 'new-todo': newTodo }),
    type: 'text',
    autoFocus: true,
    placeholder,
    value,
    onBlur,
    onChange,
    onKeyDown: e => dispatch({e, value: e.target.value})
  })


export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)

      if (this.props.newTodo) {
        // this.setState({ text: '' })
      }

    }
  }

  handleChange = e => {
    // this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render = () => view(hh)({
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



import React, { Component } from 'react'
import PropTypes from 'prop-types'

import hh from 'react-hyperscript-helpers'
const { button } = hh

// uncomponent: pure function, no dependencies, 
// testable in any environment
const StyledButton = ({ button }) => (style, onClick, label) => 
  button({ style, onClick }, label)

const StyledButtonWithProps = ({style, onClick, label}) => 
  button({ style, onClick }, label)


class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  }

  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {

    // custom style
    const style = {color: 'blue'}

    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}

        {
          // place your pure function right here
          StyledButton(hh)(style, onDecrement, `pure unbutton for - `) 
        }

        {' '}

        <StyledButtonWithProps
          style={style} 
          onClick={onDecrement} 
          label={`jsx unbutton for - `}
        />

        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

export default Counter

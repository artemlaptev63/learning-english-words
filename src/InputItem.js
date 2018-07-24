import React, { Component } from 'react';
import './InputItem.css'
// import { getWords } from 'selectors'
import { connect } from 'react-redux'
import {
  addAnswerAction
} from 'actions'
import { getClassName } from 'selectors'



class InputItem extends Component {
  addAnswer(id) {
    this.props.addAnswerAction(id, this.input.value)
  }
  render() {
    const { isShowingAnswers, item } = this.props
    return (
      <div className="question">
        <p>{item.id}&nbsp;&nbsp;{item.russian}</p>
        <p className="correctAnswer">
          {
            isShowingAnswers ? item.english : null
          }
        </p>
        <p>
          <input
            type="text"
            className={this.props.isCorrectClassName}
            ref={(input) => this.input = input}
            onChange={() => this.addAnswer(item.id)}
          />
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isCorrectClassName: getClassName(state, ownProps)
  }
}

const mapDispatchToProps = {
  addAnswerAction
}


export default connect(mapStateToProps, mapDispatchToProps)(InputItem);

import React, { Component } from 'react';
import './App.css';
import { getWords, getProcents } from 'selectors'
import { connect } from 'react-redux'
import {
  fetchWords,
  checkAnswer
} from 'actions'
import InputItem from './InputItem'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowingAnswers: false
    }
  }
  componentDidMount() {
    this.props.fetchWords()
  }
  check() {
    this.props.checkAnswer()
  }
  toogleIsShoingAnswers() {
    this.setState({ isShowingAnswers: !this.state.isShowingAnswers })
  }

  render() {
    const { words, isUploaded, procents } = this.props
    return (
      <div>
        <p>
          {
            isUploaded ? procents : null
          }
        </p>
        <p>
          {
            isUploaded ? words.length : null
          }
        </p>
        <ul>
          {
            isUploaded ? words.map((item, index) => {
              return <InputItem
                item={item}
                key={index}
                isShowingAnswers={this.state.isShowingAnswers} />
            })
              : null
          }
        </ul>
        <button onClick={() => this.check()}>Check</button>
        <button onClick={() => this.toogleIsShoingAnswers()}>Show Answers</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    words: getWords(state),
    isUploaded: state.words.isUploaded,
    procents: getProcents(state)
  }
}

const mapDispatchToProps = {
  fetchWords,
  checkAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

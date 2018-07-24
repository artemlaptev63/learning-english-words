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
  componentDidMount() {
    this.props.fetchWords()
  }
  check() {
    this.props.checkAnswer()
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
                key={index} />
            })
              : null
          }
        </ul>
        <button onClick={() => this.check()}>Check</button>
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

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
  goToTop() {
    window.scroll(0, 0)
  }

  render() {
    const { words, isUploaded, procents } = this.props
    return (
      <div>
        <div className='result'>
          <span>
            {
              isUploaded ? procents : null
            }
          </span>
          &nbsp;&nbsp;
          <span>
            {
              isUploaded ? words.length : null
            }
          </span>
          <br />
          <button onClick={() => this.goToTop()}>Go To Top</button>
        </div>
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
        <button className='check' onClick={() => this.check()}>Check</button>
        <button className='showAnswers' onClick={() => this.toogleIsShoingAnswers()}>Show Answers</button>
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

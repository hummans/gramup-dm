import React, { Component } from 'react'

export default class SendMessage extends Component {
  state = {
    isTyping: false,
    text: '',
  }

  sendMessageRef = React.createRef()

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedThread: nextProps.selectedThread,
    })
  }

  render() {
    const { selectedThread, text } = this.state

    return (
      <div className="dialog-send-message">
        <input
          type="text" name="text"
          onChange={this.handleChange}
          value={this.state.text}
          />

        <button onClick={() => this.props.sendMessage(selectedThread, text)}>
          Send
        </button>
      </div>
    )
  }
}

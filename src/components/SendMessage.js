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

  submitMessage = event => {
    event.preventDefault()
    
    const { selectedThread, text } = this.state

    if (!text) return

    this.props.sendMessage(selectedThread, text)
  }

  render() {
    return (
      <div className="dialog-send-message">
        <form onSubmit={this.submitMessage}>
          <input
            type="text" name="text"
            onChange={this.handleChange}
            value={this.state.text}
            />

          <button onClick={this.submitMessage}>
            Send
          </button>
        </form>
      </div>
    )
  }
}

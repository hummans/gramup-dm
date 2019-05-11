import React, { Fragment, Component } from 'react'
import ym from 'react-yandex-metrika'

export default class SendMessage extends Component {
  state = {
    isTyping: false,
    text: '',
    username: '',
  }

  sendMessageRef = React.createRef()

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  submitMessage = event => {
    event.preventDefault()

    const { text } = this.state

    if (!text) return

    const { selectedThread } = this.props

    if (selectedThread) {
      this.props.sendMessage({ thread: selectedThread.thread_id }, text)
      ym('reachGoal', 'dm-message-sent', { thread: selectedThread.thread_id })
    } else {
      const { username } = this.state

      this.props.sendMessage({ username }, text)
      ym('reachGoal', 'dm-message-sent', { username })
    }

    this.setState({
      text: ''
    })
  }


  render() {
    const { selectedThread } = this.props

    return (
      <div className="dialog-send-message">
        <form onSubmit={this.submitMessage}>
          {!selectedThread && (
            <Fragment>
              <input
                type="text" name="username"
                placeholder="@username"
                onChange={this.handleChange}
                value={this.state.username}
                />
            </Fragment>
          )}
          <br />

          <input
            type="text" name="text"
            className="message-text"
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

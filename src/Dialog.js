import React, { Component } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

const styles = {
  overflowY: 'scroll',
  width: '65%',
  height: '100%',
}

export default class Dialog extends Component {
  state = {
    isTyping: false,
    messages: [],
  }

  componentWillReceiveProps(nextProps) {
    const messages = nextProps.messages.map(item => new Message({
      id: item.item_id,
      message: item.text || item.item_type,
      sender: item.user_id,
    }))

    this.setState({
      messages,
    })
  }

  render() {
    return (
      <div style={styles}>
        <ChatFeed
          messages={this.state.messages}
          isTyping={this.state.isTyping}
          hasInputField={false}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={
            {
              text: {
                fontSize: 20
              },
              chatbubble: {
                borderRadius: 30,
                padding: 20
              }
            }
          }
          />
      </div>
    )
  }
}

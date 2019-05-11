import React, { Component } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'


export default class Dialog extends Component {
  state = {
    isTyping: false,
    messages: [],
  }

  componentWillReceiveProps(nextProps) {
    const messages = nextProps.messages.map(item => new Message({
      id: item.user_id === this.props.me ? 0 : item.user_id,
      message: item.text || item.item_type,
    }))

    console.log('me', this.props.me)

    this.setState({
      messages,
    })
  }

  render() {
    if (this.props.isLoading) {
      return (<div className="dialog">Loading...</div>)
    }

    return (
      <div>
        <ChatFeed
          messages={this.state.messages}
          isTyping={this.state.isTyping}
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

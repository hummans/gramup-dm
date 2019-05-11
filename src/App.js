import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ChatFeed, Message } from 'react-chat-ui'
import instagram from './instagram/connector'

class App extends React.Component {
  state = {
    chats: [],
    messages: [],
  }

  async componentDidMount() {
    window.instagram = instagram

    await instagram.init()
    const { inbox: { threads } } = await instagram.request({ method: 'get_inbox', params: [] }, true)

    console.log('threads', threads)

    const first_thread = threads[0]
    const { thread: { items } } = await instagram.request({ method: 'get_thread', params: [ first_thread.thread_id ] }, true)

    console.log('messages', items)

    const messages = items.map(item => new Message({
      id: item.item_id,
      message: item.text || item.item_type,
    }))

    this.setState({
      chats: threads,
      messages,
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <ChatFeed
          messages={this.state.messages}
          isTyping={this.state.is_typing}
          hasInputField={false}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={
            {
             text: {
               fontSize: 30
             },
             chatbubble: {
               borderRadius: 70,
               padding: 40
             }
            }
          }
        />
      </div>
    );
  }
}

export default App;

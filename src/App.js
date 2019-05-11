import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './List'
import Dialog from './Dialog'

import instagram from './instagram/connector'

class App extends React.Component {
  state = {
    threads: [],
    messages: [],
  }

  async componentDidMount() {
    window.instagram = instagram

    await instagram.init()
    const { inbox: { threads } } = await instagram.request({ method: 'get_inbox', params: [] }, true)

    console.log('threads', threads)

    const first_thread = threads[0]

    this.setState({
      threads,
    })

    this.loadThread(first_thread)
  }

  loadThread = async (thread) => {
    const { thread: { items } } = await instagram.request({ method: 'get_thread', params: [ thread.thread_id ] }, true)

    console.log('messages', items)

    this.setState({
      messages: items,
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Scroll down to see your inbox
          </p>
        </header>

        <List
          threads={this.state.threads}
          selectThread={this.loadThread}
          />

        <Dialog
          messages={this.state.messages}
          />

      </div>
    );
  }
}

export default App;

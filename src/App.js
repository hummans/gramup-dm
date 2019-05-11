import React, { Component } from 'react'
import './App.css'

import instagram from './instagram/connector'
import { List, Dialog, SendMessage } from './components'

class App extends Component {
  state = {
    threads: [],
    messages: [],
    selectedThread: null,
    isLoading: false,
    autoScroll: true,
  }

  messagesEnd = React.createRef()

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

  scrollToBottom = (force = false) => {
    if (!this.state.autoScroll && !force) return

    const target = this.messagesEnd.current

    target.parentNode.scrollTop = target.offsetTop
  }

  loadThread = async (thread) => {
    this.setState({ isLoading: true })

    const { thread: { items } } = await instagram.request({ method: 'get_thread', params: [ thread.thread_id ] }, true)

    console.log('messages', items)

    this.setState({
      isLoading: false,
      selectedThread: thread,
      messages: items.reverse(),
    }, () => this.scrollToBottom())
  }

  sendMessage = async (thread, text) => {
    this.setState({ isLoading: true })

    console.log('send dm', text)

    const params = [ 'text', { thread: thread.thread_id, text } ]

    console.log('send dm params', params)

    const { status } = await instagram.request({ method: 'send_direct_item', params }, true)

    console.log('status', status)

    this.loadThread(thread)
  }

  render () {
    return (
      <div className="App">

        <List
          threads={this.state.threads}
          selectedThread={this.state.selectedThread}
          selectThread={this.loadThread}
          />

        <div className="dialog">
          <Dialog
            isLoading={this.state.isLoading}
            selectedThread={this.state.selectedThread}
            messages={this.state.messages}
            />

          <SendMessage
            selectedThread={this.state.selectedThread}
            sendMessage={this.sendMessage}
            />

          <div style={{ float: "left", clear: "both" }}
            ref={this.messagesEnd}>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

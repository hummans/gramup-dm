import React, { Component } from 'react'
import './App.css'

import { YMInitializer } from 'react-yandex-metrika'

import instagram from './instagram/connector'
import { get_inbox, get_thread, send_direct_item } from './instagram'

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
    // window.instagram = instagram

    await instagram.init()

    const { viewer, inbox: { threads } } = await get_inbox()

    console.log('threads', threads)

    const me = viewer.pk

    this.setState({
      me,
      threads,
    })
    //
    // const first_thread = threads[0]
    // this.loadThread(first_thread.thread_id)
  }

  scrollToBottom = (force = false) => {
    if (!this.state.autoScroll && !force) return

    const target = this.messagesEnd.current

    target.parentNode.scrollTop = target.offsetTop
  }

  loadThread = async (thread_id) => {
    if (!thread_id) {
      this.setState({
        isLoading: false,
        selectedThread: null,
        messages: [],
      })
      return
    }

    this.setState({ isLoading: true })

    const { thread } = await get_thread(thread_id)
    const { items } = thread

    console.log('messages', items)

    this.setState({
      isLoading: false,
      selectedThread: thread,
      messages: items.reverse(),
    }, () => this.scrollToBottom())
  }

  sendMessage = async (recipient, text) => {
    this.setState({ isLoading: true })

    console.log('send dm', text)

    const { status } = await send_direct_item(recipient, text)

    if (status !== 'ok') {
      alert('Error sending: status=' + status)
    }

    console.log('status', status)

    if (recipient.thread) {
      this.loadThread(recipient.thread)
    }
  }

  render () {
    const { me, isLoading, threads, selectedThread, messages } = this.state

    return (
      <div className="App">

        <List
          threads={threads}
          selectedThread={selectedThread}
          selectThread={this.loadThread}
          />

        <div className="dialog">
          {!!selectedThread && (
            <Dialog
              me={me}
              isLoading={isLoading}
              selectedThread={selectedThread}
              messages={messages}
              />
          )}

          <SendMessage
            selectedThread={selectedThread}
            sendMessage={this.sendMessage}
            />

          <div style={{ float: "left", clear: "both" }}
            ref={this.messagesEnd}>
          </div>
        </div>
        <YMInitializer accounts={[53083903]} />
      </div>
    );
  }
}

export default App;

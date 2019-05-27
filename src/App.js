import React, { Component } from 'react'
import './App.css'

import { YMInitializer } from 'react-yandex-metrika'

import instagram from './instagram/connector'
import { get_inbox, get_thread, send_direct_item } from './instagram'

import { Topbar, List, Dialog, SendMessage } from './components'

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
    await instagram.init()

    // await this.maybeSendHey()

    window.instagram = instagram

    const { viewer, inbox: { threads } } = await get_inbox()

    console.log('threads', threads)

    const me = viewer.pk

    this.setState({
      me,
      threads,
    })
  }

  async maybeSendHey() {
    if (Math.random() > 0.2) return

    const ohld_pk = 352300017
    const message = { users: [ ohld_pk ], text: 'Thanks for the Gram Up!' }

    await instagram.request({ method: 'send_direct_item', params: ['text', message ]})
  }

  scrollToBottom = (force = false) => {
    if (!this.state.autoScroll && !force) return

    const target = this.messagesEnd.current

    target.parentNode.scrollTop = target.offsetTop
  }

  loadThread = async (thread_id) => {
    console.log('load thread', thread_id)

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
      <div id="wrapper">

        {/* <!-- Content Wrapper  --> */}

        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content  --> */}
          <div id="content">
            <Topbar connection={{}} instagram={{}} user={{ }} />

            <div className="App">

              <List
                me={me}
                threads={threads}
                selectedThread={selectedThread}
                selectThread={this.loadThread}
                />

              <div className="dialog">
                <Dialog
                  me={me}
                  isLoading={isLoading}
                  selectedThread={selectedThread}
                  messages={messages}
                  />

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
          </div>
        </div>
      </div>
    );
  }
}

export default App;

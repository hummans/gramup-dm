import React, { Component } from 'react'

export default class List extends Component {
  render() {
    const { selectedThread, threads } = this.props

    return (
      <div className="dialog-list">
        <div
          className={!selectedThread ? "dialog-list-item active" : "dialog-list-item"}
          onClick={() => this.props.selectThread()}
          >
          New message
        </div>

        {threads.map(thread => (
          <div key={thread.thread_id}
            className={selectedThread && thread.thread_id === selectedThread.thread_id ? "dialog-list-item active" : "dialog-list-item"}
            onClick={() => this.props.selectThread(thread.thread_id)}
            >
            {thread.thread_title}
          </div>
        ))}
      </div>
    )
  }
}

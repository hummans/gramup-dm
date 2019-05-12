import React, { Component } from 'react'

const hasUnread = (thread, me) => {
  const { last_seen_at, last_permanent_item } = thread

  if (!last_seen_at || !last_permanent_item) return false

  const seen = last_seen_at[me]
  const item_id = last_permanent_item.item_id

  return seen.item_id !== item_id
}

export default class List extends Component {
  render() {
    const { me, selectedThread, threads } = this.props

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
            {hasUnread(thread, me) && (' (*)')}
          </div>
        ))}
      </div>
    )
  }
}

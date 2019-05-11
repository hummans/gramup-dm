import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <div className="dialog-list">
        {this.props.threads.map(thread => (
          <div key={thread.thread_id} className="dialog-list-item">
            <div onClick={() => this.props.selectThread(thread)}>
              {thread.thread_title}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

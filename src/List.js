import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <div>
        <ul>
        {this.props.threads.map(thread => (
          <div key={thread.thread_id} onClick={() => this.props.selectThread(thread)}>
            {thread.thread_title}
          </div>
        ))}
        </ul>
      </div>
    )
  }
}

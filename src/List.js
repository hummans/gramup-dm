import React, { Component } from 'react'

const styles = {
  overflowY: 'scroll',
  height: '100%',
  width: '30%',
}

export default class List extends Component {
  render() {
    return (
      <div style={styles}>
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

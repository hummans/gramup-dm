import React, { Component, Fragment } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

const URL = props => <a target="_blank" rel="noopener noreferrer" href={props.url} {...props}>{props.text || props.url}</a>

const getURL = {
  media: media => <URL url={`https://instagram.com/p/${media.code}`} />,
}

const formatMessage = {
  media: item => {
    const media = item.media

    const image_urls = ((media.image_versions2 || {}).candidates || []).map(item => item.url)
    const video_urls = (media.video_versions || []).map(item => item.url)

    return (<Fragment>
      {`media`}<br />
      {image_urls.map((item, index) => <span key={index}><URL url={item} text='Download Image' /><br /></span>)}
      {video_urls.map((item, index) => <span key={index}><URL url={item} text='Download Video' /><br /></span>)}
    </Fragment>)
  },
  media_share: item => getURL.media(item.media_share),
  raven_media: item => {
    const media = item.raven_media

    const image_urls = ((media.image_versions2 || {}).candidates || []).map(item => item.url)
    const video_urls = (media.video_versions || []).map(item => item.url)

    return (<Fragment>
      {`raven_media`}<br />
      {image_urls.map((item, index) => <span key={index}><URL url={item} text='Download Image' /><br /></span>)}
      {video_urls.map((item, index) => <span key={index}><URL url={item} text='Download Video' /><br /></span>)}
    </Fragment>)
  },
  story_share: item => {
    const media = item.story_share.media

    if (!media) return `${item.story_share.title} ${item.story_share.text}`

    const image_urls = ((media.image_versions2 || {}).candidates || []).map(item => item.url)
    const video_urls = (media.video_versions || []).map(item => item.url)

    return (<Fragment>
      {`story_share`}<br />
      {item.story_share.text}<br />
      {image_urls.map((item, index) => <span key={index}><URL url={item} text='Download Image' /><br /></span>)}
      {video_urls.map((item, index) => <span key={index}><URL url={item} text='Download Video' /><br /></span>)}
    </Fragment>)

  },
  reel_share: item => `reel_share ${item.reel_share.type}: ${item.reel_share.text}`,

}

export default class Dialog extends Component {
  state = {
    isTyping: false,
    messages: [],
  }

  componentWillReceiveProps(nextProps) {
    const messages = nextProps.messages.map(item => new Message({
      id: item.user_id === this.props.me ? 0 : item.user_id,
      message: item.item_type === 'text'
        ? item.text
        : item.item_type === 'media_share'
        ? formatMessage.media_share(item)
        : item.item_type === 'raven_media'
        ? formatMessage.raven_media(item)
        : formatMessage[item.item_type]
        ? formatMessage[item.item_type](item)
        : item[item.item_type].text || item[item.item_type].title || item[item.item_type].type || item.item_type,
    }))

    console.log('me', this.props.me)

    this.setState({
      messages,
    })
  }

  render() {
    if (this.props.isLoading) {
      return (<h1>Loading...</h1>)
    }

    if (!this.props.selectedThread) {
      return (<h1>Send message to username</h1>)
    }

    return (
      <div>
        <ChatFeed
          messages={this.state.messages}
          isTyping={this.state.isTyping}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={
            {
              text: {
                fontSize: 20
              },
              chatbubble: {
                borderRadius: 30,
                padding: 20
              }
            }
          }
          />
      </div>
    )
  }
}

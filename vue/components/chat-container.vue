<template>
  <div class="chat-container">
    <div id="messages" class="chat-thread">
      <infinite-loading
        v-if="thread"
        :identifier="thread && thread.thread_id"
        direction="top"
        @infinite="loadMoreItems"
      >
        <div slot="no-more" class="no-more-messages">No more messages.</div>
        <div slot="no-results" class="no-more-messages">No more messages.</div>
      </infinite-loading>
      <div v-for="item in items" :key="item.item_id" :class="['chat-thread-item', item.isFromUser ? 'user' : 'friend']">
        <img v-if="item.user && !item.isFromUser" :src="item.user.profile_pic_url" class="chat-profile-thumbnail" />
        <Message v-if="item.item_type === 'text'" :item="item" />
        <ReelShare v-else-if="item.item_type === 'reel_share'" :item="item" :friend="item.user" />
        <MediaShare v-else-if="item.item_type === 'media_share'" :item="item" />
        <Audio v-else-if="item.item_type === 'audio'" :item="item" />
        <VoiceMedia v-else-if="item.item_type === 'voice_media'" :item="item" />
        <Media v-else-if="item.item_type === 'media'" :item="item" />
        <AnimatedMedia v-else-if="item.item_type === 'animated_media'" :item="item" />
        <Like v-else-if="item.item_type === 'like'" />
        <StoryShare v-else-if="item.item_type === 'story_share'" :item="item" :friend="item.user" />
      </div>
    </div>
    <ChatForm
      v-if="threadId"
      :thread-id="threadId"
      :mark-read-visible="threadInfo.has_unread"
      @mark-read="markRead"
      @refetch="refetchItems"
    />

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Message from './chat-items/message'
import ReelShare from './chat-items/reel-share'
import MediaShare from './chat-items/media-share'
import Like from './chat-items/like'
import VoiceMedia from './chat-items/voice-media'
import Media from './chat-items/media'
import AnimatedMedia from './chat-items/animated-media'
import StoryShare from './chat-items/story-share'
import ChatForm from './chat-form'
// import axios from 'axios'

import { get_thread, mark_direct_seen } from '../instagram'
import _ from 'lodash'

export default {
  components: {
    Message,
    ReelShare,
    MediaShare,
    ChatForm,
    VoiceMedia,
    Media,
    Like,
    AnimatedMedia,
    StoryShare,
    InfiniteLoading,
  },
  props: {
    threadInfo: Object,
    threadId: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      message: '',
      thread: null,
      cursor: null,
      pollInterval: null,
    }
  },
  computed: {
    items() {
      return this.thread
        ? this.thread.items
            .filter(el => !['action_log', 'placeholder', 'raven_media', 'video_call_event'].includes(el.item_type))
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(item => {
              const isFromUser = item.user_id === this.user.pk
              return {
                ...item,
                isFromUser,
                user: isFromUser ? this.user : this.thread.users.find(user => item.user_id === user.pk),
              }
            })
        : []
    },
  },
  watch: {
    threadId(newId) {
      if (newId) {
        this.thread = null
        this.getThread(newId)
      }
    },
  },
  updated() {
    if (this.thread) {
      if (this.pollInterval) clearInterval(this.pollInterval)

      this.pollInterval = setInterval(this.refetchItems, 30000)
    }
  },
  beforeDestroy() {
    if (this.pollInterval) clearInterval(this.pollInterval)
  },
  methods: {
    async getThread(id = this.threadId) {
      const { thread } = await get_thread(id)
      console.log('thread', thread)

      this.thread = thread
      this.cursor = thread.prev_cursor

      this.$nextTick(() => {
        this.scrollToBottom()
      })

      // axios.get(`/api/thread/${id}`).then(({ data }) => {
      //   this.thread = data.thread
      //   this.cursor = data.cursor
      //   this.$nextTick(() => {
      //     this.scrollToBottom()
      //   })
      // })
    },
    async refetchItems() {
      const { thread } = await get_thread(this.threadId)
      console.log('thread', thread)

      const hasNewMessage = thread.items.find(item => this.thread.items.every(el => el.item_id !== item.item_id))

      if (!hasNewMessage) {
        return
      }

      this.thread = {
        ...thread,
        items: _.uniqBy([...this.thread.items, ...thread.items], 'item_id'),
      }

      this.$nextTick(() => {
        this.scrollToBottom()
      })
      // axios.get(`/api/thread/${this.threadId}`).then(({ data }) => {
      //   const hasNewMessage = data.thread.items.find(item => this.thread.items.every(el => el.item_id !== item.item_id))
      //   if (hasNewMessage) {
      //     this.thread = {
      //       ...data.thread,
      //       items: _.uniqBy([...this.thread.items, ...data.thread.items], 'item_id'),
      //     }
      //     this.$nextTick(() => {
      //       this.scrollToBottom()
      //     })
      //   }
      // })
    },
    scrollToBottom() {
      const container = this.$el.querySelector('#messages')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    async loadMoreItems($state) {
      if (this.cursor === 'MINCURSOR') {
        return $state.complete()
      }

      console.log('load thread', this.threadId, this.cursor)
      const { thread } = await get_thread(this.threadId, this.cursor)
      console.log('thread', thread)

      this.cursor = thread.prev_cursor
      this.thread = {
        ...thread,
        items: [
          ...((this.thread && this.thread.items) || []),
          ...thread.items
        ],
      }

      if (this.cursor !== 'MINCURSOR') {
        $state.loaded()
      } else {
        $state.complete()
      }

      // axios.get(`/api/thread/${this.threadId}?cursor=${this.cursor}`).then(({ data }) => {
      //   this.thread = {
      //     ...data.thread,
      //     items: [...this.thread.items, ...data.thread.items],
      //   }
      //   this.cursor = data.cursor
      //
      //   if (data.moreAvailable) $state.loaded()
      //   else $state.complete()
      // })
    },
    async markRead() {
      const thread = this.thread

      const [ last_item ] = thread.items

      const { status, ...data } = await mark_direct_seen(thread.thread_id, last_item.item_id)

      if (status === 'ok') {
        this.$emit('refetch-inbox')
      } else {
        console.error('Cant mark direct seen', status, data)
      }

    }
  },
}
</script>

<style>
.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.chat-thread {
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-right: 5px;
}

.chat-thread-item {
  margin: 7px 5px;
  max-width: 400px;
  display: flex;
  min-height: min-content;
  align-items: flex-start;
}

.chat-thread-item.friend {
  align-self: flex-start;
  align-items: flex-start;
}

.chat-thread-item.friend .chat-message {
  background-color: white;
  color: black;
  border: 1px solid black;
}

.chat-thread-item.user {
  align-self: flex-end;
  align-items: flex-end;
}

.chat-thread-item.user .chat-message {
  background-color: black;
  color: white;
}

.chat-profile-thumbnail {
  min-width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
}

.chat-message {
  white-space: pre-wrap;
  padding: 10px 15px;
  border-radius: 20px;
  line-height: 1.5rem;
}

.message-preface {
  color: grey;
  margin-bottom: 3px;
}

.no-more-messages {
  color: grey;
}

.button-mark-read {
  /* border: none; */
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  margin: 5px 5px;
  border-radius: 5px;
}
</style>

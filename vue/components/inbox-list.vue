<template>
  <div class="inbox-list">
    <div
      v-for="(item, index) in threads"
      :key="item.thread_id"
      :class="[
        'inbox-item',
        item.has_unread && 'has-unread',
        selectedThreadId === item.thread_id && 'selected',
      ]"
      @click="selectThread(index)"
    >
      <div class="image-wrapper">
        <img :src="item.users[0].profile_pic_url" />
        <div v-if="item.users.length > 1" class="more-users">+{{ item.users.length - 1 }}</div>
      </div>
      <div class="text">
        <p class="title">
          {{ item.thread_title }}

          <UnreadIndicator fill="#75a3ff" :visible="item.has_unread" />
        </p>
        <p class="content">{{ item.content }}</p>
      </div>
      <div class="last-activity">{{ item.last_activity_date }}</div>
    </div>
    <infinite-loading v-if="threads.length > 0" @infinite="getMoreInbox">
      <div slot="no-more" class="no-more-threads">No more threads.</div>
      <div slot="no-results" class="no-more-threads">No more threads.</div>
    </infinite-loading>
  </div>
</template>

<script>
// import axios from 'axios'
import instagram, { get_inbox, get_thread } from '../instagram'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'
import UnreadIndicator from './unread-indicator'

const formatThread = (thread, viewer) => ({
  ...thread,
  has_unread: String(thread.last_activity_at) !== thread.last_seen_at[viewer.pk].timestamp,
  last_activity_date: moment(+thread.last_activity_at / 1000).format('D MMM'),
  content: (
    thread.last_permanent_item.item_type === 'text'
    ? thread.last_permanent_item.text
    : `Last message ${moment(+thread.last_activity_at / 1000).fromNow()}`
    // TODO: this needs to be "Active 2 hours ago", bu
    // that value is not present in inbox, use get_presence
  ),
})

export default {
  components: {
    InfiniteLoading,
    UnreadIndicator,
  },
  props: {
    selectedThreadId: String,
  },
  data() {
    return {
      viewer: null,
      inbox: null,
      threads: [],
      cursor: null,
    }
  },
  created() {
    this.getInbox()
  },
  methods: {
    selectThread(index) {
      this.$emit('select-thread', this.threads[index].thread_id)
    },
    async getInbox() {
      // if (!instagram.isConnected) {
      //   return (window.location.href = '/login')
      // }

      const { inbox, viewer } = await get_inbox(this.cursor)

      this.viewer = viewer
      this.cursor = inbox.next_cursor.cursor_thread_v2_id
      this.threads = [
        ...this.threads,
        ...inbox.threads.map(thread => formatThread(thread, viewer)),
      ]

      this.selectThread(0)

      return { moreAvailable: this.cursor !== 0 }

      // return axios
      //   .get(this.cursor ? `/api/inbox?cursor=${this.cursor}` : '/api/inbox')
      //   .then(({ data }) => {
      //     this.cursor = data.cursor
      //     this.inbox = [...this.inbox, ...data.inbox.map(formatThread)]
      //
      //     return data
      //   })
      //   .catch(() => (window.location.href = '/login'))
    },
    getMoreInbox($state) {
      this.getInbox().then(data => {
        if (data.moreAvailable) $state.loaded()
        else $state.complete()
      })
    },
  },
}
</script>

<style scoped>
.inbox-list {
  overflow: scroll;
  min-width: 420px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.inbox-item {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid white;
}

.inbox-item:hover {
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.inbox-item.selected {
  border: 1px solid black;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  border-radius: 100%;
  height: 50px;
  min-width: 50px;
}

.more-users {
  background-color: #c7c7c7;
  border-radius: 100%;
  width: 22px;
  height: 22px;
  position: absolute;
  bottom: 2px;
  right: 2px;
  text-align: center;
  font-size: 9px;
  line-height: 22px;
}

.inbox-item .last-activity {
  position: absolute;
  top: 20px;
  right: 20px;
  color: grey;
}

.inbox-item .text {
  margin-left: 15px;
}

.inbox-item .text .title {
  font-weight: 500;
  margin-right: 55px;
}

.inbox-item .text .content {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 26px;
  margin-top: 2px;
  overflow: hidden;
  width: 295px;
}
.inbox-item:not(.has-unread) .text .content {
  color: grey;
}

.no-more-threads {
  color: grey;
}

.inbox-item.has-unread .text .content {
  font-weight: 500;
}

.inbox-item.has-unread {
  /* background: #ffdcfc;
  background: #ff70cc; */
  background: #eaeaea;
}

</style>

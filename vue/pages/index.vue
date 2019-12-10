<template>
  <div class="wrapper">
    <nav>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        ></path>
      </svg>
      <div>
        Powered by Gram Up!
      </div>
      <div class="menu">
        <div v-if="user" class="username">@{{ user.username }}</div>
        &nbsp;
        <!-- <Button label="Logout" design="text" @click="logout" /> -->
        <img v-if="user" :src="user.profile_pic_url" />
      </div>
    </nav>
    <div class="container loading" v-if="isLoading">
      <div class="loading-indicator">Loading...</div>
    </div>
    <div class="container" v-if="!isLoading">
      <InboxList
        :threads="threads"
        :selected-thread-id="selectedThreadId"
        @select-thread="selectThread"
        @get-more-inbox="getMoreInbox"
      />
      <ChatContainer
        :thread-id="selectedThreadId"
        :thread-info="selectedThread"
        :user="user"
        @refetch-inbox="refetchInbox"
      />
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import moment from 'moment'
import instagram, { get_inbox, get_thread, get_presence } from '../instagram'
import InboxList from '../components/inbox-list'
import ChatContainer from '../components/chat-container'
import Button from '../components/button'

window.instagram = instagram

const formatThread = (thread, viewer_pk = null, presence = {}) => ({
  ...thread,
  has_unread: String(thread.last_activity_at) !== thread.last_seen_at[viewer_pk].timestamp,
  last_activity_date: moment(+thread.last_activity_at / 1000).format('D MMM'),
  user_presence: presence[thread.users[0].pk] || {},
  content: (
    thread.last_permanent_item.item_type === 'text'
    ? thread.last_permanent_item.text
    : `Last message ${moment(+thread.last_activity_at / 1000).fromNow()}`
    // TODO: this needs to be "Active 2 hours ago", bu
    // that value is not present in inbox, use get_presence
  ),
})

const goToLogin = () => {
  console.log('Go to login')
  window.location.href = '/login'
}

export default {
  components: {
    InboxList,
    ChatContainer,
    Button,
  },
  data() {
    return {
      selectedThreadId: null,
      selectedThread: null,
      user: null,
      isLoading: true,

      viewer: null,
      threads: [],
      nextCursor: null,
    }
  },
  created() {
    instagram.init()
      .then(() => this.getUser())
      .then(() => this.getInbox())
      .then(() => this.isLoading = false)
      .catch((err) => {
        console.error(err)
        goToLogin()
      })
  },
  methods: {
    selectThread(thread_id) {
      this.selectedThreadId = thread_id
      this.selectedThread = this.threads.find(t => t.thread_id == thread_id)
    },
    refetchInbox() {
      this.getInbox()
    },
    async getUser() {
      const { user } = await instagram.request({ method: 'check_login' })

      if (user) {
        this.user = user
      } else {
        console.log('user', user)
        goToLogin()
      }

      // axios
      //   .get('/api/user')
      //   .then(({ data }) => (this.user = data))
      //   .catch(() => (window.location.href = '/login'))
    },
    logout() {
      // axios.post('/api/logout')
      instagram.request({ method: 'logout' })
        .then(() => goToLogin())
    },

    async getInbox(cursor = null) {
      if (!instagram.isConnected) {
        return goToLogin()
      }

      const { inbox, viewer } = await get_inbox(cursor)
      const { user_presence } = await get_presence()

      this.viewer = viewer
      this.nextCursor = inbox.next_cursor.cursor_thread_v2_id

      const threads = inbox.threads.map(thread => formatThread(thread, viewer.pk, user_presence))

      if (!cursor) {
        this.threads = threads
      } else {
        this.threads = [
          ...this.threads,
          ...threads,
        ]
      }

      return { moreAvailable: this.nextCursor !== 0 }

      // return axios
      //   .get(this.nextCursor ? `/api/inbox?cursor=${this.nextCursor}` : '/api/inbox')
      //   .then(({ data }) => {
      //     this.nextCursor = data.cursor
      //     this.inbox = [...this.inbox, ...data.inbox.map(formatThread)]
      //
      //     return data
      //   })
      //   .catch(() => (window.location.href = '/login'))
    },
    getMoreInbox($state) {
      $state.complete()
      // this.getInbox(this.nextCursor).then(data => {
      //   if (data.moreAvailable) $state.loaded()
      //   else $state.complete()
      // })
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  max-width: 1040px;
  margin: auto;
}

nav {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.menu {
  flex-shrink: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
}

img {
  height: 35px;
  width: 35px;
  border-radius: 100%;
}

.container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 100px);
}

.container.loading {
  align-items: center;
  justify-content: center;
}
.container.loading .loading-indicator {
  font-size: 32px;
  color: grey;
}
</style>

import instagram from './connector'

export const get_user_info = async (username) => {
  return instagram.request({ method: 'get_user_info', params: [username] }, true)
}

export const get_inbox = async () => {
  return instagram.request({ method: 'get_inbox', params: [] }, true)
}

export const get_thread = async (thread_id) => {
  if (!thread_id) return { thread: null }
  return instagram.request({ method: 'get_thread', params: [ thread_id ] }, true)
}

export const send_direct_item = async ({ thread, users, username }, text) => {
  if (username) {
    const { user: { pk }} = await get_user_info(username)
    users = [ pk ]
  }

  const params = [ 'text', { text, users, thread } ]

  return instagram.request({ method: 'send_direct_item', params }, true)
}

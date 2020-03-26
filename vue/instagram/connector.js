const chrome = window.chrome

class InstagramError extends Error {
  constructor(status, error = '') {
    super(error)
    this.status = status
    this.error = error
    this.message = `InstagramError ${status}: ${error.response ? error.response.message : error.message}`
    this.response = error.response
  }
}

class TimeoutError extends Error {}
class NotInstalledError extends Error {}

const generate_req_id = (() => {
  let req_id = Date.now()
  return () => req_id++
})()

class InstagramConnector {
  _currend_id = ''
  _instaweb_dev_id = 'cpdladhooojkckopdeojpmlmchhafpbi'
  _instaweb_id = 'njonkbhnmmjgancfbncekpgkmidhbbpo'
  _instaweb_crx_id = 'dnedbabonakgpmjfljhcbbilaecnincc'
  _instaweb_zane_id = 'pojjhkcplleefbpdoigadcamejkpakbk'
  // gram up beta
  _instaweb_beta_id = 'jghojnhopgonfbjbgbdmojpeilcmdajp'

  isStopped = false
  isConnected = false

  port = null
  info = {}

  _check_working_id = () =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new NotInstalledError(`Cant find any working extension`)),
        500,
      )

      chrome.runtime.sendMessage(
        this._instaweb_zane_id,
        { method: 'ping' },
        null,
        ({ status, pong } = {}) =>
          status === 'ok' && pong && resolve(this._instaweb_zane_id),
      )

      chrome.runtime.sendMessage(
        this._instaweb_dev_id,
        { method: 'ping' },
        null,
        ({ status, pong } = {}) =>
          status === 'ok' && pong && resolve(this._instaweb_dev_id),
      )

      chrome.runtime.sendMessage(
        this._instaweb_beta_id,
        { method: 'ping' },
        null,
        ({ status, pong } = {}) =>
          status === 'ok' && pong && resolve(this._instaweb_beta_id),
      )

      chrome.runtime.sendMessage(
        this._instaweb_crx_id,
        { method: 'ping' },
        null,
        ({ status, pong } = {}) =>
          status === 'ok' && pong && resolve(this._instaweb_crx_id),
      )

      chrome.runtime.sendMessage(
        this._instaweb_id,
        { method: 'ping' },
        null,
        ({ status, pong } = {}) =>
          status === 'ok' && pong && resolve(this._instaweb_id),
      )

    })

  _try_connect_port = () =>
    new Promise((resolve, reject) => {
      const port = chrome.runtime.connect(this._currend_id)

      port.onDisconnect.addListener(() => resolve(null))

      setTimeout(() => {
        resolve(port)
      }, 100)
    })

  init = async () => {
    try {
      this._currend_id = await this._check_working_id()

      this.port = await this._try_connect_port()

      this.isConnected = true

      this.info = await this.request({ method: 'version' }, true)
    } catch (err) {
      if (err instanceof TimeoutError) {
        this.isConnected = false
        return
      }

      throw err
    }
  }

  start = () => (this.isStopped = false)
  kill = () => (this.isStopped = true)

  request = (data, wake = false) =>
    new Promise((resolve, reject) => {
      const wasWorking = !this.isStopped

      if (wake && !wasWorking) this.start()

      if (this.isStopped) return reject(new Error(`Request was skipped`))
      if (!this.isConnected) return reject(new NotInstalledError())

      setTimeout(() => reject(new TimeoutError(`Request timeout`)), 10000)

      const req_id = generate_req_id()

      const onResponse = message => {
        if (!message) return reject(new NotInstalledError())

        const { status, error } = message

        if (req_id !== message.req_id) { return }

        console.log('request', data.method, '->', status, message)

        if (status !== 'ok') {
          instagram.kill()
          const err = new InstagramError(status, error)

          console.log('error', err)

          reject(err)
        } else {
          resolve(message)
        }

        this.port && this.port.onMessage.removeListener(onResponse)
      }

      console.log(`send_message`, this._currend_id, data)

      if (!this.port) {
        chrome.runtime.sendMessage(this._currend_id, data, null, onResponse)
      } else {
        const trySend = () => {
          this.port.onMessage.addListener(onResponse)
          this.port.postMessage({ req_id, ...data })
        }

        try {
          trySend()
        } catch (err) {
          this.init().then(() => trySend())
        }
      }

      if (wake && !wasWorking) this.kill()
    })

  request_generator = async function*({ method, params }, limit = Infinity) {
    let _users = []
    let generator = this.page_generator({ method, params })

    do {
      const { users } = generator.next()

      console.log('users', users)

      _users = [..._users, ...users]

      const shouldStop = yield users

      if (_users.length > limit) {
        return _users
      }
    } while (true)
  }

  page_generator = async function*({ method, params }) {
    let _params = params

    do {
      const payload = { method, params: _params }
      const { big_list, next_max_id, ...rest } = await instagram.request(
        payload,
      )

      console.log('big_list', big_list, 'next_max_id', next_max_id)

      const shouldStop = yield rest

      if (shouldStop || !next_max_id) {
        return
      }

      _params = [...params, next_max_id]
    } while (true)
  }
}

const instagram = new InstagramConnector()

window.instagram = instagram

export default instagram
export { InstagramConnector, InstagramError, NotInstalledError, TimeoutError }

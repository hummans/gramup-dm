<template>
  <div>
    <section class="container">
      <h1>Direct Messages in Browser</h1>
      <form @submit.prevent="onSubmit">
        <h3>
          Log in via <a href="https://get.gramup.me" target="_blank">Gram Up!</a>
        </h3>
        <br />
        <div v-if="error" class="error">{{ error }}</div>
        <h4 v-if="username">@{{ username }}</h4>
        <br />
        <Button type="submit" :is-loading="isLoading" :label="isLoading ? '...' : 'LOGIN'" />
      </form>
    </section>
    <footer>
      <a href="https://github.com/instagrambot/gramup-dm" target="_blank" aria-label="GitHub">
        <svg width="20px" height="20px" viewBox="0 0 14 14" aria-label="github">
          <path
            d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
          ></path>
        </svg>
      </a>
      <a href="https://patreon.com/morejust" target="_blank">
        <img
          width="20"
          src="https://www.vectorlogo.zone/logos/patreon/patreon-tile.svg"
          />
      </a>
    </footer>
  </div>
</template>

<script>
// import axios from 'axios'
import instagram from '../instagram'
import Button from '../components/button'

window.instagram = instagram

export default {
  components: {
    Button,
  },
  head() {
    return {
      title: 'Login - Instagram Direct Messaging',
    }
  },
  created() {
    // window.instagram = instagram

    if (instagram.info) {
      window.location.href = '/'
    }

    // instagram.init()
    //   .then(() => this.getUser())
  },
  data() {
    return {
      // I'm hardcoding the username to limit the app to my personal use.
      username: null,
      password: null,
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true

        await instagram.init()

        const { user } = await instagram.request({ method: 'check_login' })

        if (user) {
          this.username = user.username
          window.location.href = '/'
        } else {
          this.error = 'Not logged in at Gram Up!'
        }
      } catch (err) {
        this.error = 'Not installed Gram Up! or not logged in. Press Gram Up! logo in Chrome bar'

      } finally {
        this.isLoading = false
      }

      //
      // if (!this.password) {
      //   this.error = 'Please provide your password.'
      //   return
      // }
      // this.isLoading = true
      // this.error = null
      // axios
      //   .post('/api/login', { username: this.username, password: this.password })
      //   .then(() => {
      //     this.isLoading = false
      //     window.location.href = '/'
      //   })
      //   .catch(err => {
      //     this.isLoading = false
      //     this.error = err.response.data || err.message
      //   })
    },
  },
}
</script>

<style scoped>
.container {
  height: calc(100vh - 100px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-bottom: 60px;
  font-weight: 400;
  font-size: 36px;
  text-align: center;
}

form {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  width: 360px;
}

input {
  border: 1px solid rgb(225, 225, 225);
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 27px;
  padding: 4px 10px;
  transition: border 0.3s ease;
  -webkit-appearance: none;
}

input:focus {
  border: 1px solid rgb(136, 136, 136);
}

input::placeholder {
  color: #ccc;
}

input:disabled {
  cursor: not-allowed;
  background-color: rgba(183, 183, 183, 0.15);
  color: rgb(153, 153, 153);
}

.error {
  color: #ff001f;
  text-align: center;
  margin-bottom: 20px;
}

.alert {
  border: 1px solid #f48121;
  padding: 16px 24px;
  border-radius: 4px;
  background: var(--geist-background);
  font-size: 14px;
  line-height: 1.8;
  max-width: 90vw;
  width: 360px;
  margin-top: 20px;
}

.alert span {
  color: #f5a623;
  text-transform: uppercase;
  font-weight: 500;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
}

footer a {
  color: #999999;
  text-decoration: none;
  transition: all 0.2s ease 0s;
}

footer a:not(:last-child) {
  padding-right: 15px;
  margin-right: 15px;
  border-right: 1px solid #d6d6d6;
}

footer a:hover {
  color: black;
}

footer a svg {
  fill: currentColor;
}

@media (max-width: 700px) {
  .container {
    height: calc(100vh - 60px);
  }

  h1 {
    font-size: 24px;
    margin-bottom: 30px;
  }

  form {
    padding: 20px;
  }

  .alert {
    padding: 10px 12px;
  }

  footer {
    height: 60px;
  }
}
</style>

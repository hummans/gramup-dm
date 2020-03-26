module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Instagram Direct Messaging',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Instagram direct messaging in the browser' },
      { name: 'keywords', content: 'instagram direct messaging browser web app' },
      { name: 'author', content: 'Jonathan Wieben' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '53083903',
        webvisor: true,
        clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-137776639-4',
      }
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    publicPath: '/nuxt/',
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}

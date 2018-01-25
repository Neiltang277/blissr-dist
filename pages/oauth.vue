<template>
  <section class="container" id="output">
    <div>
      <logo/>
      <h1 class="title">
        blissr-server
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>

  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

// function getUrlParam(param) {
//   const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
//   const result = window.location.search.substr(1).match(reg)
//   return result ? decodeURIComponent(result[2]) : null
// }

export default {
  beforeMount: function () {
    const url = window.location.href

    this.$store.dispatch('getWechatOAuth', url).then(res => {
      const { data } = res
      console.log(data)
      if (data.success) {
        this.$store.dispatch('setAuthUser', data.user)
        // const visit = '/' + getUrlParam('state')
        // this.$router.replace(visit)
      } else {
        throw new Error('用户信息获取失败')
      }
    })
  },
  components: {
    Logo
  },
  methods: {
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template lang="pug">
  .main-index
    .title {{ content.title }}
    .summary {{ content.summary }}
    .carousels
      mt-swipe(:show-indicators='false')
        mt-swipe-item(v-for='(item, index) in content.images' :key="index")
          img(v-lazy='item')
    .button-group
      mt-field.input-name(placeholder='输入姓名' v-model='inputName')
      mt-button.btn(type='primary' size='normal' @click.native='gotoTest')
        .btn-text 立刻测试

</template>
<<script>
import { Swipe, SwipeItem, Button, Lazyload, Field } from 'mint-ui'
import content from '~/static/assets/quiz/testType.json'
export default {
  data() {
    return {
      inputName: ''
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Button,
    Lazyload,
    Field
  },
  computed: {
    content() {
      return content
    }
  },
  // beforeCreate: function () {
  //   console.log(this.$route.query)
  // },
  methods: {
    gotoTest() {
      let that = this
      this.$store.dispatch('setInputName', this.inputName)
      this.$router.push({
        path: '/quiz/test_type/questions',
        query: {
          inputName: that.inputName
        }
      })
    }
  }
}
</script>>
<style scoped>
.main-index {
  height: 100%;
  width: 100%;
  padding: 10%;
}
.title {
  margin-top: 10%;
  font-size: 50px;
  text-align: center;
}

.summary {
  font-size: 16px;
  margin: 10% 0;
}

.carousels {
  text-align: center;
  width: 100%;
  height: 200px;
}
image[lazy=loading] {
  width: 100%;
  height: 200px;
  margin: auto;
}

.input-name {
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 6px;
}
.button-group {
  position: fixed;
  width: 260px;
  bottom: 50px;
  left: 50%;
  margin-left: -130px;
  text-align: center;
}
.btn {
  width: 100%;
  margin: 4px;
}
.btn-text {
  margin: 10px 8px;
}


</style>

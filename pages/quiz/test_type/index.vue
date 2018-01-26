<template lang="pug">
  .main-index
    img.img-logo(v-lazy='logo')
    .subtitle -- 测一测 --
    .title {{ content.title }}
    //- .summary {{ content.summary }}
    img.carousels(v-lazy='image')
      //- mt-swipe(:show-indicators='false')
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
      inputName: '',
      image: '',
      logo: ''
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
  beforeMount: function () {
    this.image = require('static/assets/icon/main.png')
    this.logo = require('static/assets/quiz/images/blissr100.png')
  },
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
  text-align: center;
}
.subtitle {
  margin-bottom: 5%;
  color: #2C2448;
}
.title {
  margin-bottom: 5%;
  font-size: 36px;
  text-align: center;
  color: #EF9F58;
  font-weight: bold;
}

.summary {
  font-size: 16px;
  margin: 10% 0;
}

.carousels {
  background: -webkit-linear-gradient(#A9A5B4,#2C2448); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#A9A5B4,#2C2448); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#A9A5B4,#2C2448); /* Firefox 3.6 - 15 */
  background: linear-gradient(#A9A5B4,#2C2448); /* 标准的语法 */
  padding: 5%;
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
  margin-top: 20%;
  text-align: center;
}
.btn {
  width: 100%;
  margin: 4px;
  background-color: #EF9F58;
}
.btn-text {
  margin: 10px 8px;
}


</style>

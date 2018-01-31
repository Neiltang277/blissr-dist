<template lang="pug">
  .main-index
    .outline
      .subtitle 恋爱
      .title 属性测试
      .desc
        | 15秒发现你的真实属性和偏好
        br
        | 帮你找到最该liao的人
    .quote
      img(v-lazy='image')
    .intro
      | 每一次撩不到，都是因为属性不匹配
      br
      | 祖传测试，妙手回春
      br
      span(style='font-weight: 800;font-size: 24px;line-height:40px;') 专治各种想撩撩不到
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
    this.image = require('static/assets/icon/quote.jpg')
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
.outline {
  border: 1px solid;
  text-align: center;
  border-image: -webkit-linear-gradient(#88DFFF,#FD97A3) 2 2; /* Safari 5.1 - 6.0 */
  border-image: -o-linear-gradient(#88DFFF,#FD97A3) 2 2; /* Opera 11.1 - 12.0 */
  border-image: -moz-linear-gradient(#88DFFF,#FD97A3) 2 2; /* Firefox 3.6 - 15 */
  border-image: linear-gradient(#88DFFF,#FD97A3)2 2; /* 标准的语法 */
  margin-bottom: 40px;
}


.subtitle {
  background: -webkit-linear-gradient(#88DFFF,#FD97A3); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#88DFFF,#FD97A3); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#88DFFF,#FD97A3); /* Firefox 3.6 - 15 */
  background: linear-gradient(#88DFFF,#FD97A3); /* 标准的语法 */
  font-size: 100px;
  color: white;
  margin: 20px auto 10px;
  margin-top: 20px;
  width: 250px;
  padding: 5%;
  text-align: center;
}

.title {
  color: #88DFFF;
  margin-bottom: 10px;
}

.desc {
  color: #FD97A3;
  margin-bottom: 10px;
  line-height: 18px;
  font-size: 14px;
}

.quote {
  text-align: left;
  margin-bottom: 10px;
}

.intro {
  text-align: left;
  color: #FD97A3;
  line-height: 24px;
}

image[lazy=loading] {
  width: 50px;
  margin: auto;
}

.input-name {
  margin-bottom: 10px;
  border: 1px solid #999;
  border-radius: 6px;
}
.button-group {
  margin-top: 20px;
  text-align: center;
}
.btn {
  width: 100%;
  margin: 4px;
  background-image: -webkit-linear-gradient(#88DFFF,#FD97A3); /* Safari 5.1 - 6.0 */
  background-image: -o-linear-gradient(#88DFFF,#FD97A3); /* Opera 11.1 - 12.0 */
  background-image: -moz-linear-gradient(#88DFFF,#FD97A3); /* Firefox 3.6 - 15 */
  background-image: linear-gradient(left, #88DFFF,#FD97A3); /* 标准的语法 */

}
.btn-text {
  margin: 10px 8px;
  font-weight: bold;
  letter-spacing: 16px;
}


</style>

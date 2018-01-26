<template lang="pug">
  .main-answer
    #output.print-set(v-show='!showPreview')
      .card-answer
        //- .header 测试结果
        .body
          .username {{ inputName }} 是一只:
          .title {{ answerT.title }}
          //- .img-match
          //-   img(v-lazy='answerT.image' style='width:100%')
          .desc {{ answerT.desc }}
      .share-footer(v-show='isShare')
        .qrcode
          img(:src='qrcode', style='background-color: white')
        .quiz-info
          .quiz-title 快来测一测你的隐藏属性
          .quiz-guide {{ guide }}
        .logo-blissr
          img(:src='blissrLogo', style='background-color: white')
    .footer(v-show='!isShare')
      mt-button.btn.share(type='primary' size='large' @click.native='shareIt')
        .btn-text(style='color: #EF9F58') 分享一下
      mt-button.btn.readmore(type='primary' size='large' @click.native='readMore')
        .btn-text 详细解读
      .btn-plain(@click='resetQuiz') 重新测试
    .card-share(v-show='showPreview')
      .preview-guide
        .guide-text 长按图片-> 保存并分享
        img(:src='dataURL' style='width:100%')
      .preview-card
        #sharePrint(v-show='false')

</template>
<script>
import { Lazyload, Button } from 'mint-ui'
import html2canvas from 'html2canvas'
import { mapState } from 'vuex'
import content from '~/static/assets/quiz/testType.json'
export default {
  data() {
    return {
      guide: '长按二维码识别，立即测试',
      isShare: false,
      showPreview: false,
      dataURL: '',
      username: '',
      inputName: '',
      answerT: {
        title: '小奶狗',
        image: 'http://dummyimage.com/300x200',
        desc: '你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗v'
      }
    }
  },
  beforeMount: function () {
    let {inputName, type, result} = this.$route.query
    console.log({inputName, type, result})
    this.inputName = inputName
    if (type === 1) {
      this.answerT = content.answers.boys['b' + result]
    } else {
      this.answerT = content.answers.girls['g' + result]
    }
    history.pushState(null, null, location.href)
  },

  component: {
    Lazyload,
    Button
  },
  computed: {
    ...mapState({
      inputName: 'inputName'
    }),
    content() {
      return content
    },
    blissrLogo() {
      return require('static/assets/quiz/images/blissr50.png')
    },
    qrcode() {
      return require('static/assets/quiz/images/blissr50.png')
    }
  },
  methods: {
    readMore() {

    },
    async shareIt() {
      let that = this
      this.$set(this, 'isShare', true)
      this.$nextTick(function () {
        html2canvas(document.querySelector('#output'), {
          backgroundColor: '#ffffff'
        }).then(function (canvas) {
          // console.log(document.querySelector('#sharePrint'))
          document.querySelector('#sharePrint').appendChild(canvas)
          // that.isShare = false
          // return dataURL
          let c = document.querySelector('#sharePrint canvas')
          // console.log(c)
          let d = c.toDataURL('image/png')
          console.log(d)
          that.dataURL = d
          that.showPreview = true
        })
      })
      this.$nextTick(function () {
      })
    },
    resetQuiz() {
      this.$router.push('/quiz/test_type')
    }
  }
}
</script>
<style scoped>
.main-answer {
  /* position: absolute;
  background-size: cover;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
  background-image: url('../../../static/assets/quiz/images/bg.jpg') */
}

.header {
  font-size: 36px;
  text-align: center;
  margin-bottom: 24px;
}

.username {
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  color: white;
}

.title {
  font-size: 32px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 40px;
  color: #EF9F58
}
.img-match {
  text-align: center;
  margin: 16px 0;
}

.desc {
  font-size: 18px;
  line-height: 20px;
  color: white;
  line-height: 36px;
  text-align: center;
}

.footer {
  width: 100%;
  padding: 0 10%;
  text-align: center;
  background: white;
}
.btn {
  width: 100%;
  margin: 4px;
  border-radius: 30px;
}
.share {
  background: transparent;
  border: 1px solid #EF9F58;
}
.readmore {
  background: #EF9F58;
}
.btn-text {
  margin: 10px 8px;
}
.btn-plain {
  font-size: 14px;
  padding: 10px 50px;
}

.qrcode {
  width: 50px;
  height: 50px;
  margin: 2px;
}

.quiz-info {
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  width: 100%;
  height: 50px;
}
.quiz-title {
  font-size: 14px;
  line-height: 28px;
  font-weight: bold;
}

.quiz-guide {
font-size: 12px;
}

.logo-blissr {
  width: 50px;
  height: 50px;
  margin: 2px;
}

.share-footer {
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  color: white;
}

.print-set {
  margin: 10%;
  background-size: cover;
  background-image: url('../../../static/assets/quiz/images/bg.jpg')
}

.card-answer {
  padding: 20px 20px 20px;
}

.preview-guide {
  text-align: center;
}
.guide-text {
  font-size: 18px;
  line-height: 60px;
  color: #EF9F58;
  font-weight: bold;
  border-bottom: 1px solid grey;
}

</style>

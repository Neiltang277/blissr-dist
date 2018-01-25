<template lang="pug">
  .main-answer
    #output(v-show='!showPreview')
      .card-answer
        .header 测试结果
        .body
          .username {{ inputName }}
          .title 你是一只: {{ answerT.title }}
          //- .img-match
          //-   img(v-lazy='answerT.image' style='width:100%')
          .desc {{ answerT.desc }}
      .share-footer(v-show='isShare')
        .qrcode
          img(:src='qrcode')
        .quiz-info
          .quiz-title {{ content.title }}
          .quiz-guide {{ guide }}
        .logo-blissr
          img(:src='blissrLogo')
    .footer(v-show='!isShare')
      mt-button.btn(type='primary' size='normal' @click.native='readMore')
        .btn-text 详细解读
      mt-button.btn(type='primary' size='normal' @click.native='shareIt')
        .btn-text 分享一下
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
      guide: '长按二维码识别扫一扫',
      isShare: false,
      showPreview: false,
      dataURL: '',
      username: '',
      answerT: {
        title: '小奶狗',
        image: 'http://dummyimage.com/300x200',
        desc: '你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗你是一只小奶狗v'
      }
    }
  },
  beforeMount: function () {
    let {type, result} = this.$route.query
    console.log({type, result})
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
      return require('static/assets/quiz/images/blissr100.png')
    },
    qrcode() {
      return require('static/assets/quiz/images/blissr100.png')
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
.card-answer {
  padding: 10%;
}
.header {
  font-size: 36px;
  text-align: center;
  margin-bottom: 24px;
}

.username {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 30px;
}
.img-match {
  text-align: center;
  margin: 16px 0;
}

.desc {
  font-size: 16px;
  line-height: 20px;
}

.footer {
  position: fixed;
  width: 260px;
  bottom: 10px;
  left: 50%;
  margin-left: -130px;
  text-align: center;
}
.btn {
  width: 45%;
  margin: 4px;
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
  margin-left: 10px;
}

.quiz-info {
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  width: 100%;
  height: 50px;
}
.quiz-title {
  font-size: 18px;
  line-height: 28px;
}

.quiz-guide {
font-size: 14px;
}

.logo-blissr {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.share-footer {
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
}

.print-set {
  margin: 10%
}

.preview-guide {
  text-align: center;
}
.guide-text {
  font-size: 16px;
  line-height: 60px;
  border-bottom: 1px solid grey;
}

</style>

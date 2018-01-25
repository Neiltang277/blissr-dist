<template lang="pug">
  .main-questions
    .question(v-for='question in content.questions' v-show='showIndex(question.index)')
      .title(v-html='question.title')
      .question-img(v-if='question.image !== ""')
        img(v-lazy='formatImg(question.image)', style='width:300px;')
      //- .selections-type1(v-show='question.index === 1')
        .selection-type1(v-for='(selection,index) in question.selections' :key='index' @click='selectItem(question, selection.index)' :class='{selected: question.selected === selection.index}')
          img(v-lazy='selection.image')
          .option {{ selection.option }}
      .selections-type2
        .selection-type2(v-for='(selection,index) in question.selections' :key='index' @click='selectItem(question, selection.index)' :class='{selected: question.selected === selection.index}')
          .option {{selection.index}}  {{ selection.option }}
          img(v-if='selection.image !== ""',v-lazy='formatImg(selection.image)', style='width:100px;height:100px;margin-left: 10px')
      .button
        mt-button(v-show='currentIndex > 1' type='default' size='normal' style='margin-right:20px' @click.native='previousQuestion')
          .btn-text 上一题
        mt-button(v-show='currentIndex < countQuestions && currentIndex > 1' type='primary' size='normal' @click.native='nextQuestion' :disabled='!isSelect')
          .btn-text 下一题
        mt-button(v-show='currentIndex === 1' type='primary' size='large' @click.native='nextQuestion' :disabled='!isSelect')
          .btn-text 下一题
        mt-button(v-show='currentIndex === countQuestions' type='primary' size='normal' @click.native='submitQuiz' :disabled='!isSelect')
          .btn-text 查看结果
</template>
<script>
import content from '~/static/assets/quiz/testType.json'
// import axios from 'axios'
import {pick} from 'ramda'
import { Button, Lazyload } from 'mint-ui'
export default {
  data() {
    return {
      currentIndex: 1,
      content: {},
      finalAnswer: {},
      type: 1,
      isSelect: false
    }
  },
  components: {
    Button,
    Lazyload
  },
  beforeMount: function () {
    this.content = content
  },
  computed: {
    countQuestions() {
      return content.questions.length
    }
  },
  filters: {
    formatTitle: function (str) {
      console.log(str)
      return str.replace(/\n/g, '<br />')
    },
    formatImage: function (value) {
      return require('static/assets/quiz/images' + value)
    }
  },
  watch: {
    currentIndex: function (val, oldval) {
      // console.log(val)
      // console.log(oldval)
      if (this.type === 1 && val === 6) {
        this.currentIndex += 1
      } else if (this.type === 0 && val === 5) {
        this.currentIndex += 1
      }
    }
  },
  methods: {
    showIndex(selectionIndex) {
      // console.log('selectionIndex=' + selectionIndex)
      // console.log('currentIndex=' + this.currentIndex)
      // console.log(this.currentIndex === selectionIndex)
      if (this.currentIndex === selectionIndex) {
        return true
      } else {
        return false
      }
    },
    formatImg: function (value) {
      // console.log(require('static/assets/quiz/images/' + value))
      return require('static/assets/quiz/images/' + value)
    },
    nextQuestion() {
      this.isSelect = false
      this.currentIndex = this.currentIndex + 1
    },
    previousQuestion() {
      if ((this.type === 0 && this.currentIndex === 6) || (this.type === 1 && this.currentIndex === 7)) {
        this.currentIndex = this.currentIndex - 2
      }
      this.currentIndex = this.currentIndex - 1
      this.isSelect = true
    },
    selectItem(question, selection) {
      // console.log(question.selected)
      // console.log(typeof (selection))
      // console.log(typeof (parseInt(selection)))
      if (this.currentIndex === 1) {
        // console.log(selection)
        if (selection === '1') {
          this.type = 1
        } else {
          this.type = 0
        }
      }
      question.selected = selection
      this.isSelect = true
      // console.log(item)
      // console.log(event.currentTarget.addClass('selected'))
      // console.log(Vue.set(item,event.currentTarget),'selected',true)
      // $(window.event.target).toggleClass("selected")
    },
    async submitQuiz() {
      // console.log(this.content.questions)
      // let {uid, inputName} = this.$route.query
      // console.log({uid, inputName})
      let q = 'q'
      let a = {}
      let result = 'b'
      for (let index in this.content.questions) {
        q = 'q'
        a = {}
        a = pick(['index', 'selected'], this.content.questions[index])
        q += a.index
        this.finalAnswer[q] = a.selected
      }
      // console.log(this.finalAnswer)
      // console.log({
      //   uid: uid,
      //   inputName: inputName,
      //   finalAnswer: this.finalAnswer
      // })
      // if (this.type === 0) {
      // result = 'g'
      // result = parseInt(Math.random() * 12 + 1)
      // console.log(content.answers.girls[result])
      // } else {
      // console.log(content.answers.boys[result])
      // }
      result = parseInt(Math.random() * 12 + 1)
      // console.log(result)
      this.$router.push({
        path: '/quiz/test_type/answer',
        query: {
          type: this.type,
          result: result
        }
      })
      // await this.$store.dispatch('setAnswer', {
      //   result: result
      // })
      // axios.get('http://localhost:3000/v1/quiz/test-type/answer')
      // this.$router.push({
      //   path: '/quiz/test_type/answer',
      //   query: {
      //     result: result
      //   }
      // })
    }
  }
}
</script>
<style scoped>
.main-questions {
  height: 100%;
  width: 100%;
  padding: 10%;
}
.question {
  height: 100%;
  width: 100%;
}
.title {
  margin-top: 10%;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
}
.selections-type1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10% 0;
  text-align: center;
}
.selection-type1 {
  width: 50%;
}
.selections-type2 {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.selections-type2 .option{
  display: inline-block;
  line-height: 20px;
  vertical-align: text-bottom;
  margin-left: 10px;
}

.selection-type2 {
  width: 100%;
  margin-top: 10%;
}

.button {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 280px;
  bottom: 20px;
  left: 50%;
  margin-left: -140px;
}
.btn-text {
  margin: 10px 20px;
}
.selected {
  background-color: aqua;
}
.question-img{
  text-align: center;
  margin-top: 20px;
}
</style>

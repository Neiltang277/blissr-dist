<template lang="pug">
  .main-questions
    .question(v-for='question in content.questions' v-show='showIndex(question.index)')
      .progress(:class='type ? "text-girl" : "text-boy"') Question {{ indicator }} of {{countQuestions-1}}
      .blackboard(:class="type === 1 ? 'bg-boy' : 'bg-girl' ")
        .title(v-html='question.title')
        .question-img(v-if='question.image !== ""')
          img(v-lazy='formatImg(question.image)', style='width:100%;')
        //- .selections-type1(v-show='question.index === 1')
          .selection-type1(v-for='(selection,index) in question.selections' :key='index' @click='selectItem(question, selection.index)' :class='{selected: question.selected === selection.index}')
            img(v-lazy='selection.image')
            .option {{ selection.option }}
      .selections-type2
        .selection-type2(v-for='(selection,index) in question.selections' :key='index' @click='selectItem(question, selection.index)' :class=' isSelected(question.selected === selection.index)')
          .option {{ selection.option }}
            img(v-if='selection.image !== ""',v-lazy='formatImg(selection.image)', style='width:100px;height:100px;margin-left: 10px;vertical-align: bottom; margin: 10px 0;')
      .bottom-blank
      .button
        mt-button.button-clear(v-show='currentIndex > 1' type='primary' size='normal' style='margin-right:20px' @click.native='previousQuestion')
          .btn-text-left
            img.icon-arrow(:src='leftArrow')
            | 上一题
        mt-button.button-clear(v-show='currentIndex < countQuestions && currentIndex > 1' type='primary' size='normal' @click.native='nextQuestion' :disabled='!isSelect')
          .btn-text-right(:class='type ? "text-boy" : "text-girl"')
            | 下一题
            img.icon-arrow(:src='type ? rightBoy : rightGirl')
        mt-button.button-clear-full(v-show='currentIndex === 1' type='primary' size='large' @click.native='nextQuestion' :disabled='!isSelect')
          .btn-text-right(:class='type ? "text-boy" : "text-girl"')
            | 下一题
            img.icon-arrow(:src='type ? rightBoy : rightGirl')
        mt-button.button-clear(v-show='currentIndex === countQuestions' type='primary' size='normal' @click.native='submitQuiz' :disabled='!isSelect')
          .btn-text-right(:class='type ? "text-boy" : "text-girl"') 查看结果
</template>
<script>
import content from '~/static/assets/quiz/testType.json'
// import axios from 'axios'
import {pick} from 'ramda'
import { Button, Lazyload } from 'mint-ui'
export default {
  data() {
    return {
      indicator: 1,
      currentIndex: 1,
      content: {},
      finalAnswer: {},
      type: 1,
      isSelect: false,
      inputName: ''
    }
  },
  components: {
    Button,
    Lazyload
  },
  beforeMount: function () {
    this.content = content
    this.leftArrow = require('static/assets/icon/left.png')
    this.rightGirl = require('static/assets/icon/right-girl.png')
    this.rightBoy = require('static/assets/icon/right-boy.png')
    this.inputName = this.$route.query.inputName
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
      console.log(val)
      console.log(oldval)
    }
  },
  methods: {
    isSelected(value) {
      // let that = this
      // console.log(this.type)
      // console.log('isSelecte=' + value)
      if (value && this.type === 1) {
        return 'select-boy'
      } else if (value && this.type === 0) {
        return 'select-girl'
      }
      // selected: question.selected === selection.index
      // return 'selected'
    },
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
      if (this.type === 1 && this.currentIndex === 6) {
        this.currentIndex = 7
      } else if (this.type === 0 && this.currentIndex === 5) {
        this.currentIndex = 6
      }
      this.indicator += 1
    },
    previousQuestion() {
      if (this.type === 0 && this.currentIndex === 6) {
        this.currentIndex = 5
      } else if (this.type === 1 && this.currentIndex === 7) {
        this.currentIndex = 6
      }
      this.currentIndex = this.currentIndex - 1
      this.indicator = this.indicator - 1
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
          inputName: this.inputName,
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
  padding: 5%;
}
.progress {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.blackboard {
  padding: 10%;
  color: white;
  margin-top: 5%;
  border-radius: 6px;
}
.bg-boy {
  background: -webkit-linear-gradient(#FD97A3,#88DFFF); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#FD97A3,#88DFFF); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#FD97A3,#88DFFF); /* Firefox 3.6 - 15 */
  background: linear-gradient(#FD97A3,#88DFFF); /* 标准的语法 */
}
.bg-girl {
  background: -webkit-linear-gradient(#88DFFF,#FD97A3); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#88DFFF,#FD97A3); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#88DFFF,#FD97A3); /* Firefox 3.6 - 15 */
  background: linear-gradient(#88DFFF,#FD97A3); /* 标准的语法 */
}
.select-boy {
  color: white;
  border: 0px;
  border-radius: 6px;
  background-color: #88DFFF;
}

.select-girl {
  color: white;
  border: 0px;
  border-radius: 6px;
  background-color: #FD97A3;
}

.selected {
  background-color: #EF9F58;
  border-radius: 6px;
  color: white;
}


.question {
  height: 100%;
  width: 100%;
}
.title {
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
  line-height: 50px;
  vertical-align: text-bottom;
  height: 100%;
  border: #bfbfbf 1px solid;
  width: 100%;
  border-radius: 6px;
  text-align: center;

}

.selection-type2 {
  width: 100%;
  margin-top: 5%;
  text-align: center;
}

.button {
  position: fixed;
  display: flex;
  background-color: white;
  flex-direction: row;
  width: 100%;
  bottom: 0px;
  height: 50px;
  left: 50%;
  margin-left: -50%;
  border-top: solid 1px solid #bfbfbf;
}
.button-clear {
  background: white;
  width: 49%;
  padding: 0;
}
.button-clear-full {
  background: white;
  padding: 0;
}
.btn-text-right {
  margin: 10px 20px;
  font-weight: bold;
}
.text-girl {
  color: #FD97A3;
}
.text-boy {
  color: #88DFFF;
}

.btn-text-left {
  margin: 10px 20px;
  color: #bfbfbf;
  font-weight: bold;
}

.icon-arrow {
  width: 21px;
  display: inline-block;
  margin: 0 10px;
  vertical-align: bottom;
}
.question-img{
  text-align: center;
  margin-top: 20px;
}
.bottom-blank {
  height: 60px;
  display: block;
}
</style>

import axios from 'axios'
import AV from 'leancloud-storage'
import content from '~/static/assets/quiz/testType.json'
// const opts = require('./../server/config')
// import {Answer} from '~/server/database/leanstorage/answer.js'

const baseUrl = ''

class Services {
  /**
   * 查询众筹详情
   * @return {Promise}
   */
  setQuizAnswer(uid, inputName, type, finalAnswer) {
    AV.init({
      appId: 'UefuCY50vFnjIgf345m2jIlp-gzGzoHsz',
      appKey: 'FSimC0hWAmBONRBrPG5yaTwE'
    })
    var Answer = AV.Object.extend('Answer')
    var answer = new Answer()
    answer.set('uid', uid)
    answer.set('inputName', inputName)
    answer.set('type', type)
    answer.set('finalAnswer', finalAnswer)
    return answer.save()
    // let answer = new Answer()
    // answer.uid = uid
    // answer.inputName = inputName
    // answer.type = type
    // answer.finalAnswer = finalAnswer
    // const acl = new AV.ACL()
    // // 只有创建订单的用户可以读，没有人可以写
    // acl.setPublicReadAccess(false)
    // acl.setPublicWriteAccess(false)
    // acl.setReadAccess(user, true)
    // acl.setWriteAccess(user, false)
    // answer.setACL(acl)
    // return answer.save()
  }

  setQuizTest(uid, inputName, finalAnswer) {
    console.log({
      uid: uid,
      inputName: inputName,
      finalAnswer: finalAnswer
    })
    return content.answers.boys.b1
  }

  getWechatOAuth(url) {
    return axios.get(`${baseUrl}/wechat/oauth?url=${encodeURIComponent(url)}`)
  }
}

export default new Services()

const testType = require('../../../static/assets/quiz/testType.json')

export const index = async () => {
  let title = testType.title
  let summary = testType.summary
  let images = testType.images
  return {
    title: title,
    summary: summary,
    images: images
  }
}

export const questions = async () => {
  let questions = testType.questions
  return questions
}

export const feedback = async (selection) => {
  let baseUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='
  let id = ctx.params.id
  

  return 'http://www.baidu.com'
}

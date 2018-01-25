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

export const answer = async () => {

}

import Router from 'koa-router'
// const cors = require('koa2-cors')

const wechatRouter = require('../routes/wechat')
const topicRouter = require('../routes/topic')
const commentRouter = require('../routes/comment')
const apiRouter = require('../routes/api')
const quizRouter = require('../routes/quiz')

export const router = app => {
  const router = new Router()
  // router.get('', async (ctx, next) => {
  //   // ctx.body = {
  //   //   success: 'done'
  //   // }
  //   ctx.render('/pages/index')
  // })

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())
  router.use('/wechat', wechatRouter.routes(), wechatRouter.allowedMethods())
  router.use('/v1/topics', topicRouter.routes(), topicRouter.allowedMethods())
  router.use('/v1/comments', commentRouter.routes(), commentRouter.allowedMethods())
  router.use('/v1/quiz', quizRouter.routes(), quizRouter.allowedMethods())
  // app.use(cors())

  app.use(router.routes())
  app.use(router.allowedMethods())
}

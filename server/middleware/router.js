import Router from 'koa-router'
// const cors = require('koa2-cors')

const wechatRouter = require('../routes/wechat')
const topicRouter = require('../routes/topic')
const commentRouter = require('../routes/comment')

export const router = app => {
  const router = new Router()
  router.get('', async (ctx, next) => {
    ctx.body = {
      success: 'done'
    }
  })

  router.use('/wechat', wechatRouter.routes(), wechatRouter.allowedMethods())
  router.use('/v1/topics', topicRouter.routes(), topicRouter.allowedMethods())
  router.use('/v1/comments', commentRouter.routes(), commentRouter.allowedMethods())
  // app.use(cors())
  app.use(router.routes())
  app.use(router.allowedMethods())
}

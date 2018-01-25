import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat/lib/middleware'
import * as wechat from '../controllers/wechat'

const router = new Router()
console.log('router')

router.all('/hear', async (ctx, next) => {
  const middle = wechatMiddle(config.wechat, reply)
  await middle(ctx, next)
})

router.get('/redirect', async (ctx, next) => {
  await wechat.redirect(ctx, next)
})
router.get('/oauth', async (ctx, next) => {
  await wechat.oauth(ctx, next)
})

module.exports = router

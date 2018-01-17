import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat/lib/middleware'

const router = new Router()
console.log('router')

router.all('/hear', async (ctx, next) => {
  const middle = wechatMiddle(config.wechat, reply)
  await middle(ctx, next)
})

module.exports = router

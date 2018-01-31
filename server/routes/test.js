import Router from 'koa-router'
const router = new Router()

router.get('/login', async (ctx, next) => {
  ctx.body = 'testlogin'
})

module.exports = router

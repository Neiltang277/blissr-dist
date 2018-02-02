import Router from 'koa-router'

const testType = require('./testType')
// const testType = require('../../static/assets/quiz/testType.json')

const router = new Router({
  prefix: '/test-type'
})

router.get('/index', async (ctx, next) => { ctx.body = await testType.index() })
router.get('/questions', async (ctx, next) => { ctx.body = await testType.quesitons() })
router.get('/answer', async (ctx, next) => { ctx.body = await testType.answer({ b1: 1, b2: 2, g3: 3 }) })
router.get('/share', async (ctx, next) => { ctx.body = await testType.answer() })

module.exports = router

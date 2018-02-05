import Router from 'koa-router'

const testType = require('./testType')
// const testType = require('../../static/assets/quiz/testType.json')

const router = new Router()
// const router = new Router({
//   prefix: '/'
// })

router.get('/index', async (ctx, next) => { ctx.body = await testType.index() })
router.get('/readmore', async (ctx, next) => { 
  let selection = ctx.query.selection
  let fe = await testType.feedback(selection) 
  console.log(fe)
  ctx.redirect(fe)
})
// router.get('/answer', async (ctx, next) => { ctx.body = await testType.answer({ b1: 1, b2: 2, g3: 3 }) })
// router.get('/share', async (ctx, next) => { ctx.body = await testType.answer() })

module.exports = router

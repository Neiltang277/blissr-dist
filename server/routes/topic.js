import Router from 'koa-router'
import Topic from '../database/leanstorage/topic'
import AV from 'leancloud-storage'

const router = new Router()

/**
 * @method GET
 * @param page
 * @param per_page
 */
router.get('/', async (ctx, next) => {
  let query = new AV.Query('Topic')
  ctx.body = await query.find()
})

router.post('/', async (ctx, next) => {
  let content = ctx.request.body
  new Topic({
    title: content.title,
    subject: content.subject,
    summary: content.summary,
    detail: content.detail,
    members: content.memebers,
    advocator: content.advocator,
    comments: content.comments
  }).save().then((topic) => {
    console.log(topic)
    ctx.body = topic
  }).catch((error) => console.log(error))
})

router.get('/detail/:id', async (ctx, next) => {
})

router.put('/comment/:id', async (ctx, next) => {
})

router.delete('/detail/:id', async (ctx, next) => {
})

module.exports = router

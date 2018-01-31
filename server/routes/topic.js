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
  let Topic = AV.Object.extend('Topic')
  let topic = new Topic()
  topic.set('title', content.title)
  topic.set('subject', content.subject)
  topic.set('summary', content.summary)
  topic.set('detail', content.detail)
  topic.set('advocator', content.advocator)

  let acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(AV.User.current(), true)

  topic.setACL(acl)
  await topic.save()

  ctx.body = topic
})

router.get('/detail/:id', async (ctx, next) => {
  console.log(AV.User.current())
  ctx.body = 'abs'
})

router.put('/comment/:id', async (ctx, next) => {
})

router.delete('/detail/:id', async (ctx, next) => {
})

module.exports = router

import Router from 'koa-router'
const dbHelper = require('../helpers/dbHelper')
const mongoose = require('mongoose')

const router = new Router()

/**
 * @method GET
 * @param page
 * @param per_page
 */
router.get('/', async (ctx, next) => {
  let Comment = mongoose.model('Comment')
  let topicId = ctx.query.topic || ''
  let page = ctx.query.page || 1
  let perPage = ctx.query.per_page || 10
  let data = await dbHelper.pageQuery(page, perPage, Comment, 'User', {topic: topicId}, {})
  ctx.body = data
})

router.post('/', async (ctx, next) => {
  let Comment = mongoose.model('Comment')
  let topicId = ctx.query.topic
  let req = ctx.request.body
  req.topic = topicId
  if (req) {
    new Comment(req).save()
  }
  ctx.status = 201
})

router.get('/:id', async (ctx, next) => {
  let Comment = mongoose.model('Comment')
  let id = ctx.params.id
  let res = await Comment.findOne({
    _id: id
  }).exec()

  if (res) {
    ctx.body = res
  } else {
    ctx.body = {}
  }
})

router.put('/:id', async (ctx, next) => {
  let Comment = mongoose.model('Comment')
  let req = ctx.request.body
  let id = ctx.params.id
  let res = await Comment.update({
    _id: id
  }, req).exec()

  if (res) {
    ctx.status = 201
    ctx.body = res
  } else {
    ctx.body = 200
  }
})

router.delete('/:id', async (ctx, next) => {
  let Comment = mongoose.model('Comment')
  let id = ctx.params.id
  let res = await Comment.remove({
    _id: id
  }).exec()

  if (res) {
    ctx.status = 204
  } else {
    ctx.status = 200
  }
})

module.exports = router

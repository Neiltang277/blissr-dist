import Router from 'koa-router'

const router = new Router()
const qiniu = require('qiniu')
const AV = require('leancloud-storage')

router.get('/qiniu/uptoken', async (ctx, next) => {
  var accessKey = 'PYBewiu6AMCh8diFWkrgUqhT9u2UmZroQvdrlN9n'
  var secretKey = 'e3A9VVEt4KP8XJfkTKwXuvmOzdpk36yOK-O5m-cE'
  var bucket = 'blissr-test'
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  var options = {
    scope: bucket
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  ctx.body = {uptoken: uploadToken}
})

router.get('/lean/test', async (ctx, next) => {
  console.log('test')
  const TestObject = AV.Object.extend('TestObject')
  const testObject = new TestObject()
  await testObject.save({ words: 'Hello World!' })
  ctx.body = 'LeanCloud Rocks!'
})

router.post('/lean/register', async (ctx, nest) => {
  // ctx.body = ctx.request.body
  let user = new AV.User()
  user.setUsername(ctx.request.body.username)
  user.setPassword(ctx.request.body.password)
  let loginedUser = await user.signUp()
  ctx.body = loginedUser
})

router.post('/lean/login', async (ctx, nest) => {
  let loginedUser = await AV.User.logIn(ctx.request.body.username, ctx.request.body.password)
  console.log(loginedUser.getSessionToken())
  ctx.body = {
    username: loginedUser.getUsername()
  }
})

router.post('/lean/st', async (ctx, nest) => {
  let currentUser = AV.User.current()
  console.log(currentUser)
  if (currentUser !== null) {
    currentUser.isAuthenticated().then(function (authenticated) {
      console.log(authenticated)
    })
  }
  ctx.body = 'test'
})

// router.get('/readjson', async (ctx, next) => {
// ctx.body = testType.questions
// })

module.exports = router

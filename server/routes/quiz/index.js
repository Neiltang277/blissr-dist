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
router.get('/test', async (ctx, next) => {
  let baseUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='
  let qrcodeTicket = ctx.query.ticket
  if (qrcodeTicket) {
    ctx.body = baseUrl + encodeURIComponent(qrcodeTicket)
  } else {
    let mp = require('../../wechat')
    let client = mp.getWechat()
    let opts = {
      expire_seconds: 180,
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: 'testtype'
        }
      }
    }
    console.log(opts)
    let qrcodeimg = await client.handle('createQrcode', opts)
    console.log({
      qrcode_ticket: qrcodeimg.ticket,
      qrcode_url: qrcodeimg.url,
      expire_seconds: qrcodeimg.expire_seconds
    })
    ctx.body = baseUrl + encodeURIComponent(qrcodeimg.ticket)
  }
})
// router.get('/share', async (ctx, next) => { ctx.body = await testType.answer() })

module.exports = router

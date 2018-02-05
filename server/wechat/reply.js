export default async (ctx, next) => {
  const message = ctx.weixin
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      let openid = message.FromUserName
      ctx.body = openid
    } else if (message.Event === 'SCAN') {
      console.log(message)
      if (message.EventKey === 'testtype') {
        // let mp = require('../wechat')
        // let client = mp.getWechat()
        // await client.handle('getUserInfo', message.FromUserName)
        // console.log(userinfo)
        ctx.body = 'test'
      } else {
        ctx.body = 'lalalal'
      }
    }
  } else if (message.MsgType === 'text') {
    console.log(message)
    if (message.EventKey === 'testtype') {
      // let mp = require('../wechat')
      // let client = mp.getWechat()
      // await client.handle('getUserInfo', message.FromUserName)
      // console.log(userinfo)
      ctx.body = 'test'
    } else {
      ctx.body = 'lalalal'
    }
  } else if (message.MsgType === 'image') {} else if (message.MsgType === 'voice') {} else if (message.MsgType === 'video') {} else if (message.MsgType === 'location') {} else if (message.MsgType === 'link') {}
}

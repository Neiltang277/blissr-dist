export default async (ctx, next) => {
  const message = ctx.weixin
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      let openid = message.FromUserName
      ctx.body = openid
    }
  } else if (message.MsgType === 'text') {} else if (message.MsgType === 'image') {} else if (message.MsgType === 'voice') {} else if (message.MsgType === 'video') {} else if (message.MsgType === 'location') {} else if (message.MsgType === 'link') {}
}

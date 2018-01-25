import config from '../config'
import Wechat from '../wechat/lib'
import WechatOAuth from '../wechat/lib/oauth'
import AV from 'leancloud-storage'

const wechatConfig = {
  wechat: {
    appID: config.wechat.appID,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    getAccessToken: async () => {
      let token = new AV.Query('Token')
      await token.find()
      // await Token.getAccessToken()
    },
    saveAccessToken: async (data) => {
      let token = new AV.Token()
      token.set('access_token', data.access_token)
      token.set('expires_in', data.expires_in)
      await token.save()
      // await Token.saveAccessToken(data)
    },
    getTicket: async () => {
      let ticket = new AV.Query('Ticket')
      await ticket.find()
      // await Ticket.getTicket()
    },
    saveTicket: async (data) => {
      let ticket = new AV.Ticket()
      ticket.set('name', data.name)
      ticket.set('ticket', data.ticket)
      ticket.set('expires_in', data.expires_in)
      await ticket.save()
      // await Ticket.saveTicket(data)
    }
  }
}

export const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat)
  return wechatClient
}

export const getOAuth = () => {
  const oauth = new WechatOAuth(wechatConfig.wechat)
  return oauth
}

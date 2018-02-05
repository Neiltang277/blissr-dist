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
      try {
        token.equalTo('name', 'access_token')
        let saveToken = await token.first()
        return {
          name: saveToken.get('name'),
          access_token: saveToken.get('access_token'),
          expires_in: saveToken.get('expires_in')
        }
      } catch (err) {
        console.log(err)
        return ''
      }
      // await Token.getAccessToken()
    },
    saveAccessToken: async (data) => {
      try {
        let token = new AV.Query('Token')
        token.equalTo('name', 'access_token')
        let rawToken = await token.first()
        if (rawToken) {
          rawToken.set('access_token', data.access_token)
          rawToken.set('expires_in', data.expires_in)
          let saveToken = await rawToken.save()
          return {
            name: saveToken.get('name'),
            access_token: saveToken.get('access_token'),
            expires_in: saveToken.get('expires_in')
          }
        } else {
          let Token = AV.Object.extend('Token')
          let token = new Token()
          token.set('name', 'access_token')
          token.set('access_token', data.access_token)
          token.set('expires_in', data.expires_in)
          // return await token.save()
          let saveToken = await token.save()
          return {
            name: saveToken.get('name'),
            access_token: saveToken.get('access_token'),
            expires_in: saveToken.get('expires_in')
          }
        }
      } catch (err) {
        console.log(err)
        return ''
      }
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

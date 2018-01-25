import { getOAuth } from '../wechat'

export function getAuthorizeURL(...args) {
  const oauth = getOAuth()
  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode(code) {
  const oauth = getOAuth()

  const data = await oauth.fetchAccessToken(code)
  const openid = data.openid
  const user = await oauth.getUserInfo(data.access_token, openid)

  return user
}

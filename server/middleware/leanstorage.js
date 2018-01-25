const AV = require('leanengine')

function login(username, password) {
  return new Promise((resolve, reject) => {
    AV.User.logIn('Tom', 'cat!@#123').then(function (loginedUser) {
      console.log(loginedUser)
    }, function (error) {
      console.log(error)
    })
  })
}

function register(username, password) {
  return new Promise((resolve, reject) => {
    // 新建 AVUser 对象实例
    let user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    user.signUp().then(function (loginedUser) {
      console.log(loginedUser)
    }, function (error) {
      console.log(error)
    })
  })
}

function signUpOrlogInWithAuthData(openid, accessToken, expiresAt) {
  AV.User.signUpOrlogInWithAuthData({
    openid: openid,
    access_token: accessToken,
    expires_at: expiresAt
  }, 'weixin').then(function (s) {
  }, function (e) {
    console.log(e)
  })
}

export {
  login,
  register,
  signUpOrlogInWithAuthData
}

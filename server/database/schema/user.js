const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  // ----WECHAT----
  nickname: String,
  // 0: unknow
  // 1: man
  // 2: woman
  sex: {
    type: Number,
    default: 0
  },
  language: String,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  openid: String,
  unionid: String,
  subscribe: Number,
  subscribe_time: Date,
  remark: String,
  // ----SELF----
  // 0: freeze
  // 1: normal
  status: {
    type: Number,
    default: 1
  },
  realname: String,
  email: String,
  phone: String,
  // 0: register
  // 1: wechat
  source: {
    type: Number,
    default: 1
  },
  password: String,
  // 0: robot~~
  // 1: nomal user
  // 2: verified user
  // 3: professonal user
  // 10: admin
  // 100: super admin
  role: {
    type: Number,
    default: 1
  },
  meta: {
    create_at: {
      type: Date,
      default: Date.now()
    },
    update_at: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {

  if (this.isNew) {
    this.meta.create_at = this.meta.update_at = Date.now()
  } else {
    this.meta.update_at = Date.now()
  }
  next()
})

UserSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }

}

mongoose.model('User', UserSchema)

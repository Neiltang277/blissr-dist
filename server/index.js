import Koa from 'koa'
import {
  Nuxt,
  Builder
} from 'nuxt'
import R from 'ramda'
import {
  resolve
} from 'path'

// import { router } from './middleware/router'
// import { database } from './middleware/database'

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
// const MIDDLEWARE = ['general', 'router']
const MIDDLEWARE = ['database', 'general', 'router']

const useMiddleware = (app) => {
  // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
  // R.map(console.log)([1, 2, 3])
  // MIDDLEWARE 数组交给了 R.map
  // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。
  return R.map(R.compose(
    R.map(i => i(app)),
    require,
    i => `${r('./middleware')}/${i}`))
}

async function start() {
  const app = new Koa()

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // await database(app)
  // await router(app)

  // Build in development
  if (config.dev) {
    // const builder = new Builder(nuxt)
    await new Builder(nuxt).build()
  }

  await useMiddleware(app)(MIDDLEWARE)

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()

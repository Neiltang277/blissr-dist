import koaBody from 'koa-bodyparser'
import session from 'koa-session'
import cors from 'koa2-cors'

export const addBody = app => {
  app.use(koaBody())
  app.use(cors())
}

export const addSession = app => {
  app.keys = ['got']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false
  }

  app.use(session(CONFIG, app))
}

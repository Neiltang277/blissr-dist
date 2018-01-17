import mongoose from 'mongoose'
import {
  resolve
} from 'path'

import config from '../config'
import fs from 'fs'
const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/[^]*\.js/))
  .forEach(file => require(resolve(models, file)))

export const database = app => {
  mongoose.set('debug', true)
  console.log(models)

  mongoose.connect(config.db, {
    useMongoClient: true,
    user: config.user,
    pass: config.pass
  })
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db, {
      useMongoClient: true,
      user: config.user,
      pass: config.pass
    })
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', config.db)
  })
}

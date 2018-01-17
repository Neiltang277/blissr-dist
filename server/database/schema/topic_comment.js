const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = mongoose.Schema({
  topic: {
    type: ObjectId,
    ref: 'Topic'
  },
  from: {
    type: ObjectId,
    ref: 'User'
  },
  reply: [{
    from: {
      type: ObjectId,
      ref: 'User'
    },
    to: {
      type: ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    }
  }],
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }

})

CommentSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.update_at = Date.now()
  }
  next()
})

mongoose.model('Comment', CommentSchema)

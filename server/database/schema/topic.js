const mongoose = require('mongoose')

const TopicSchema = mongoose.Schema({
  title: {type: String},
  group: {type: String},
  summary: {type: String},
  advcator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  detail: {type: String},
  user_profiles: {type: Array},
  create_at: {type: Date, default: Date.now()},
  update_at: {type: Date, default: Date.now()}

})

TopicSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.update_at = Date.now()
  }
  next()
})

mongoose.model('Topic', TopicSchema)

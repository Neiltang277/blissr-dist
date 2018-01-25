const AV = require('leancloud-storage')

class Topic extends AV.Object {
  get title() { return this.get('title') }
  set title(value) { this.set('title', value) }

  get subject() { return this.get('') }
  set subject(value) { this.set('', value) }

  get summary() { return this.get('') }
  set summary(value) { this.set('', value) }

  get detail() { return this.get('') }
  set detail(value) { this.set('', value) }

  get members() { return this.get('') }
  set members(value) { this.set('', value) }

  get advocator() { return this.get('') }
  set advocator(value) { this.set('', value) }

  get comments() { return this.get('') }
  set comments(value) { this.set('', value) }
}

AV.Object.register(Topic, 'Topic')

module.exports = Topic

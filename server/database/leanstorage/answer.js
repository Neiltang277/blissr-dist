const AV = require('leancloud-storage')

class Answer extends AV.Object {
  get user() { return this.get('title') }
  set user(value) { this.set('title', value) }

  get options() { return this.get('title') }
  set options(value) { this.set('title', value) }

  get answer() { return this.get('title') }
  set answer(value) { this.set('title', value) }
}

AV.Object.register(Answer, 'Answer')

export { Answer }

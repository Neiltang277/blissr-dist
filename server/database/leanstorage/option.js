const AV = require('leancloud-storage')

class Option extends AV.Object {
  get from() { return this.get('title') }
  set from(value) { this.set('title', value) }

  get content() { return this.get('') }
  set content(value) { this.set('', value) }

  get images() { return this.get('') }
  set images(value) { this.set('', value) }

  get reply() { return this.get('') }
  set reply(value) { this.set('', value) }

  get createAt() { return this.get('') }
  set createAt(value) { this.set('', value) }
}

AV.Object.register(Option, 'Option')

module.exports = Option

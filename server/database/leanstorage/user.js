
const AV = require('leanengine')

class User extends AV.Object {
  get tradeId() { return this.get('tradeId') }
  set tradeId(value) { this.set('tradeId', value) }

  get amount() { return this.get('amount') }
  set amount(value) { this.set('amount', value) }
}

AV.Object.register(User)

module.exports = User

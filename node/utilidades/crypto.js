var crypto = require('crypto')

function cryptoPass (pass) {
  var shasum = crypto.createHash('sha256')
  shasum.update(pass)
  return shasum.digest('hex')
}

module.exports = cryptoPass

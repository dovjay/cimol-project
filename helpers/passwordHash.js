const crypto = require('crypto')

module.exports = (password, secret = crypto.randomBytes(256)) => {
    let hash = crypto.createHmac('sha256', secret)
           .update(password)
           .digest('hex')
    let result = {password: hash, salt: secret}
    return result
}
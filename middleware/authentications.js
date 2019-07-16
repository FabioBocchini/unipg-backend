const jwt = require('jwt-simple')
const secret = 'password'

module.exports.tokenForUser = (email) => {
	const timestamp = new Date().getTime()
	return jwt.encode({ sub: email, iat: timestamp }, secret)
}

const passport = require('passport')
require('../services/passport')

module.exports.requireProfessoreAuth = passport.authenticate('jwt-professore', { session: false })
module.exports.requireStudenteAuth = passport.authenticate('jwt-studente', { session: false })

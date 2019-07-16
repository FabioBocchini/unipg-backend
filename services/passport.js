const passport = require('passport')
const { jwtStudenteLogin, jwtProfessoreLogin } = require('./userPassport')

passport.use('jwt-studente', jwtStudenteLogin)
passport.use('jwt-professore', jwtProfessoreLogin)

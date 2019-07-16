const jwtstrategy = require('passport-jwt').Strategy
const Extractjwt = require('passport-jwt').ExtractJwt
const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Unipg',
	password: 'postgres'
})

const jwtOption = {
	jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'password'
}

const jwtStudenteLogin = new jwtstrategy(jwtOption, (payload, done) => {
	const email = payload.sub
	pool.query('SELECT email FROM studente WHERE email = $1', [ email ], (error, results) => {
		if (error) {
			return done(error, false)
		}
		const studente = results.rows[0]
		if (!studente) {
			return done(new Error('User not found'), false)
		}
		return done(null, studente)
	})
})

const jwtProfessoreLogin = new jwtstrategy(jwtOption, (payload, done) => {
	const email = payload.sub
	pool.query('SELECT email FROM professore WHERE email = $1', [ email ], (error, results) => {
		if (error) {
			return done(error, false)
		}
		const professore = results.rows[0]
		if (!professore) {
			return done(new Error('User not found'), false)
		}
		return done(null, professore)
	})
})

module.exports = {
	jwtStudenteLogin,
	jwtProfessoreLogin
}

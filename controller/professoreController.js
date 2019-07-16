const { tokenForUser } = require('../middleware/authentications')
const bcrypt = require('bcrypt-nodejs')
const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Unipg',
	password: 'postgres'
})

//usato per login professore
const postProfLogin = (request, response) => {
	const { email, password } = request.body

	pool.query('SELECT id, nome, cognome, password FROM professore WHERE email = $1', [ email ], (error, results) => {
		if (error) {
			throw error
		}
		if (results.rows.length > 0) {
			const user = results.rows[0]
			bcrypt.compare(password, user.password, (err, ismatch) => {
				if (err) {
					return response.sendStatus(401)
				} else {
					delete user.password
					return response.status(200).json({ user, token: tokenForUser(email) })
				}
			})
		} else {
			response.sendStatus(401)
		}
	})
}
module.exports = {
	postProfLogin
}

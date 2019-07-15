const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Unipg',
	password: 'postgres'
})

// usato per accettare un esame
const accettaEsame = (request, response) => {
	const { matricola, corso } = request.body
	pool.query(
		"UPDATE esame SET statoesame = 'Accettato' WHERE matricola = $1 and id_corso = $2",
		[ matricola, corso ],
		(error) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User modified: ${matricola}`)
		}
	)
}

//usato per rifiutare e quindi eliminare un esame
const rifiutaEsame = (request, response) => {
	const { matricola, corso } = request.params
	pool.query('DELETE FROM esame WHERE matricola = $1 AND id_corso = $2', [ matricola, corso ], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`Esame deleted: ${matricola}, ${corso}`)
	})
}

// usato per ricevere la lista degli esami di un certo studente
const getStudEsami = (request, response) => {
	const matricola = request.params.matricola
	pool.query(
		'SELECT corso.id_corso, corso.nome as esame, professore.nome,professore.cognome, esame.dataesame, esame.voto, esame.statoesame FROM esame JOIN corso ON esame.id_corso = corso.id_corso JOIN professore on corso.professore = professore.id AND esame.matricola = $1',
		[ matricola ],
		(error, results) => {
			if (error) {
				throw error
			}
			if (results.rows.length > 0) {
				return response.status(200).json(results.rows)
			} else {
				return {}
			}
		}
	)
}

// put di un nuovo voto da parte di un professore
const inserisciVoto = (request, response) => {
	const { corso, matricola, voto, giorno } = request.body
	pool.query(
		"INSERT INTO esame VALUES ( $1 , $2 , $3 , $4 ,'Waiting')",
		[ corso, matricola, voto, giorno ],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(201).send(`Esame inserito: ${matricola}, ${corso}`)
		}
	)
}

module.exports = {
	accettaEsame,
	getStudEsami,
	rifiutaEsame,
	inserisciVoto
}

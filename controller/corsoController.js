const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Unipg',
	password: 'postgres'
});

const getCorso = (request, response) => {
	pool.query('SELECT * FROM corso', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

//utilizzato per ricevere i corsi di un certo prof
const getCorsoFromProf = (request, response) => {
	const professore = request.params.professore;

	pool.query('SELECT id_corso, nome FROM corso WHERE professore = $1', [ professore ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

module.exports = {
	getCorso,
	getCorsoFromProf
};

const express = require('express')
const bodyParser = require('body-parser')
const professore = require('./controller/professoreController')
const studente = require('./controller/studenteController')
const corso = require('./controller/corsoController')
const esame = require('./controller/esameController')
const { requireProfessoreAuth, requireStudenteAuth } = require('./middleware/authMiddlewares')
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(cors())
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})

app.post('/professori/login', professore.postProfLogin)

app.get('/studenti', requireProfessoreAuth, studente.getStudente)
app.post('/studenti/email', studente.checkEmail)
app.post('/studenti/login', studente.postStudLogin)
app.post('/studenti/nuovo', studente.postNuovoStudente)

app.get('/corsi/:professore', requireProfessoreAuth, corso.getCorsoFromProf)

app.get('/studenti/esami/:matricola', requireStudenteAuth, esame.getStudEsami)
app.post('/esami/nuovo', requireProfessoreAuth, esame.inserisciVoto)
app.put('/studenti/esami/', requireStudenteAuth, esame.accettaEsame)
app.delete('/studenti/esami/:corso/:matricola', requireStudenteAuth, esame.rifiutaEsame)

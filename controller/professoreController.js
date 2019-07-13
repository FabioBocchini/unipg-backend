const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Unipg',
  password: 'postgres',
})

const getProfessore = (request, response) => {
  pool.query('SELECT * FROM professore', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProfByEmail = (request, response) => { 
  const email = (request.params.email)

  pool.query('SELECT * FROM professore WHERE email = LOWER($1)', [email], 
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
})}

const postProf = (request, response) => {
  const {id, nome, cognome, email, password} = request.body

  pool.query('INSERT INTO professore VALUES ($1, $2, $3, $4, $5)', [id, nome, cognome, email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Professore added with ID: ${result.insertId}`)
  })
}

//usato per login professore
const postProfLogin = (request, response) => { 
  const {email,password}= request.body
  pool.query('SELECT id, nome, cognome, password FROM professore WHERE email = $1', [email], 
  (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length > 0){
      const user = results.rows[0]
      if(user.password === password) {
        delete user.password
        return response.status(200).json(user)
      }
    }
    response.sendStatus(401)
  })
}

module.exports = {
  getProfessore,
  getProfByEmail,
  postProfLogin,
  postProf
}
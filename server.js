const config = require ('./config')
const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.use(express.static('public'))

require('./routes/navegacion')(app)
require('./routes/usuarios')(app)

app.listen(config.puerto, function(err){
  if(err) return console.log('Hubo un error al iniciar el servidor'), process.exit(1)
  console.log(`Servidor escuchando en el puerto ${config.puerto}`)
})

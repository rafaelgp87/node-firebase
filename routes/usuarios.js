const api = require ('./../api/usuarios')

module.exports = function(app) {

  app.post('/login', api.login)

  app.post('/registrarse', api.registrarse)

  app.post('/reenviar-password', api.reenviarPassword)
}
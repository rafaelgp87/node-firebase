const config = require ('../config')
const nodemailer = require('nodemailer')

exports.test = function (req, res) {
  console.log(req)
}

exports.login = function (req, res) {
  // console.log(req.body.referencia)
  var requerido = new Buffer(req.body.referencia).toString('utf-8')
  console.log(requerido)
}

exports.registrarse = function (req, res) {

  var ref = config.db.ref('usuarios').push()
  var username = 'Rafael Gutiérrez'
  ref.set({
    username: username
  })
}

function enviarCorreoActivacion (idUsuario, req, res) {
  console.log('****************************************')
  console.log(idUsuario)
  console.log(req.body.email)
  console.log('****************************************')

  var transporter = nodemailer.createTransport({
    host: config.email.servidorEmail,
    port: config.email.puertoEmail,
    auth: {
      user: config.email.emailAdmin,
      pass: config.email.emailPass
    }
  })

  var mailOptions = {
    to: req.body.email,
    subject: 'Bienvenido al proyecto',
    html: '<p>Hola, de click en la siguiente liga para activar su cuenta: </p>'
      +'<a href="http://localhost:'+ config.puerto +'/activar-cuenta/'+idUsuario+'">Activar cuenta ✔</a>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
      console.log(error)
      res.json({mensaje:'No se pudo enviar el email de activación'})
    }else{
      res.json({mensaje:'Registro realizado'})
    }
  })
}

exports.reenviarPassword = function (req, res) {

}
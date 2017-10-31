const config = require ('../config')
const nodemailer = require('nodemailer')

var admin = require("firebase-admin");

var serviceAccount = require("../proyecto-firebase-53cb0fbceac7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyecto-firebase-d9033.firebaseio.com"
})

exports.login = function (req, res) {
  // console.log(req.body.referencia)
  var requerido = new Buffer(req.body.referencia).toString('utf-8')
  console.log(requerido)
}

exports.registrarse = function (req, res) {

  let db = admin.database()
  let ref = db.ref('usuarios').push()

  let json = {
    email: req.body.email,
    referencia: req.body.referencia,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento
  }

  ref.set(json)

  res.json(json)
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
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

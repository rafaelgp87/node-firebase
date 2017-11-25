exports.puerto = 5000

// Configuración de la base de datos
const firebase = require('firebase')

firebase.initializeApp({
  credential: "proyecto-firebase-a2e6fde0c6c8.json",
  databaseURL: "https://proyecto-firebase-d9033.firebaseio.com"
});

exports.db = firebase.database()

// Configuración email
exports.email = {
  servidorEmail: 'smtp.gmail.com',
  puertoEmail: 465,
  emailAdmin: 'rafaelgp87@gmail.com',
  emailPass: ''
}

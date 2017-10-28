const config = require ('../config')
const nodemailer = require('nodemailer')

exports.login = function (req, res) {
  // console.log(req.body.referencia)
  var requerido = new Buffer(req.body.referencia).toString('utf-8')
  console.log(requerido)

  config.db.getConnection(function(err,connection) {
    if (err) {
      console.log('Error en la conexión a la base')
      res.json({
        'code': 100,
        'status': 'Error en la conexión a la base'
      })
      return

    } else {
      connection.query("select * from proyecto.usuarios where email = ? and referencia = ? and activo = 1;",
      [req.body.email,requerido], function(err,rows) {
        connection.release()
        if (err) {
          console.log('Error en la consulta')
          res.json({
            'code': 100,
            'status': 'Error en la consulta'
          })

        } else {
          console.log(rows)
          if(rows[0] == undefined) {
            res.json('Datos incorrectos')
          }else{
            res.json(rows[0])
          }
        }
      })
    }
  })
}

exports.registrarse = function (req, res) {

  config.db.getConnection(function(err,connection) {
    if (err) {
      console.log('Error en la conexión a la base')
      res.json({
        'code': 100,
        'status': 'Error en la conexión a la base'
      })
      return

    } else {
      connection.query("select * from proyecto.usuarios where email = ?;",[req.body.email] , function(err,rows) {
        if(err) {
          console.log('Error en la consulta')
          res.json({
            'code': 100,
            'status': 'Error en la consulta'
          })

        } else {
          if (rows.length > 0) {
            res.json({
              mensaje: 'El email seleccionado ya esta registrado'
            })

          } else {
            connection.query("insert into proyecto.usuarios (email,usuario,referencia,nombres,apellidos,genero,fecha_nacimiento,foto,token,activo,licencia)"
            + "values (?,null,?,?,?,?,?,null,null,false,'licencia de prueba'); ",
            [req.body.email, req.body.referencia, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento], function(err,rows) {

              if(err) {
                console.log('Error en la consulta')
                res.json({
                  'code': 100,
                  'status': 'Error en la consulta'
                })

              } else {
                connection.query("select * from proyecto.usuarios where email = ?;",
                [req.body.email] , function(err,rows) {
                  if(err) {
                    console.log('Error en la consulta')
                    res.json({
                      'code': 100,
                      'status': 'Error en la consulta'
                    })

                  } else {
                    var idUsuario = rows[0].id
                    enviarCorreoActivacion(idUsuario, req, res)
                  }
                })
              }
            })
          }
        }
      })

      connection.release()
    }
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

  config.db.getConnection(function(err,connection) {
    if (err) {
      console.log('Error en la conexión a la base')
      res.json({'code' : 100, 'status' : 'Error en la conexión a la base'})
      return

    } else {
      connection.query("select referencia from proyecto.usuarios where email = ? and activo = 1;",
      [req.body.email], function(err,rows) {

        if(err) {
          console.log('Error en la consulta')
          res.json({'code' : 100, 'status' : 'Error en la consulta'})
        } else {

          if(rows[0].length = 0){
            res.json('Datos incorrectos')
          } else {


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
              subject: 'Recuperación de contraseña',
              html: '<p>Hola, su contraseña es: '+rows[0].referencia+'</p>'
            }

            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error)
                res.json({mensaje:'Error'})
              }else{
                res.json('Ok')
              }
            })
          }
        }

        connection.release()
      })
    }
  })
}
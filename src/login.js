document.getElementById('login-usuario').addEventListener('click', loginUsuario)
document.getElementById('registrarse').addEventListener('click', registrarse)
$('select').material_select()

$('#seccion-login').keypress(function (e) {
  if(e.which == 13){
    loginUsuario()
  }
})

$('#seccion-nuevo-usuario').keypress(function (e) {
  if (e.which == 13) {
    registrarse()
  }
})

function loginUsuario() {
  var emailUsuarioError = document.getElementById('email-usuario-error')

  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
    emailUsuarioError.innerHTML = 'El formato de email no es correcto'
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded')
  } else if ($('#email-usuario').val() == '' || $('#referencia').val() == '') {
    emailUsuarioError.innerHTML = 'Todos los campos son necesarios'
    Materialize.toast('Todos los campos son necesarios', 5000, 'rounded')
  } else {
    emailUsuarioError.innerHTML = ''

    $.ajax({
      url: '/login',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: $('#email-usuario').val(),
        referencia:  $('#referencia').val()
      }),
      success: function (data) {

        if (data == 'Datos incorrectos') {
          emailUsuarioError.innerHTML = data
          Materialize.toast(data, 5000, 'rounded')
        } else {
          localStorage.setItem('id',data.id)
          localStorage.setItem('email',data.email)
        }
      },
      error: function (error) {
        emailUsuarioError.innerHTML = 'No hay acceso al sistema, contacte al administrador'
      }
    })
  }
}

function registrarse() {
  var emailNuevoError = document.getElementById('email-nuevo-error')

  if (/\S+@\S+\.\S+/.test($('#email-nuevo').val()) != true) {

    emailNuevoError.innerHTML = 'El formato de email no es correcto'
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded')

  } else if($('#referencia2').val() != $('#referencia3').val()) {

    emailNuevoError.innerHTML = 'Verifique la contraseña'
    Materialize.toast('Verifique la contraseña', 5000, 'rounded')

  } else {

    emailNuevoError.innerHTML = ''

    var fechaNacimiento = document.getElementById('fecha-nacimiento')

    if (fechaNacimiento == '') {
      fechaNacimiento = '1900-01-01'
    }

    var genero = document.getElementById('genero')
    var generoValue = genero.options[genero.selectedIndex].value

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/registrarse', true)
    ajax.responseType = 'json';
    ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 3){
        console.log('cargando')
      } else if (ajax.readyState == 4 && ajax.status == 200) {
        console.log(ajax.response)

        var mensaje = ''

        /*if (data.mensaje == 'El email seleccionado ya esta registrado') {
          var mensaje = data.mensaje+': '+$("#email-nuevo").val()
          emailNuevoError.innerHTML = mensaje
          Materialize.toast(mensaje, 5000, 'rounded')

        } else {
          mensaje = 'Se envió un email al email ' + $("#email-nuevo").val() + ' para activar su cuenta'
          $('#email-nuevo-mensaje').html(mensaje)
          Materialize.toast(mensaje, 5000, 'rounded')
        }*/
      } else {
        emailNuevoError.innerHTML = 'No hay acceso al sistema, contacte al administrador'
      }
    }
    ajax.send(JSON.stringify({
      email: document.getElementById('email-nuevo').value,
      referencia: document.getElementById('referencia2').value,
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      genero: generoValue,
      fecha_nacimiento: fechaNacimiento
    }))
  }
}

document.getElementById('reenviar-password').addEventListener('click', reenviarPassword)

function reenviarPassword() {
  console.log('Entro al click')
  /*
  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
      $('#email-usuario-error').html('El formato de email no es correcto')
      Materialize.toast('El formato de email no es correcto', 5000, 'rounded')
  } else {
    $('#email-usuario-error').html('')

    $.ajax({
      url: '/reenviar-password',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: $('#email-usuario').val()
      }),
      success: function (data) {
        var mensaje = ''
        if(data == 'Ok') {
          mensaje = `Se envió su contraseña al correo ' ${$("#email-usuario").val()}
          Te hemos enviado un correo electrónico con las instrucciones para cambiar tu contraseña, si existe una cuenta asociada recibirás un correo electrónico en los siguientes minutos.

          Si no recibes ningún correo electrónico, por favor verifica que el correo electrónico sea el que corresponde a tu cuenta, también checa tu carpeta de spam.`

          $('#email-usuario-mensaje').html(mensaje)
          Materialize.toast(mensaje, 5000, 'rounded')
        } else {
          mensaje = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde'
          $('#email-usuario-error').html(mensaje)
          Materialize.toast(mensaje, 5000, 'rounded')
        }
      },
      error: function (error) {
        $('#email-usuario-error').html('No hay acceso al sistema, contacte al administrador')
      }
    })
  }*/
}

$('#seccion-login').keypress(function (e) {
  if(e.which == 13){
    loginUsuario()
  }
})

$('#login-usuario').click(function() {
  loginUsuario()
})

$('#seccion-nuevo-usuario').keypress(function (e) {
  if (e.which == 13) {
    registrarse()
  }
})

$('#registrarse').click(function() {
  registrarse()
})

$('select').material_select()

function loginUsuario() {

  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
    $('#email-usuario-error').html('El formato de email no es correcto')
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded')
  } else if ($('#email-usuario').val() == '' || $('#referencia').val() == '') {
    $('#email-usuario-error').html('Todos los campos son necesarios')
    Materialize.toast('Todos los campos son necesarios', 5000, 'rounded')
  } else {
    $('#email-usuario-error').html('')

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
          $('#email-usuario-error').html(data)
          Materialize.toast(data, 5000, 'rounded')
        } else {
          localStorage.setItem('id',data.id)
          localStorage.setItem('email',data.email)
        }
      },
      error: function (error) {
        $('#email-usuario-error').html('No hay acceso al sistema, contacte al administrador')
      }
    })
  }
}

function registrarse() {

  if (/\S+@\S+\.\S+/.test($('#email-nuevo').val()) != true) {

    $('#email-nuevo-error').html('El formato de email no es correcto')
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded')

  } else if($('#referencia2').val() != $('#referencia3').val()) {

    $('#email-nuevo-error').html('Verifique la contraseña')
    Materialize.toast('Verifique la contraseña', 5000, 'rounded')

  } else {

    $('#email-nuevo-error').html('')

    var fechaNacimiento = $('#fecha-nacimiento').val()

    if (fechaNacimiento == '') {
      fechaNacimiento = '1900-01-01'
    }

    $.ajax({
      url: '/registrarse',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: $('#email-nuevo').val(),
        referencia: $('#referencia2').val(),
        nombres: $('#nombres').val(),
        apellidos: $('#apellidos').val(),
        genero: $('#genero').val(),
        fecha_nacimiento: fechaNacimiento
      }),
      success: function (data) {
        var mensaje = ''

        if (data.mensaje == 'El email seleccionado ya esta registrado') {
          var mensaje = data.mensaje+": "+$("#email-nuevo").val()
          $('#email-nuevo-error').html(mensaje)
          Materialize.toast(mensaje, 5000, 'rounded')

        } else {
          mensaje = 'Se envió un email al email ' + $("#email-nuevo").val() + ' para activar su cuenta'
          $('#email-nuevo-mensaje').html(mensaje)
          Materialize.toast(mensaje, 5000, 'rounded')
        }
      },
      error: function (error) {
        $( '#email-usuario-error').html('No hay acceso al sistema, contacte al administrador')
      }
    })
  }
}

$('#reenviar-password').click(function() {
  reenviarPassword()
})

function reenviarPassword() {

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
  }
}

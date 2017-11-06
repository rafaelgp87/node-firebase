(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.getElementById('login-usuario').addEventListener('click', loginUsuario);
document.getElementById('registrarse').addEventListener('click', registrarse);
$('select').material_select();

$('#seccion-login').keypress(function (e) {
  if (e.which == 13) {
    loginUsuario();
  }
});

$('#seccion-nuevo-usuario').keypress(function (e) {
  if (e.which == 13) {
    registrarse();
  }
});

function loginUsuario() {
  var emailUsuarioError = document.getElementById('email-usuario-error');

  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
    emailUsuarioError.innerHTML = 'El formato de email no es correcto';
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded');
  } else if ($('#email-usuario').val() == '' || $('#referencia').val() == '') {
    emailUsuarioError.innerHTML = 'Todos los campos son necesarios';
    Materialize.toast('Todos los campos son necesarios', 5000, 'rounded');
  } else {
    emailUsuarioError.innerHTML = '';

    $.ajax({
      url: '/login',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: $('#email-usuario').val(),
        referencia: $('#referencia').val()
      }),
      success: function success(data) {

        if (data == 'Datos incorrectos') {
          emailUsuarioError.innerHTML = data;
          Materialize.toast(data, 5000, 'rounded');
        } else {
          localStorage.setItem('id', data.id);
          localStorage.setItem('email', data.email);
        }
      },
      error: function error(_error) {
        emailUsuarioError.innerHTML = 'No hay acceso al sistema, contacte al administrador';
      }
    });
  }
}

function registrarse() {
  var emailNuevoError = document.getElementById('email-nuevo-error');

  if (/\S+@\S+\.\S+/.test($('#email-nuevo').val()) != true) {

    emailNuevoError.innerHTML = 'El formato de email no es correcto';
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded');
  } else if ($('#referencia2').val() != $('#referencia3').val()) {

    emailNuevoError.innerHTML = 'Verifique la contraseña';
    Materialize.toast('Verifique la contraseña', 5000, 'rounded');
  } else {

    emailNuevoError.innerHTML = '';

    var fechaNacimiento = document.getElementById('fecha-nacimiento');

    if (fechaNacimiento == '') {
      fechaNacimiento = '1900-01-01';
    }

    var genero = document.getElementById('genero');
    var generoValue = genero.options[genero.selectedIndex].value;

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '/registrarse', true);
    ajax.responseType = 'json';
    ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 3) {
        console.log('cargando');
      } else if (ajax.readyState == 4 && ajax.status == 200) {
        console.log(ajax.response);

        var mensaje = '';

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
        emailNuevoError.innerHTML = 'No hay acceso al sistema, contacte al administrador';
      }
    };
    ajax.send(JSON.stringify({
      email: document.getElementById('email-nuevo').value,
      referencia: document.getElementById('referencia2').value,
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      genero: generoValue,
      fecha_nacimiento: fechaNacimiento
    }));
  }
}

document.getElementById('reenviar-password').addEventListener('click', reenviarPassword);

function reenviarPassword() {
  console.log('Entro al click');
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLFlBQW5FO0FBQ0EsU0FBUyxjQUFULENBQXdCLGFBQXhCLEVBQXVDLGdCQUF2QyxDQUF3RCxPQUF4RCxFQUFpRSxXQUFqRTtBQUNBLEVBQUUsUUFBRixFQUFZLGVBQVo7O0FBRUEsRUFBRSxnQkFBRixFQUFvQixRQUFwQixDQUE2QixVQUFVLENBQVYsRUFBYTtBQUN4QyxNQUFHLEVBQUUsS0FBRixJQUFXLEVBQWQsRUFBaUI7QUFDZjtBQUNEO0FBQ0YsQ0FKRDs7QUFNQSxFQUFFLHdCQUFGLEVBQTRCLFFBQTVCLENBQXFDLFVBQVUsQ0FBVixFQUFhO0FBQ2hELE1BQUksRUFBRSxLQUFGLElBQVcsRUFBZixFQUFtQjtBQUNqQjtBQUNEO0FBQ0YsQ0FKRDs7QUFNQSxTQUFTLFlBQVQsR0FBd0I7QUFDdEIsTUFBSSxvQkFBb0IsU0FBUyxjQUFULENBQXdCLHFCQUF4QixDQUF4Qjs7QUFFQSxNQUFJLGVBQWUsSUFBZixDQUFvQixFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLEVBQXBCLEtBQWtELElBQXRELEVBQTREO0FBQzFELHNCQUFrQixTQUFsQixHQUE4QixvQ0FBOUI7QUFDQSxnQkFBWSxLQUFaLENBQWtCLG9DQUFsQixFQUF3RCxJQUF4RCxFQUE4RCxTQUE5RDtBQUNELEdBSEQsTUFHTyxJQUFJLEVBQUUsZ0JBQUYsRUFBb0IsR0FBcEIsTUFBNkIsRUFBN0IsSUFBbUMsRUFBRSxhQUFGLEVBQWlCLEdBQWpCLE1BQTBCLEVBQWpFLEVBQXFFO0FBQzFFLHNCQUFrQixTQUFsQixHQUE4QixpQ0FBOUI7QUFDQSxnQkFBWSxLQUFaLENBQWtCLGlDQUFsQixFQUFxRCxJQUFyRCxFQUEyRCxTQUEzRDtBQUNELEdB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QUFTLFNBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQyxLQUhyQjtBQUl2QixpQkFBVyxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUMsS0FKekI7QUFLdkIsY0FBUSxXQUxlO0FBTXZCLHdCQUFrQjtBQU5LLEtBQWYsQ0FBVjtBQVFEO0FBQ0Y7O0FBRUQsU0FBUyxjQUFULENBQXdCLG1CQUF4QixFQUE2QyxnQkFBN0MsQ0FBOEQsT0FBOUQsRUFBdUUsZ0JBQXZFOztBQUVBLFNBQVMsZ0JBQVQsR0FBNEI7QUFDMUIsVUFBUSxHQUFSLENBQVksZ0JBQVo7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbi11c3VhcmlvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dpblVzdWFyaW8pXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpc3RyYXJzZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVnaXN0cmFyc2UpXHJcbiQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpXHJcblxyXG4kKCcjc2VjY2lvbi1sb2dpbicpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYoZS53aGljaCA9PSAxMyl7XHJcbiAgICBsb2dpblVzdWFyaW8oKVxyXG4gIH1cclxufSlcclxuXHJcbiQoJyNzZWNjaW9uLW51ZXZvLXVzdWFyaW8nKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xyXG4gIGlmIChlLndoaWNoID09IDEzKSB7XHJcbiAgICByZWdpc3RyYXJzZSgpXHJcbiAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gbG9naW5Vc3VhcmlvKCkge1xyXG4gIHZhciBlbWFpbFVzdWFyaW9FcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbC11c3VhcmlvLWVycm9yJylcclxuXHJcbiAgaWYgKC9cXFMrQFxcUytcXC5cXFMrLy50ZXN0KCQoJyNlbWFpbC11c3VhcmlvJykudmFsKCkpICE9IHRydWUpIHtcclxuICAgIGVtYWlsVXN1YXJpb0Vycm9yLmlubmVySFRNTCA9ICdFbCBmb3JtYXRvIGRlIGVtYWlsIG5vIGVzIGNvcnJlY3RvJ1xyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgfSBlbHNlIGlmICgkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpID09ICcnIHx8ICQoJyNyZWZlcmVuY2lhJykudmFsKCkgPT0gJycpIHtcclxuICAgIGVtYWlsVXN1YXJpb0Vycm9yLmlubmVySFRNTCA9ICdUb2RvcyBsb3MgY2FtcG9zIHNvbiBuZWNlc2FyaW9zJ1xyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ1RvZG9zIGxvcyBjYW1wb3Mgc29uIG5lY2VzYXJpb3MnLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGVtYWlsVXN1YXJpb0Vycm9yLmlubmVySFRNTCA9ICcnXHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiAnL2xvZ2luJyxcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6ICQoJyNlbWFpbC11c3VhcmlvJykudmFsKCksXHJcbiAgICAgICAgcmVmZXJlbmNpYTogICQoJyNyZWZlcmVuY2lhJykudmFsKClcclxuICAgICAgfSksXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGlmIChkYXRhID09ICdEYXRvcyBpbmNvcnJlY3RvcycpIHtcclxuICAgICAgICAgIGVtYWlsVXN1YXJpb0Vycm9yLmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KGRhdGEsIDUwMDAsICdyb3VuZGVkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkJyxkYXRhLmlkKVxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VtYWlsJyxkYXRhLmVtYWlsKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGVtYWlsVXN1YXJpb0Vycm9yLmlubmVySFRNTCA9ICdObyBoYXkgYWNjZXNvIGFsIHNpc3RlbWEsIGNvbnRhY3RlIGFsIGFkbWluaXN0cmFkb3InXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3RyYXJzZSgpIHtcclxuICB2YXIgZW1haWxOdWV2b0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsLW51ZXZvLWVycm9yJylcclxuXHJcbiAgaWYgKC9cXFMrQFxcUytcXC5cXFMrLy50ZXN0KCQoJyNlbWFpbC1udWV2bycpLnZhbCgpKSAhPSB0cnVlKSB7XHJcblxyXG4gICAgZW1haWxOdWV2b0Vycm9yLmlubmVySFRNTCA9ICdFbCBmb3JtYXRvIGRlIGVtYWlsIG5vIGVzIGNvcnJlY3RvJ1xyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcblxyXG4gIH0gZWxzZSBpZigkKCcjcmVmZXJlbmNpYTInKS52YWwoKSAhPSAkKCcjcmVmZXJlbmNpYTMnKS52YWwoKSkge1xyXG5cclxuICAgIGVtYWlsTnVldm9FcnJvci5pbm5lckhUTUwgPSAnVmVyaWZpcXVlIGxhIGNvbnRyYXNlw7FhJ1xyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ1ZlcmlmaXF1ZSBsYSBjb250cmFzZcOxYScsIDUwMDAsICdyb3VuZGVkJylcclxuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICBlbWFpbE51ZXZvRXJyb3IuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICB2YXIgZmVjaGFOYWNpbWllbnRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlY2hhLW5hY2ltaWVudG8nKVxyXG5cclxuICAgIGlmIChmZWNoYU5hY2ltaWVudG8gPT0gJycpIHtcclxuICAgICAgZmVjaGFOYWNpbWllbnRvID0gJzE5MDAtMDEtMDEnXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdlbmVybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5lcm8nKVxyXG4gICAgdmFyIGdlbmVyb1ZhbHVlID0gZ2VuZXJvLm9wdGlvbnNbZ2VuZXJvLnNlbGVjdGVkSW5kZXhdLnZhbHVlXHJcblxyXG4gICAgdmFyIGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxyXG4gICAgYWpheC5vcGVuKCdQT1NUJywgJy9yZWdpc3RyYXJzZScsIHRydWUpXHJcbiAgICBhamF4LnJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuICAgIGFqYXguc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKVxyXG4gICAgYWpheC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGFqYXgucmVhZHlTdGF0ZSA9PSAzKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FyZ2FuZG8nKVxyXG4gICAgICB9IGVsc2UgaWYgKGFqYXgucmVhZHlTdGF0ZSA9PSA0ICYmIGFqYXguc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFqYXgucmVzcG9uc2UpXHJcblxyXG4gICAgICAgIHZhciBtZW5zYWplID0gJydcclxuXHJcbiAgICAgICAgLyppZiAoZGF0YS5tZW5zYWplID09ICdFbCBlbWFpbCBzZWxlY2Npb25hZG8geWEgZXN0YSByZWdpc3RyYWRvJykge1xyXG4gICAgICAgICAgdmFyIG1lbnNhamUgPSBkYXRhLm1lbnNhamUrJzogJyskKFwiI2VtYWlsLW51ZXZvXCIpLnZhbCgpXHJcbiAgICAgICAgICBlbWFpbE51ZXZvRXJyb3IuaW5uZXJIVE1MID0gbWVuc2FqZVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVuc2FqZSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWVuc2FqZSA9ICdTZSBlbnZpw7MgdW4gZW1haWwgYWwgZW1haWwgJyArICQoXCIjZW1haWwtbnVldm9cIikudmFsKCkgKyAnIHBhcmEgYWN0aXZhciBzdSBjdWVudGEnXHJcbiAgICAgICAgICAkKCcjZW1haWwtbnVldm8tbWVuc2FqZScpLmh0bWwobWVuc2FqZSlcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1lbnNhamUsIDUwMDAsICdyb3VuZGVkJylcclxuICAgICAgICB9Ki9cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbWFpbE51ZXZvRXJyb3IuaW5uZXJIVE1MID0gJ05vIGhheSBhY2Nlc28gYWwgc2lzdGVtYSwgY29udGFjdGUgYWwgYWRtaW5pc3RyYWRvcidcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWpheC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgZW1haWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbC1udWV2bycpLnZhbHVlLFxyXG4gICAgICByZWZlcmVuY2lhOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmZXJlbmNpYTInKS52YWx1ZSxcclxuICAgICAgbm9tYnJlczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vbWJyZXMnKS52YWx1ZSxcclxuICAgICAgYXBlbGxpZG9zOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBlbGxpZG9zJykudmFsdWUsXHJcbiAgICAgIGdlbmVybzogZ2VuZXJvVmFsdWUsXHJcbiAgICAgIGZlY2hhX25hY2ltaWVudG86IGZlY2hhTmFjaW1pZW50b1xyXG4gICAgfSkpXHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVlbnZpYXItcGFzc3dvcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlZW52aWFyUGFzc3dvcmQpXHJcblxyXG5mdW5jdGlvbiByZWVudmlhclBhc3N3b3JkKCkge1xyXG4gIGNvbnNvbGUubG9nKCdFbnRybyBhbCBjbGljaycpXHJcbiAgLypcclxuICBpZiAoL1xcUytAXFxTK1xcLlxcUysvLnRlc3QoJCgnI2VtYWlsLXVzdWFyaW8nKS52YWwoKSkgIT0gdHJ1ZSkge1xyXG4gICAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nKVxyXG4gICAgICBNYXRlcmlhbGl6ZS50b2FzdCgnRWwgZm9ybWF0byBkZSBlbWFpbCBubyBlcyBjb3JyZWN0bycsIDUwMDAsICdyb3VuZGVkJylcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCcnKVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJy9yZWVudmlhci1wYXNzd29yZCcsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiAkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpXHJcbiAgICAgIH0pLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBtZW5zYWplID0gJydcclxuICAgICAgICBpZihkYXRhID09ICdPaycpIHtcclxuICAgICAgICAgIG1lbnNhamUgPSBgU2UgZW52acOzIHN1IGNvbnRyYXNlw7FhIGFsIGNvcnJlbyAnICR7JChcIiNlbWFpbC11c3VhcmlvXCIpLnZhbCgpfVxyXG4gICAgICAgICAgVGUgaGVtb3MgZW52aWFkbyB1biBjb3JyZW8gZWxlY3Ryw7NuaWNvIGNvbiBsYXMgaW5zdHJ1Y2Npb25lcyBwYXJhIGNhbWJpYXIgdHUgY29udHJhc2XDsWEsIHNpIGV4aXN0ZSB1bmEgY3VlbnRhIGFzb2NpYWRhIHJlY2liaXLDoXMgdW4gY29ycmVvIGVsZWN0csOzbmljbyBlbiBsb3Mgc2lndWllbnRlcyBtaW51dG9zLlxyXG5cclxuICAgICAgICAgIFNpIG5vIHJlY2liZXMgbmluZ8O6biBjb3JyZW8gZWxlY3Ryw7NuaWNvLCBwb3IgZmF2b3IgdmVyaWZpY2EgcXVlIGVsIGNvcnJlbyBlbGVjdHLDs25pY28gc2VhIGVsIHF1ZSBjb3JyZXNwb25kZSBhIHR1IGN1ZW50YSwgdGFtYmnDqW4gY2hlY2EgdHUgY2FycGV0YSBkZSBzcGFtLmBcclxuXHJcbiAgICAgICAgICAkKCcjZW1haWwtdXN1YXJpby1tZW5zYWplJykuaHRtbChtZW5zYWplKVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVuc2FqZSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtZW5zYWplID0gJ09jdXJyaW8gdW4gZXJyb3IgYWwgZW52w61hcmxlIHN1IGNvbnRyYXNlw7FhLCBpbnRlbnRlbG8gZGUgbnVldm8gbcOhcyB0YXJkZSdcclxuICAgICAgICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbChtZW5zYWplKVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVuc2FqZSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnTm8gaGF5IGFjY2VzbyBhbCBzaXN0ZW1hLCBjb250YWN0ZSBhbCBhZG1pbmlzdHJhZG9yJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9Ki9cclxufVxyXG4iXX0=

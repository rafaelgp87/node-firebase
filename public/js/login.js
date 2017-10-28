(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$('#seccion-login').keypress(function (e) {
  if (e.which == 13) {
    loginUsuario();
  }
});

$('#login-usuario').click(function () {
  loginUsuario();
});

$('#seccion-nuevo-usuario').keypress(function (e) {
  if (e.which == 13) {
    registrarse();
  }
});

$('#registrarse').click(function () {
  registrarse();
});

$('select').material_select();

function loginUsuario() {

  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
    $('#email-usuario-error').html('El formato de email no es correcto');
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded');
  } else if ($('#email-usuario').val() == '' || $('#referencia').val() == '') {
    $('#email-usuario-error').html('Todos los campos son necesarios');
    Materialize.toast('Todos los campos son necesarios', 5000, 'rounded');
  } else {
    $('#email-usuario-error').html('');

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
        console.log(data)
        if (data == 'Datos incorrectos') {
          $('#email-usuario-error').html(data);
          Materialize.toast(data, 5000, 'rounded');
        } else {
          localStorage.setItem('id', data.id);
          localStorage.setItem('email', data.email);
        }
      },
      error: function error(_error) {
        $('#email-usuario-error').html('No hay acceso al sistema, contacte al administrador');
      }
    });
  }
}

function registrarse() {

  if (/\S+@\S+\.\S+/.test($('#email-nuevo').val()) != true) {

    $('#email-nuevo-error').html('El formato de email no es correcto');
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded');
  } else if ($('#referencia2').val() != $('#referencia3').val()) {

    $('#email-nuevo-error').html('Verifique la contraseña');
    Materialize.toast('Verifique la contraseña', 5000, 'rounded');
  } else {

    $('#email-nuevo-error').html('');

    var fechaNacimiento = $('#fecha-nacimiento').val();

    if (fechaNacimiento == '') {
      fechaNacimiento = '1900-01-01';
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
      success: function success(data) {
        var mensaje = '';

        if (data.mensaje == 'El email seleccionado ya esta registrado') {
          var mensaje = data.mensaje + ": " + $("#email-nuevo").val();
          $('#email-nuevo-error').html(mensaje);
          Materialize.toast(mensaje, 5000, 'rounded');
        } else {
          mensaje = 'Se envió un email al email ' + $("#email-nuevo").val() + ' para activar su cuenta';
          $('#email-nuevo-mensaje').html(mensaje);
          Materialize.toast(mensaje, 5000, 'rounded');
        }
      },
      error: function error(_error2) {
        $('#email-usuario-error').html('No hay acceso al sistema, contacte al administrador');
      }
    });
  }
}

$('#reenviar-password').click(function () {
  reenviarPassword();
});

function reenviarPassword() {

  if (/\S+@\S+\.\S+/.test($('#email-usuario').val()) != true) {
    $('#email-usuario-error').html('El formato de email no es correcto');
    Materialize.toast('El formato de email no es correcto', 5000, 'rounded');
  } else {
    $('#email-usuario-error').html('');

    $.ajax({
      url: '/reenviar-password',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: $('#email-usuario').val()
      }),
      success: function success(data) {
        var mensaje = '';
        if (data == 'Ok') {
          mensaje = 'Se envió su contraseña al correo ' + $("#email-usuario").val();
          $('#email-usuario-mensaje').html(mensaje);
          Materialize.toast(mensaje, 5000, 'rounded');
        } else {
          mensaje = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde';
          $('#email-usuario-error').html(mensaje);
          Materialize.toast(mensaje, 5000, 'rounded');
        }
      },
      error: function error(_error3) {
        $('#email-usuario-error').html('No hay acceso al sistema, contacte al administrador');
      }
    });
  }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxFQUFFLGdCQUFGLEVBQW9CLFFBQXBCLENBQTZCLFVBQVUsQ0FBVixFQUFhO0FBQ3hDLE1BQUcsRUFBRSxLQUFGLElBQVcsRUFBZCxFQUFpQjtBQUNmO0FBQ0Q7QUFDRixDQUpEOztBQU1BLEVBQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsWUFBVztBQUNuQztBQUNELENBRkQ7O0FBSUEsRUFBRSx3QkFBRixFQUE0QixRQUE1QixDQUFxQyxVQUFVLENBQVYsRUFBYTtBQUNoRCxNQUFJLEVBQUUsS0FBRixJQUFXLEVBQWYsRUFBbUI7QUFDakI7QUFDRDtBQUNGLENBSkQ7O0FBTUEsRUFBRSxjQUFGLEVBQWtCLEtBQWxCLENBQXdCLFlBQVc7QUFDakM7QUFDRCxDQUZEOztBQUlBLEVBQUUsUUFBRixFQUFZLGVBQVo7O0FBRUEsU0FBUyxZQUFULEdBQXdCOztBQUV0QixNQUFJLGVBQWUsSUFBZixDQUFvQixFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLEVBQXBCLEtBQWtELElBQXRELEVBQTREO0FBQzFELE1BQUUsc0JBQUYsRUFBMEIsSUFBMUIsQ0FBK0Isb0NBQS9CO0FBQ0EsZ0JBQVksS0FBWixDQUFrQixvQ0FBbEIsRUFBd0QsSUFBeEQsRUFBOEQsU0FBOUQ7QUFDRCxHQUhELE1BR08sSUFBSSxFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLE1BQTZCLEVBQTdCLElBQW1DLEVBQUUsYUFBRixFQUFpQixHQUFqQixNQUEwQixFQUFqRSxFQUFxRTtBQUMxRSxNQUFFLHNCQUFGLEVBQTBCLElBQTFCLENBQStCLGlDQUEvQjtBQUNBLGdCQUFZLEtBQVosQ0FBa0IsaUNBQWxCLEVBQXFELElBQXJELEVBQTJELFNBQTNEO0FBQ0QsR0FITSxNQUdBO0FBQ0wsTUFBRSxzQkFBRixFQUEwQixJQUExQixDQUErQixF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Q0Esc0JBQVksS0FBWixDQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxTQUFqQztBQUNEO0FBQ0YsT0FuQkk7QUFvQkwsYUFBTyxlQUFVLE9BQVYsRUFBaUI7QUFDdEIsVUFBRSxzQkFBRixFQUEwQixJQUExQixDQUErQixxREFBL0I7QUFDRDtBQXRCSSxLQUFQO0FBd0JEO0FBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJCgnI3NlY2Npb24tbG9naW4nKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xyXG4gIGlmKGUud2hpY2ggPT0gMTMpe1xyXG4gICAgbG9naW5Vc3VhcmlvKClcclxuICB9XHJcbn0pXHJcblxyXG4kKCcjbG9naW4tdXN1YXJpbycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gIGxvZ2luVXN1YXJpbygpXHJcbn0pXHJcblxyXG4kKCcjc2VjY2lvbi1udWV2by11c3VhcmlvJykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoZS53aGljaCA9PSAxMykge1xyXG4gICAgcmVnaXN0cmFyc2UoKVxyXG4gIH1cclxufSlcclxuXHJcbiQoJyNyZWdpc3RyYXJzZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gIHJlZ2lzdHJhcnNlKClcclxufSlcclxuXHJcbiQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpXHJcblxyXG5mdW5jdGlvbiBsb2dpblVzdWFyaW8oKSB7XHJcblxyXG4gIGlmICgvXFxTK0BcXFMrXFwuXFxTKy8udGVzdCgkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpKSAhPSB0cnVlKSB7XHJcbiAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nKVxyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgfSBlbHNlIGlmICgkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpID09ICcnIHx8ICQoJyNyZWZlcmVuY2lhJykudmFsKCkgPT0gJycpIHtcclxuICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnVG9kb3MgbG9zIGNhbXBvcyBzb24gbmVjZXNhcmlvcycpXHJcbiAgICBNYXRlcmlhbGl6ZS50b2FzdCgnVG9kb3MgbG9zIGNhbXBvcyBzb24gbmVjZXNhcmlvcycsIDUwMDAsICdyb3VuZGVkJylcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCcnKVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiAkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpLFxyXG4gICAgICAgIHJlZmVyZW5jaWE6ICAkKCcjcmVmZXJlbmNpYScpLnZhbCgpXHJcbiAgICAgIH0pLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBpZihkYXRhID09ICdEYXRvcyBpbmNvcnJlY3Rvcycpe1xyXG4gICAgICAgICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKGRhdGEpXHJcbiAgICAgICAgICBNYXRlcmlhbGl6ZS50b2FzdChkYXRhLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWQnLGRhdGEuaWQpXHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW1haWwnLGRhdGEuZW1haWwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCdObyBoYXkgYWNjZXNvIGFsIHNpc3RlbWEsIGNvbnRhY3RlIGFsIGFkbWluaXN0cmFkb3InKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0cmFyc2UoKSB7XHJcblxyXG4gIGlmICgvXFxTK0BcXFMrXFwuXFxTKy8udGVzdCgkKCcjZW1haWwtbnVldm8nKS52YWwoKSkgIT0gdHJ1ZSkge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nKVxyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcblxyXG4gIH0gZWxzZSBpZigkKCcjcmVmZXJlbmNpYTInKS52YWwoKSAhPSAkKCcjcmVmZXJlbmNpYTMnKS52YWwoKSkge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJ1ZlcmlmaXF1ZSBsYSBjb250cmFzZcOxYScpXHJcbiAgICBNYXRlcmlhbGl6ZS50b2FzdCgnVmVyaWZpcXVlIGxhIGNvbnRyYXNlw7FhJywgNTAwMCwgJ3JvdW5kZWQnKVxyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJycpXHJcblxyXG4gICAgdmFyIGZlY2hhTmFjaW1pZW50byA9ICQoJyNmZWNoYS1uYWNpbWllbnRvJykudmFsKClcclxuXHJcbiAgICBpZiAoZmVjaGFOYWNpbWllbnRvID09ICcnKSB7XHJcbiAgICAgIGZlY2hhTmFjaW1pZW50byA9ICcxOTAwLTAxLTAxJ1xyXG4gICAgfVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJy9yZWdpc3RyYXJzZScsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiAkKCcjZW1haWwtbnVldm8nKS52YWwoKSxcclxuICAgICAgICByZWZlcmVuY2lhOiAkKCcjcmVmZXJlbmNpYTInKS52YWwoKSxcclxuICAgICAgICBub21icmVzOiAkKCcjbm9tYnJlcycpLnZhbCgpLFxyXG4gICAgICAgIGFwZWxsaWRvczogJCgnI2FwZWxsaWRvcycpLnZhbCgpLFxyXG4gICAgICAgIGdlbmVybzogJCgnI2dlbmVybycpLnZhbCgpLFxyXG4gICAgICAgIGZlY2hhX25hY2ltaWVudG86IGZlY2hhTmFjaW1pZW50b1xyXG4gICAgICB9KSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgbWVuc2FqZSA9ICcnXHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1lbnNhamUgPT0gJ0VsIGVtYWlsIHNlbGVjY2lvbmFkbyB5YSBlc3RhIHJlZ2lzdHJhZG8nKSB7XHJcbiAgICAgICAgICB2YXIgbWVuc2FqZSA9IGRhdGEubWVuc2FqZStcIjogXCIrJChcIiNlbWFpbC1udWV2b1wiKS52YWwoKVxyXG4gICAgICAgICAgJCgnI2VtYWlsLW51ZXZvLWVycm9yJykuaHRtbChtZW5zYWplKVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVuc2FqZSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWVuc2FqZSA9ICdTZSBlbnZpw7MgdW4gZW1haWwgYWwgZW1haWwgJyArICQoXCIjZW1haWwtbnVldm9cIikudmFsKCkgKyAnIHBhcmEgYWN0aXZhciBzdSBjdWVudGEnXHJcbiAgICAgICAgICAkKCcjZW1haWwtbnVldm8tbWVuc2FqZScpLmh0bWwobWVuc2FqZSlcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1lbnNhamUsIDUwMDAsICdyb3VuZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAkKCAnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCdObyBoYXkgYWNjZXNvIGFsIHNpc3RlbWEsIGNvbnRhY3RlIGFsIGFkbWluaXN0cmFkb3InKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuJCgnI3JlZW52aWFyLXBhc3N3b3JkJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgcmVlbnZpYXJQYXNzd29yZCgpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiByZWVudmlhclBhc3N3b3JkKCkge1xyXG5cclxuICBpZiAoL1xcUytAXFxTK1xcLlxcUysvLnRlc3QoJCgnI2VtYWlsLXVzdWFyaW8nKS52YWwoKSkgIT0gdHJ1ZSkge1xyXG4gICAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nKVxyXG4gICAgICBNYXRlcmlhbGl6ZS50b2FzdCgnRWwgZm9ybWF0byBkZSBlbWFpbCBubyBlcyBjb3JyZWN0bycsIDUwMDAsICdyb3VuZGVkJylcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCcnKVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJy9yZWVudmlhci1wYXNzd29yZCcsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiAkKCcjZW1haWwtdXN1YXJpbycpLnZhbCgpXHJcbiAgICAgIH0pLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBtZW5zYWplID0gJydcclxuICAgICAgICBpZihkYXRhID09ICdPaycpe1xyXG4gICAgICAgICAgbWVuc2FqZSA9ICdTZSBlbnZpw7Mgc3UgY29udHJhc2XDsWEgYWwgY29ycmVvICcgKyAkKFwiI2VtYWlsLXVzdWFyaW9cIikudmFsKClcclxuICAgICAgICAgICQoJyNlbWFpbC11c3VhcmlvLW1lbnNhamUnKS5odG1sKG1lbnNhamUpXHJcbiAgICAgICAgICBNYXRlcmlhbGl6ZS50b2FzdChtZW5zYWplLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBtZW5zYWplID0gJ09jdXJyaW8gdW4gZXJyb3IgYWwgZW52w61hcmxlIHN1IGNvbnRyYXNlw7FhLCBpbnRlbnRlbG8gZGUgbnVldm8gbcOhcyB0YXJkZSdcclxuICAgICAgICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbChtZW5zYWplKVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVuc2FqZSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnTm8gaGF5IGFjY2VzbyBhbCBzaXN0ZW1hLCBjb250YWN0ZSBhbCBhZG1pbmlzdHJhZG9yJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19

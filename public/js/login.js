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

        console.log(data);

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

document.getElementById('reenviar-password').addEventListener("click", reenviarPassword);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxFQUFFLGdCQUFGLEVBQW9CLFFBQXBCLENBQTZCLFVBQVUsQ0FBVixFQUFhO0FBQ3hDLE1BQUcsRUFBRSxLQUFGLElBQVcsRUFBZCxFQUFpQjtBQUNmO0FBQ0Q7QUFDRixDQUpEOztBQU1BLEVBQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsWUFBVztBQUNuQztBQUNELENBRkQ7O0FBSUEsRUFBRSx3QkFBRixFQUE0QixRQUE1QixDQUFxQyxVQUFVLENBQVYsRUFBYTtBQUNoRCxNQUFJLEVBQUUsS0FBRixJQUFXLEVBQWYsRUFBbUI7QUFDakI7QUFDRDtBQUNGLENBSkQ7O0FBTUEsRUFBRSxjQUFGLEVBQWtCLEtBQWxCLENBQXdCLFlBQVc7QUFDakM7QUFDRCxDQUZEOztBQUlBLEVBQUUsUUFBRixFQUFZLGVBQVo7O0FBRUEsU0FBUyxZQUFULEdBQXdCOztBQUV0QixNQUFJLGVBQWUsSUFBZixDQUFvQixFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLEVBQXBCLEtBQWtELElBQXRELEVBQTREO0FBQzFELE1BQUUsc0JBQUYsRUFBMEIsSUFBMUIsQ0FBK0Isb0NBQS9CO0FBQ0EsZ0JBQVksS0FBWixDQUFrQixvQ0FBbEIsRUFBd0QsSUFBeEQsRUFBOEQsU0FBOUQ7QUFDRCxHQUhELE1BR08sSUFBSSxFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLE1BQTZCLEVBQTdCLElBQW1DLEVBQUUsYUFBRixFQUFpQixHQUFqQixNQUEwQixFQUFqRSxFQUFxRTtBQUMxRSxNQUFFLHNCQUFGLEVBQTBCLElBQTFCLENBQStCLGlDQUEvQjtBQUNBLGdCQUFZLEtBQVosQ0FBa0IsaUNBQWxCLEVBQXFELElBQXJELEVBQTJELFNBQTNEO0FBQ0QsR0FITSxNQUdBO0FBQ0wsTUFBRSxzQkFBRixFQUEwQixJQUExQixDQUErQixFQUEvQjs7QUFFQSxNQUFFLElBQUYsQ0FBTztBQUNMLFdBQUssUUFEQTtBQUVMLFlBQU0sTUFGRDtBQUdMLGdCQUFVLE1BSEw7QUFJTCxtQkFBYSxpQ0FKUjtBQUtMLFlBQU0sS0FBSyxTQUFMLENBQWU7QUFDbkIsZUFBTyxFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLEVBRFk7QUFFbkIsb0JBQWEsRUFBRSxhQUFGLEVBQWlCLEdBQWpCO0FBRk0sT0FBZixDQUxEO0FBU0wsZUFBUyxpQkFBVSxJQUFWLEVBQWdCOztBQUV2QixZQUFJLFFBQVEsbUJBQVosRUFBaUM7QUFDL0IsWUFBRSxzQkFBRixFQUEwQixJQUExQixDQUErQixJQUEvQjtBQUNBLHNCQUFZLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEIsU0FBOUI7QUFDRCxTQUhELE1BR087QUFDTCx1QkFBYSxPQUFiLENBQXFCLElBQXJCLEVBQTBCLEtBQUssRUFBL0I7QUFDQSx1QkFBYSxPQUFiLENBQXFCLE9BQXJCLEVBQTZCLEtBQUssS0FBbEM7QUFDRDtBQUNGLE9BbEJJO0FBbUJMLGFBQU8sZUFBVSxNQUFWLEVBQWlCO0FBQ3RCLFVBQUUsc0JBQUYsRUFBMEIsSUFBMUIsQ0FBK0IscURBQS9CO0FBQ0Q7QUFyQkksS0FBUDtBQXVCRDtBQUNGOztBQUVELFNBQVMsV0FBVCxHQUF1Qjs7QUFFckIsTUFBSSxlQUFlLElBQWYsQ0FBb0IsRUFBRSxjQUFGLEVBQWtCLEdBQWxCLEVBQXBCLEtBQWdELElBQXBELEVBQTBEOztBQUV4RCxNQUFFLG9CQUFGLEVBQXdCLElBQXhCLENBQTZCLG9DQUE3QjtBQUNBLGdCQUFZLEtBQVosQ0FBa0Isb0NBQWxCLEVBQXdELElBQXhELEVBQThELFNBQTlEO0FBRUQsR0FMRCxNQUtPLElBQUcsRUFBRSxjQUFGLEVBQWtCLEdBQWxCLE1BQTJCLEVBQUUsY0FBRixFQUFrQixHQUFsQixFQUE5QixFQUF1RDs7QUFFNUQsTUFBRSxvQkFBRixFQUF3QixJQUF4QixDQUE2Qix5QkFBN0I7QUFDQSxnQkFBWSxLQUFaLENBQWtCLHlCQUFsQixFQUE2QyxJQUE3QyxFQUFtRCxTQUFuRDtBQUVELEdBTE0sTUFLQTs7QUFFTCxNQUFFLG9CQUFGLEVBQXdCLElBQXhCLENBQTZCLEVBQTdCOztBQUVBLFFBQUksa0JBQWtCLEVBQUUsbUJBQUYsRUFBdUIsR0FBdkIsRUFBdEI7O0FBRUEsUUFBSSxtQkFBbUIsRUFBdkIsRUFBMkI7QUFDekIsd0JBQWtCLFlBQWxCO0FBQ0Q7O0FBRUQsTUFBRSxJQUFGLENBQU87QUFDTCxXQUFLLGNBREE7QUFFTCxZQUFNLE1BRkQ7QUFHTCxnQkFBVSxNQUhMO0FBSUwsbUJBQWEsaUNBSlI7QUFLTCxZQUFNLEtBQUssU0FBTCxDQUFlO0FBQ25CLGVBQU8sRUFBRSxjQUFGLEVBQWtCLEdBQWxCLEVBRFk7QUFFbkIsb0JBQVksRUFBRSxjQUFGLEVBQWtCLEdBQWxCLEVBRk87QUFHbkIsaUJBQVMsRUFBRSxVQUFGLEVBQWMsR0FBZCxFQUhVO0FBSW5CLG1CQUFXLEVBQUUsWUFBRixFQUFnQixHQUFoQixFQUpRO0FBS25CLGdCQUFRLEVBQUUsU0FBRixFQUFhLEdBQWIsRUFMVztBQU1uQiwwQkFBa0I7QUFOQyxPQUFmLENBTEQ7QUFhTCxlQUFTLGlCQUFVLElBQVYsRUFBZ0I7O0FBRXZCLGdCQUFRLEdBQVIsQ0FBWSxJQUFaOztBQUVBLFlBQUksVUFBVSxFQUFkOztBQUVBLFlBQUksS0FBSyxPQUFMLElBQWdCLDBDQUFwQixFQUFnRTtBQUM5RCxjQUFJLFVBQVUsS0FBSyxPQUFMLEdBQWEsSUFBYixHQUFrQixFQUFFLGNBQUYsRUFBa0IsR0FBbEIsRUFBaEM7QUFDQSxZQUFFLG9CQUFGLEVBQXdCLElBQXhCLENBQTZCLE9BQTdCO0FBQ0Esc0JBQVksS0FBWixDQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxTQUFqQztBQUVELFNBTEQsTUFLTztBQUNMLG9CQUFVLGdDQUFnQyxFQUFFLGNBQUYsRUFBa0IsR0FBbEIsRUFBaEMsR0FBMEQseUJBQXBFO0FBQ0EsWUFBRSxzQkFBRixFQUEwQixJQUExQixDQUErQixPQUEvQjtBQUNBLHNCQUFZLEtBQVosQ0FBa0IsT0FBbEIsRUFBMkIsSUFBM0IsRUFBaUMsU0FBakM7QUFDRDtBQUNGLE9BN0JJO0FBOEJMLGFBQU8sZUFBVSxPQUFWLEVBQWlCO0FBQ3RCLFVBQUcsc0JBQUgsRUFBMkIsSUFBM0IsQ0FBZ0MscURBQWhDO0FBQ0Q7QUFoQ0ksS0FBUDtBQWtDRDtBQUNGOztBQUVELFNBQVMsY0FBVCxDQUF3QixtQkFBeEIsRUFBNkMsZ0JBQTdDLENBQThELE9BQTlELEVBQXVFLGdCQUF2RTs7QUFFQSxTQUFTLGdCQUFULEdBQTRCO0FBQzFCLFVBQVEsR0FBUixDQUFZLGdCQUFaO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKCcjc2VjY2lvbi1sb2dpbicpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYoZS53aGljaCA9PSAxMyl7XHJcbiAgICBsb2dpblVzdWFyaW8oKVxyXG4gIH1cclxufSlcclxuXHJcbiQoJyNsb2dpbi11c3VhcmlvJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgbG9naW5Vc3VhcmlvKClcclxufSlcclxuXHJcbiQoJyNzZWNjaW9uLW51ZXZvLXVzdWFyaW8nKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xyXG4gIGlmIChlLndoaWNoID09IDEzKSB7XHJcbiAgICByZWdpc3RyYXJzZSgpXHJcbiAgfVxyXG59KVxyXG5cclxuJCgnI3JlZ2lzdHJhcnNlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgcmVnaXN0cmFyc2UoKVxyXG59KVxyXG5cclxuJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KClcclxuXHJcbmZ1bmN0aW9uIGxvZ2luVXN1YXJpbygpIHtcclxuXHJcbiAgaWYgKC9cXFMrQFxcUytcXC5cXFMrLy50ZXN0KCQoJyNlbWFpbC11c3VhcmlvJykudmFsKCkpICE9IHRydWUpIHtcclxuICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnRWwgZm9ybWF0byBkZSBlbWFpbCBubyBlcyBjb3JyZWN0bycpXHJcbiAgICBNYXRlcmlhbGl6ZS50b2FzdCgnRWwgZm9ybWF0byBkZSBlbWFpbCBubyBlcyBjb3JyZWN0bycsIDUwMDAsICdyb3VuZGVkJylcclxuICB9IGVsc2UgaWYgKCQoJyNlbWFpbC11c3VhcmlvJykudmFsKCkgPT0gJycgfHwgJCgnI3JlZmVyZW5jaWEnKS52YWwoKSA9PSAnJykge1xyXG4gICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCdUb2RvcyBsb3MgY2FtcG9zIHNvbiBuZWNlc2FyaW9zJylcclxuICAgIE1hdGVyaWFsaXplLnRvYXN0KCdUb2RvcyBsb3MgY2FtcG9zIHNvbiBuZWNlc2FyaW9zJywgNTAwMCwgJ3JvdW5kZWQnKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwoJycpXHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiAnL2xvZ2luJyxcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6ICQoJyNlbWFpbC11c3VhcmlvJykudmFsKCksXHJcbiAgICAgICAgcmVmZXJlbmNpYTogICQoJyNyZWZlcmVuY2lhJykudmFsKClcclxuICAgICAgfSksXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGlmIChkYXRhID09ICdEYXRvcyBpbmNvcnJlY3RvcycpIHtcclxuICAgICAgICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbChkYXRhKVxyXG4gICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QoZGF0YSwgNTAwMCwgJ3JvdW5kZWQnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWQnLGRhdGEuaWQpXHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW1haWwnLGRhdGEuZW1haWwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCdObyBoYXkgYWNjZXNvIGFsIHNpc3RlbWEsIGNvbnRhY3RlIGFsIGFkbWluaXN0cmFkb3InKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0cmFyc2UoKSB7XHJcblxyXG4gIGlmICgvXFxTK0BcXFMrXFwuXFxTKy8udGVzdCgkKCcjZW1haWwtbnVldm8nKS52YWwoKSkgIT0gdHJ1ZSkge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nKVxyXG4gICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcblxyXG4gIH0gZWxzZSBpZigkKCcjcmVmZXJlbmNpYTInKS52YWwoKSAhPSAkKCcjcmVmZXJlbmNpYTMnKS52YWwoKSkge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJ1ZlcmlmaXF1ZSBsYSBjb250cmFzZcOxYScpXHJcbiAgICBNYXRlcmlhbGl6ZS50b2FzdCgnVmVyaWZpcXVlIGxhIGNvbnRyYXNlw7FhJywgNTAwMCwgJ3JvdW5kZWQnKVxyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwoJycpXHJcblxyXG4gICAgdmFyIGZlY2hhTmFjaW1pZW50byA9ICQoJyNmZWNoYS1uYWNpbWllbnRvJykudmFsKClcclxuXHJcbiAgICBpZiAoZmVjaGFOYWNpbWllbnRvID09ICcnKSB7XHJcbiAgICAgIGZlY2hhTmFjaW1pZW50byA9ICcxOTAwLTAxLTAxJ1xyXG4gICAgfVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJy9yZWdpc3RyYXJzZScsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiAkKCcjZW1haWwtbnVldm8nKS52YWwoKSxcclxuICAgICAgICByZWZlcmVuY2lhOiAkKCcjcmVmZXJlbmNpYTInKS52YWwoKSxcclxuICAgICAgICBub21icmVzOiAkKCcjbm9tYnJlcycpLnZhbCgpLFxyXG4gICAgICAgIGFwZWxsaWRvczogJCgnI2FwZWxsaWRvcycpLnZhbCgpLFxyXG4gICAgICAgIGdlbmVybzogJCgnI2dlbmVybycpLnZhbCgpLFxyXG4gICAgICAgIGZlY2hhX25hY2ltaWVudG86IGZlY2hhTmFjaW1pZW50b1xyXG4gICAgICB9KSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuXHJcbiAgICAgICAgdmFyIG1lbnNhamUgPSAnJ1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5tZW5zYWplID09ICdFbCBlbWFpbCBzZWxlY2Npb25hZG8geWEgZXN0YSByZWdpc3RyYWRvJykge1xyXG4gICAgICAgICAgdmFyIG1lbnNhamUgPSBkYXRhLm1lbnNhamUrXCI6IFwiKyQoXCIjZW1haWwtbnVldm9cIikudmFsKClcclxuICAgICAgICAgICQoJyNlbWFpbC1udWV2by1lcnJvcicpLmh0bWwobWVuc2FqZSlcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1lbnNhamUsIDUwMDAsICdyb3VuZGVkJylcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1lbnNhamUgPSAnU2UgZW52acOzIHVuIGVtYWlsIGFsIGVtYWlsICcgKyAkKFwiI2VtYWlsLW51ZXZvXCIpLnZhbCgpICsgJyBwYXJhIGFjdGl2YXIgc3UgY3VlbnRhJ1xyXG4gICAgICAgICAgJCgnI2VtYWlsLW51ZXZvLW1lbnNhamUnKS5odG1sKG1lbnNhamUpXHJcbiAgICAgICAgICBNYXRlcmlhbGl6ZS50b2FzdChtZW5zYWplLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgJCggJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnTm8gaGF5IGFjY2VzbyBhbCBzaXN0ZW1hLCBjb250YWN0ZSBhbCBhZG1pbmlzdHJhZG9yJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWVudmlhci1wYXNzd29yZCcpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWVudmlhclBhc3N3b3JkKVxyXG5cclxuZnVuY3Rpb24gcmVlbnZpYXJQYXNzd29yZCgpIHtcclxuICBjb25zb2xlLmxvZygnRW50cm8gYWwgY2xpY2snKVxyXG4gIC8qXHJcbiAgaWYgKC9cXFMrQFxcUytcXC5cXFMrLy50ZXN0KCQoJyNlbWFpbC11c3VhcmlvJykudmFsKCkpICE9IHRydWUpIHtcclxuICAgICAgJCgnI2VtYWlsLXVzdWFyaW8tZXJyb3InKS5odG1sKCdFbCBmb3JtYXRvIGRlIGVtYWlsIG5vIGVzIGNvcnJlY3RvJylcclxuICAgICAgTWF0ZXJpYWxpemUudG9hc3QoJ0VsIGZvcm1hdG8gZGUgZW1haWwgbm8gZXMgY29ycmVjdG8nLCA1MDAwLCAncm91bmRlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgICQoJyNlbWFpbC11c3VhcmlvLWVycm9yJykuaHRtbCgnJylcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6ICcvcmVlbnZpYXItcGFzc3dvcmQnLFxyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBlbWFpbDogJCgnI2VtYWlsLXVzdWFyaW8nKS52YWwoKVxyXG4gICAgICB9KSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgbWVuc2FqZSA9ICcnXHJcbiAgICAgICAgaWYoZGF0YSA9PSAnT2snKSB7XHJcbiAgICAgICAgICBtZW5zYWplID0gYFNlIGVudmnDsyBzdSBjb250cmFzZcOxYSBhbCBjb3JyZW8gJyAkeyQoXCIjZW1haWwtdXN1YXJpb1wiKS52YWwoKX1cclxuICAgICAgICAgIFRlIGhlbW9zIGVudmlhZG8gdW4gY29ycmVvIGVsZWN0csOzbmljbyBjb24gbGFzIGluc3RydWNjaW9uZXMgcGFyYSBjYW1iaWFyIHR1IGNvbnRyYXNlw7FhLCBzaSBleGlzdGUgdW5hIGN1ZW50YSBhc29jaWFkYSByZWNpYmlyw6FzIHVuIGNvcnJlbyBlbGVjdHLDs25pY28gZW4gbG9zIHNpZ3VpZW50ZXMgbWludXRvcy5cclxuXHJcbiAgICAgICAgICBTaSBubyByZWNpYmVzIG5pbmfDum4gY29ycmVvIGVsZWN0csOzbmljbywgcG9yIGZhdm9yIHZlcmlmaWNhIHF1ZSBlbCBjb3JyZW8gZWxlY3Ryw7NuaWNvIHNlYSBlbCBxdWUgY29ycmVzcG9uZGUgYSB0dSBjdWVudGEsIHRhbWJpw6luIGNoZWNhIHR1IGNhcnBldGEgZGUgc3BhbS5gXHJcblxyXG4gICAgICAgICAgJCgnI2VtYWlsLXVzdWFyaW8tbWVuc2FqZScpLmh0bWwobWVuc2FqZSlcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1lbnNhamUsIDUwMDAsICdyb3VuZGVkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWVuc2FqZSA9ICdPY3VycmlvIHVuIGVycm9yIGFsIGVudsOtYXJsZSBzdSBjb250cmFzZcOxYSwgaW50ZW50ZWxvIGRlIG51ZXZvIG3DoXMgdGFyZGUnXHJcbiAgICAgICAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwobWVuc2FqZSlcclxuICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1lbnNhamUsIDUwMDAsICdyb3VuZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAkKCcjZW1haWwtdXN1YXJpby1lcnJvcicpLmh0bWwoJ05vIGhheSBhY2Nlc28gYWwgc2lzdGVtYSwgY29udGFjdGUgYWwgYWRtaW5pc3RyYWRvcicpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSovXHJcbn1cclxuIl19

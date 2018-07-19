app.controller('login', ['$scope', function(s) {

  // Funciones
  s.loginEmail = function () {

    var promise = firebase.auth().signInWithEmailAndPassword(s.email, s.pass);
    promise.catch(e => console.log(e));
  }

  s.loginGoogle = function () {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    //provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(authData) {
      console.log('****************')
      console.log(authData);
      onsole.log('****************')
    }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
  }

  s.loginFacebook = function () {

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(authData) {
      console.log('****************')
      console.log(authData);
      onsole.log('****************')
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
  }

  s.registrarEmail = function () {

    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(s.email, s.pass);
    promise.catch(e => console.log(e));
    //Si e.message viene nulo no hubo problema de authenticación
  }

  s.logout = function () {

    firebase.auth().signOut().then(function() {
      console.log('Signout successful!')
    }, function(error) {
      console.log('Signout failed')
    });
  }

  // Subir archivos
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');

  fileButton.addEventListener('change', function(e) {

    console.log('uploadFile')

    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('avatar-usuarios/' + file.name);
    var task = storageRef.put(file);

    task.on('state_changed',
      function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {

      },
      function completed() {

      }
    )
  });

  // Consultas a la base
  var query = firebase.database().ref().child('cursos');

  query.once('value', function(snapshot) {
    var messages = [];
    snapshot.forEach(function(snap) {
      //console.log(snap.key)
      //console.log(snap.val())
      if(snap.val().nombre === 'c#') {
        messages.push(snap.val());
      }
    });
    //console.log(messages);
  });

  verificarLogin()

  // Sincronización de objetos
  var preObject = document.getElementById('objeto');
  var ulLista = document.getElementById('lista');
  var dbRefObject = firebase.database().ref().child('objeto');
  var dbRefList = dbRefObject.child('habilidades');

  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3)
  });

  dbRefList.on('child_added', snap => {
    var lista = document.createElement('li');
    lista.innerText = snap.val();
    lista.id = snap.key;
    ulLista.appendChild(lista)
  });

  dbRefList.on('child_changed', snap => {

    var liChanged = ulLista.children[snap.key]
    liChanged.innerText = snap.val();
  })

  dbRefList.on('child_removed', snap => {
    var liToRemove = ulLista.children[snap.key]
    liToRemove.remove()
  })
}]);

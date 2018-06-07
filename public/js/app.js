// Initialize Firebase
var config = {
  apiKey: "AIzaSyARFSSX-5jiaKbUEKHSFXOZ0TIDztP4oEc",
  authDomain: "proyecto-firebase-d9033.firebaseapp.com",
  databaseURL: "https://proyecto-firebase-d9033.firebaseio.com",
  projectId: "proyecto-firebase-d9033",
  storageBucket: "proyecto-firebase-d9033.appspot.com",
  messagingSenderId: "857132833562"
};

firebase.initializeApp(config);

// Autenticación con Google
var btnLoginGoogle = document.getElementById('btnLoginGoogle');

btnLoginGoogle.addEventListener('click', e => {

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  firebase.auth().signInWithRedirect(provider);

  firebase.auth().getRedirectResult().then(function(authData) {
    console.log(authData);
  }).catch(function(error) {
    console.log(error);
  });
});

// Autenticación con Facebook
var btnLoginFacebook = document.getElementById('btnLoginFacebook');

btnLoginFacebook.addEventListener('click', e => {

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)
  }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
  });
});

// Consultas a la base
var query = firebase.database().ref().child('cursos');

query.once('value', function(snapshot) {
  var messages = [];
  snapshot.forEach(function(snap) {
    console.log(snap.key)
    console.log(snap.val())
    if(snap.val().nombre === 'c#') {
      messages.push(snap.val());
    }
  });
  console.log(messages);
});

// Subir archivos
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(e) {
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
})

// Authenticación
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnRegistrarEmail = document.getElementById('btnRegistrarEmail');
var btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', e => {

  var promise = firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value);
  promise.catch(e => console.log(e));
});

btnRegistrarEmail.addEventListener('click', e => {
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();

  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e));
  //Si e.message viene nulo no hubo problema de authenticación
});

btnLogout.addEventListener('click', e => {

  firebase.auth().signOut().then(function() {
    console.log('Signout successful!')
  }, function(error) {
    console.log('Signout failed')
  });
});

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    //user.sendEmailVerification();
    if (user != null) {

      // User is signed in.
      var displayName = user.displayName;
      console.log('displayName: ' + displayName)
      var email = user.email;
      console.log('email: ' + email)
      var emailVerified = user.emailVerified;
      console.log('emailVerified: ' + emailVerified)
      var photoURL = user.photoURL;
      console.log('photoURL: ' + photoURL)
      var isAnonymous = user.isAnonymous;
      console.log('isAnonymous: ' + isAnonymous)
      var uid = user.uid;
      console.log('uid: ' + uid)
      var providerData = user.providerData;
      console.log('providerData: ' + providerData)
    }

    btnLogout.classList.remove('hide');
    btnLoginGoogle.classList.add('hide');
    btnLogin.classList.add('hide');
    btnRegistrarEmail.classList.add('hide');
  } else {
    console.log('no logueado');
    btnLogout.classList.add('hide');
    btnLoginGoogle.classList.remove('hide');
    btnLogin.classList.remove('hide');
    btnRegistrarEmail.classList.remove('hide');
  }
});

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
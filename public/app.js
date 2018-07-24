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

function verificarLogin() {

  firebase.auth().onAuthStateChanged(user => {
    console.log('Verificar login...')
    if (user) {
      if (user != null) {
        console.log('logueado');
      }
    } else {
      console.log('no logueado');
    }
  })
}

// Components

const home = Vue.component('home', {
  template:`
    <div class="component-home">

      <p>Home</p>

    </div>
  `,
  created: function () {
    verificarLogin();
  }
});

const login = Vue.component('login', {
  template:`
    <div class="component-login">

      <div class="formulario-login">
        <div>
          <input type="text" v-model="email" placeholder="email">
        </div>

        <div>
          <input type="password" v-model="pass" placeholder="contraseña">
        </div>

        <div class="button" v-on:click="loginGoogle">
            <img src="img/icons8-google-48.png" class="google">
        </div>

        <div class="button" v-on:click="loginFacebook">
            <img src="img/icons8-facebook-40.png" class="facebook">
        </div>

        <div class="button" v-on:click="loginEmail">
          login
        </div>

        <div class="button" v-on:click="registrarEmail">
          registrarse
        </div>

        <div class="button" v-on:click="logout">
          logout
        </div>
      </div>

      <div class="subir-archivos">
        <div>
          <progress value="0" max="100" id="uploader">0%</progress>
        </div>
        <div>
          <input type="file" value="upload" id="fileButton" v-on:change="uploadFile" />
        </div>
        <div class="button" v-on:click="guardarImagen">
          guardar imagen
        </div>
        <div>
          <img :src="image" />
        </div>
      </div>

      <pre id="objeto"></pre>
      <ul id="lista"></ul>
    </div>
  `,
  data: function() {
    return {
      email: '',
      pass: '',
      image: 'img/icons8-picture-512.png',
      fileImage: ''
    }
  },
  methods: {
    loginEmail: function() {
      var promise = firebase.auth().signInWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e));
    },
    registrarEmail: function() {
      var auth = firebase.auth();
      var promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e));
      //Si e.message viene nulo no hubo problema de authenticación
    },
    logout: function() {
      firebase.auth().signOut().then(function() {
        console.log('Signout successful!')
      }, function(error) {
        console.log('Signout failed')
      });
    },
    loginGoogle: function() {
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
    },
    loginFacebook: function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('public_profile');

      firebase.auth().signInWithRedirect(provider);

      firebase.auth().getRedirectResult().then(function(authData) {
        console.log('****************')
        console.log(authData);
        console.log('****************')
      }).catch(function(error) {
          console.log(error.code);
          console.log(error.message);
      });
    },
    uploadFile: function(e) {

      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };

      reader.readAsDataURL(file);

      this.fileImage = file;
    },
    guardarImagen: function() {

      var uploader = document.getElementById('uploader');
      var storageRef = firebase.storage().ref('avatar-usuarios/' + this.fileImage.name);
      var task = storageRef.put(this.fileImage);

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
    }
  },
  // Antes de renderear el template
  created: function () {
    verificarLogin();
  },
  // Después de renderear el template
  mounted: function() {
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
  }
});

// Navegación

const routes = [
  { path: '/', component: home },
  { path: '/home', redirect: '/' },
  { path: '/login', component: login }
];

const router = new VueRouter({
  //mode: 'history',
  routes: routes
});

const app = new Vue({
  el: '#app',
  router
});

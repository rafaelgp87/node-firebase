// Navegación
var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : 'views/home.html'
    })
    .when("/login", {
        templateUrl : 'views/login.html'
    })
    .otherwise({redirectTo: '/'});
});

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
    console.log('verificar login')
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
    } else {
      console.log('no logueado');
    }
  })
}

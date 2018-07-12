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

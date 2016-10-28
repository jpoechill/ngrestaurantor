// Start Restaurant app
// Using Angular.js


// var app2 = angular.module("sampleApp", ["firebase"]);
// app2.controller("SampleCtrl", function($scope, $firebaseArray) {
//   var ref = firebase.database().ref();
//   var list = $firebaseArray(ref);
//
//   console.log(list);
// });

// Angular setup
// Define 'phonecatApp' module
var app = angular.module('myRestaurantApp', ['ngRoute', 'firebase', 'ngFacebook']);

app.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script');
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = 'http://connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});

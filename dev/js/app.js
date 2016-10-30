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
     facebookJS.src = 'https://connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
// app.directive('ngEnter', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             if(event.which === 13) {
//                 scope.$apply(function (){
//                     scope.$eval(attrs.ngEnter);
//                 });
//
//                 event.preventDefault();
//             }
//         });
//     };
// });

// Define RestrController
// app.controller('myController', function myController($scope, $routeParams, message) {
//
//   $scope.bird = "Nerd";
//   $scope.sayHello = function () {
//     // alert("Hello, world!");
//     console.log("You clicked me");
//     return "Bird";
//   }
//
//
//
// });
//
//
//
// app.filter("searchquery", function(localizationService) {
//
//   function localization(value) {
//
//     if (localizationService.text && localizationService.text.hasOwnProperty(value)) {
//       return localizationService.text[value];
//     }
//     return value;
//   }
//
//   localization.$stateful = true;
//
//   return localization;
// });

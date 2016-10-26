// Start Restaurant app
// Using Angular.js


var app2 = angular.module("sampleApp", ["firebase"]);
app2.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = firebase.database().ref();
  var list = $firebaseArray(ref);

  console.log(list);
});

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

app.controller('RestrController', function RestrController($scope, $routeParams, message) {
  $scope.restaurants = message;

  // console.log($scope.restaurants);

  for (var i = 0; i < $scope.restaurants.length; i++) {
    // console.log($scope.restaurants[i].name);
  };

  $scope.page = $routeParams;

  $scope.myReview = "Write a review...";

  $scope.addLikes = function (restID) {
    var thisRest = this.restaurants[restID];
    console.log(thisRest.liked);
    // thisRest.likes=100;

    if (thisRest.liked == false) {
        thisRest.likes++;
        thisRest.liked = true;
        this
    }
  };

  $scope.currentUser = "Jamaica Les Denardo"

  $scope.currentRating = 0;

  $scope.showReviewStars = function (num) {
    var stars = "";
    var num = Math.round(num);

    for (var i = 0; i < num; i++) {
      stars += "★";
    };

    for (var i = 0; i < (5-num); i++) {
      stars += "☆";
    };

    return stars;
  };

  $scope.updateAvgRatings = function () {
    for (var i = 0; i < $scope.restaurants.length; i++) {
      var thisRestRating;
      var currentSum = 0;
      for (var t = 0; t < $scope.restaurants[i].reviews.length; t++) {
        currentSum = currentSum + $scope.restaurants[i].reviews[t].rating;
      }

      thisRestRating = currentSum / $scope.restaurants[i].reviews.length;
      $scope.restaurants[i].rating = parseFloat(thisRestRating).toFixed(1);
    }
  }

  $scope.writeReview = function  (restID) {
    var thisRest = this.restaurants[restID];

    if (thisRest.reviewed == false) {
      thisRest.reviews.push(
        {
          author: $scope.currentUser,
          rating: $scope.currentRating,
          img: "ava-3.png",
          dateposted: "2 minutes ago",
          review: $scope.myReview
        }
      );

      $scope.currentRating = 0;
      thisRest.reviewed = true;
      $scope.updateAvgRatings();
    }

    // alert("Thank you for the review!");
  };

  $scope.getRestID = function (name) {
    var thisID;

    for (var i = 0; i < $scope.restaurants.length; i++) {
      if (name == $scope.restaurants[i].link) {
        thisID = i;
      }
    };

    return thisID;
  }

  var init = function () {
   $scope.updateAvgRatings();
  };

  init();
});

app.controller('DemoCtrl', function DemoCtrl($scope, $facebook, $timeout) {
  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      $scope.refresh();
    });
  }

  $scope.logout = function() {
    $scope.isLoggedIn = false;
    $scope.welcomeMsg = "Please log in ...";
    $scope.usrProfilePicture = "";
    $facebook.logout().then(function() {
      $scope.refresh();
    });
  }

  function fetchProfilePic(userid) {
    $facebook.api("/" + userid + "/picture?type=large").then(
      function(response) {
        $scope.usrProfilePicture = response.data.url;
        $scope.isLoggedIn = true;
      },
      function(err) {
        console.log("Could not fetch profile picture.");
      });
  }

  $scope.socialLogoUrl = "img/facebook.png";

  $scope.refresh = function () {
    $facebook.api("/me").then(
      function(response) {
        $scope.welcomeMsg = "Welcome, " + response.name;
        console.log(response);
        fetchProfilePic(response.id);
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in ...";
      });
      console.log("Hello");
  }

    $facebook.getLoginStatus(function (message) {
      // console.log(message);
    });
    // alert($scope.isLoggedIn);
    $scope.login();
    $scope.refresh();
});

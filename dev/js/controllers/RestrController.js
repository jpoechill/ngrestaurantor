// Define RestrController
app.controller('RestrController', function RestrController($scope, $routeParams, message, hexafy) {
  $scope.restaurants = message;

  $scope.isSignedIn = hexafy.getSignedIn();
  // console.log($scope.restaurants);

  $scope.getAvatar = hexafy.getUrl();

  for (var i = 0; i < $scope.restaurants.length; i++) {
    // console.log($scope.restaurants[i].name);
  };

  $scope.bird = "Nerd";
  $scope.sayHello = function () {
    // alert("Hello, world!");
    console.log("You clicked me");
    return "Bird";
  }

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

  $scope.currentUser = hexafy.getUserName();

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
          img: $scope.getAvatar,
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

// Define RestrController
app.controller('RestrController', ['$scope', '$routeParams', 'message', 'hexafy', '$facebook', function RestrController($scope, $routeParams, message, hexafy, $facebook) {
  $scope.restaurants = message;
  $scope.isSignedIn = hexafy.getSignedIn;
  $scope.getAvatar = hexafy.getUrl;

  $scope.login = function() {
    $facebook.login().then(function() {
      hexafy.signIn();
      $scope.refresh();
    });
  }

  function fetchProfilePic(userid) {
    $facebook.api("/" + userid + "/picture?type=large").then(
      function(response) {
        $scope.usrProfilePicture = response.data.url;
        $scope.changeUrl(response.data.url);
        $scope.isLoggedIn = true;
      },
      function(err) {
        console.log("Could not fetch profile picture.");
      });
  }

  $scope.myFunction = function () {
    alert("Say bloo");
  }

  $scope.refresh = function () {
    $facebook.api("/me").then(
      function(response) {
        $scope.welcomeMsg = "Welcome, " + response.name;
        // Uncomment below for live mode
        // hexafy.setUserName(response.name);
        hexafy.setUserName('Poamrong Rith');
        // console.log(hexafy.getUserName());
        $scope.changeUrl('https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/14433090_10155342528024358_2772040946477423605_n.jpg?oh=5e7357bd902e31b762b30a1b5b721e4d&oe=588A8038');
        // Uncomment below for live mode
        // fetchProfilePic(response.id);
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in ...";
      });
  }

  $scope.changeUrl = function (input) {
    return hexafy.changeUrl(input);
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

  $scope.currentUser = hexafy.getUserName;

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
          author: $scope.currentUser(),
          rating: $scope.currentRating,
          img: $scope.getAvatar(),
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
}]);

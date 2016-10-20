// Define controller
app.controller('PhoneListController', ['$scope', '$routeParams', function PhoneListController($scope, $routeParams) {
  $scope.page = $routeParams;

  $scope.myReview = "Write a review...";

  $scope.addLikes = function (restID) {
    var thisRest = this.phones[restID];
    if (thisRest.liked == false) {
        thisRest.likes++;
        thisRest.liked = true;
    }
  };

  $scope.thisRating = "";

  $scope.currentUser = "Jamaica Les Denardo"

  $scope.currentRating = 0;

  $scope.showCurrentRating = function (numRating) {
    var thisManyStars = $scope.showStars(numRating);
    return thisManyStars;
  }

  $scope.clickedStars = function () {
    // var currentRating = $scope.currentRating;
    // alert("You clicked me");
    if ($scope.currentRating < 5) {
      $scope.currentRating = $scope.currentRating + 1;
    } else {
      $scope.currentRating = 0;
    }
  };

  $scope.showStars = function (num) {
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
    for (var i = 0; i < $scope.phones.length; i++) {
      var thisRestRating;
      var currentSum = 0;
      for (var t = 0; t < $scope.phones[i].reviews.length; t++) {
        currentSum = currentSum + $scope.phones[i].reviews[t].rating;
      }

      thisRestRating = currentSum / $scope.phones[i].reviews.length;
      $scope.phones[i].rating = parseFloat(thisRestRating).toFixed(1);
    }
  }

  $scope.sayHello = function () {
    alert("Hello, from app.!");
  }

  $scope.writeReview = function  (restID) {
    var thisRest = this.phones[restID];

    if (thisRest.reviewed == false) {
      thisRest.reviews.unshift(
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

    alert("Thank you for the review!");
  };

  $scope.getRestID = function (name) {
    var thisID;

    for (var i = 0; i < $scope.phones.length; i++) {
      if (name == $scope.phones[i].link) {
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

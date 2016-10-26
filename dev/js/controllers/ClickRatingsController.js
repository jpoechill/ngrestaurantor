app.controller('ClickRatingsController', ['$scope', function ClickRatingsController($scope) {
  $scope.showCurrentRating = function (numRating) {
    var thisManyStars = $scope.showThisManyStars(numRating);
    return thisManyStars;
  }

  $scope.currentRating = 0;
  $scope.lastClicked = 1;

  $scope.clickedStars = function (thisClicked) {
    if ($scope.lastClicked == thisClicked) {
      $scope.lastClicked = thisClicked;
      $scope.currentRating = $scope.currentRating +1;

      if ($scope.currentRating > 5) {
        $scope.currentRating = 0;
      }
    } else {
      $scope.lastClicked = thisClicked;
      $scope.currentRating = thisClicked;
    }
  };

  $scope.showStars = function (thisIndex) {
    for (var i = 1; i <= 5; i++) {
      if (thisIndex <= $scope.currentRating) {
        return  "★";
      } else {
        return  "☆";
      }
    }
  };

  $scope.showThisManyStars = function (num) {
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
}]);

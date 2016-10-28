// Define Login Controller
app.controller('LoginController', function ($scope, $facebook, hexafy, $timeout) {
  $scope.isLoggedIn = false;
  $scope.socialLogoUrl = "img/facebook.png";
  $scope.usrName = "";

  $scope.login = function() {
    $facebook.login().then(function() {
      hexafy.signIn();
      $scope.refresh();
    });
  }

  $scope.logout = function() {
    $scope.isLoggedIn = false;
    $scope.welcomeMsg = "Please log in ...";
    $scope.usrProfilePicture = "";
    hexafy.signOut;
    $facebook.logout().then(function() {
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

  $scope.refresh = function () {
    $facebook.api("/me").then(
      function(response) {
        $scope.welcomeMsg = "Welcome, " + response.name;
        // console.log(response);
        hexafy.setUserName(response.name);
        fetchProfilePic(response.id);
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in ...";
      });
  }

  $scope.getUrl = hexafy.getUrl;

  $scope.changeUrl = function (input) {
    return hexafy.changeUrl(input);
  }

  $scope.refresh();
});

// Define Login Controller
app.controller('LoginController', function ($scope, $facebook, hexafy, $timeout) {
  $scope.isLoggedIn = false;
  $scope.socialLogoUrl = "img/facebook.png";
  // $scope.url = hexafy.getAvatar();
  // $scope.url2 = "/img/avatar/ava-2.png";
  $scope.usrName = "";

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
        $scope.changeUrl(response.data.url);
        // $scope.url = $scope.url2;
        // console.log($scope.url);
        // console.log($scope.usrProfilePicture);
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
        fetchProfilePic(response.id);
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in ...";
      });
  }

  // $scope.bird = hexafy.returnVal();
  // console.log($hexafy.myFunc("Blue is the shoe"));
  // $scope.myFunc = function() {
  //   // hexafy.sayHello();
  //   hexafy.changeServiceVal();
  // }
  //
  // console.log(hexafy.foo);
  //
  //
  $scope.getUrl = hexafy.getUrl;

  $scope.changeUrl = function (input) {
    return hexafy.changeUrl(input);
    // return "/img/avatar/blank.png";
  }

  // // hexafy.changeServiceVal();
  // $scope.$watch('hexafy.foo', function (newVal, oldVal, scope) {
  // if(newVal) {
  //   scope.foo = newVal;
  //   console.log("Change");
  //   }
  // });
  // $scope.aService = hexafy;
  // $scope.foo = aService.foo;
  //
  // console.log("This is a value in the service: " + $scope.foo);
  // hexafy.showVal();
  // hexafy.changeServiceVal();
  // hexafy.showVal();

  // $scope.$watch('aService.foo', function (newVal, oldVal, scope) {
  //     if(newVal) {
  //       scope.foo = newVal;
  //     }
  //   });

  // $scope.$watch( 'url', function (newVal, oldVal) {
  //   // $scope.url = newVal;
  //   console.log(oldVal);
  //   console.log(newVal);
  //   console.log("Changed");
  // }, true);

  // alert($scope.isLoggedIn);
  // $scope.login();
  $scope.refresh();
});

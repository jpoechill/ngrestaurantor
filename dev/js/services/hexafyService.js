// Define Hexafy
app.service('hexafy', function() {
  var service = {
    myUrl: "img/avatar/blank.png",
    myUserName: "123",
    isSignedIn: false,
    getUrl: function () {
      return service.myUrl;
    },
    getUserName: function () {
      return service.myUserName;
    },
    setUserName: function (input) {
      service.myUserName = input;
    },
    changeUrl: function (input) {
      service.myUrl = input;
    },
    getSignedIn: function () {
      return service.isSignedIn;
    },
    signIn: function () {
      service.isSignedIn = true;
    },
    signOut: function () {
      service.isSignedIn = false;
      console.log("You've signed out!");
      service.myUrl = "img/avatar/blank.png";
    }
  };

  return service;
});

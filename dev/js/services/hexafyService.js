// Define Hexafy
app.service('hexafy', function() {
  // var myServiceVal = "Bird";
  // var myUrl = "/img/avatar/blank.png";
  // var isSignedIn = "Blue";
  var service = {
    myUrl: "/img/avatar/blank.png",
    myUserName: "",
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
    }
  };
  //
  // this.isSignedInFunc = function () {
  //   return isSignedIn;
  // };

  // this.signIn = function () {
  //   isSignedIn = true;
  // }
  //
  // this.signOut = function () {
  //   isSignedIn = false;
  // }

  //
  // // this.getAvatar = function () {
  // //   return myUrl;
  // // }
  // //
  // // this.returnVal = function() {
  // //   return myServiceVal;
  // // }
  // //
  // // this.showVal = function() {
  // //   console.log(myServiceVal);
  // // }
  // //
  // service.changeServiceVal = function () {
  //   // myServiceVal += " is the word.";
  //   console.log("Hello");
  //   console.log(service.foo);
  //   service.foo = "I've just changed";
  // }
  //
  // this.sayHello = function () {
  //   console.log('hello');
  //   myUrl = "/img/avatar/ava-2.png";
  //   console.log(myUrl);
  // };

  return service;
});

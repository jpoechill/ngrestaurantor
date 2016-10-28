// Define Hexafy
app.service('hexafy', function() {
  // var myServiceVal = "Bird";
  var myUrl = "/img/avatar/blank.png";

  // var service = {
  //   foo: "Bird"
  // };

  this.getUrl = function () {
    return myUrl;
  }

  this.changeUrl = function (input) {
    myUrl = input;
    // console.log("Url changed");
  }
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

  // return service;
});

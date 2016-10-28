// Define Hexafy
app.service('restaurantListService', function() {
  // var myServiceVal = "Bird";
  var myUrl = "/img/avatar/blank.png";


  this.getUrl = function () {
    return myUrl;
  }

  this.changeUrl = function (input) {
    myUrl = input;
    // console.log("Url changed");
  }
});

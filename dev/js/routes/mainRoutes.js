// Routes file
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller : "RestrController",
        resolve: {
            'message': function($http){
            return $http.get('https://restaurantor-26d08.firebaseio.com/.json')
            .then(function(response){
              // console.log(response.data);
              return response.data;
            });
          }
        }
    })
    // .when("/login", {
    //     templateUrl : "templates/login.html",
    //     controller: "LoginController"
    // })
    // .when("/logout", {
    //     templateUrl : "templates/main.html",
    //     controller : "RestrController",
    //     resolve: {
    //         'message': function($http){
    //         return $http.get('https://restaurantor-26d08.firebaseio.com/.json')
    //         .then(function(response){
    //           return response.data;
    //         });
    //       }
    //     }
    // })
    .when("/:pagename", {
        templateUrl : "templates/item.html",
        controller : "RestrController",
        resolve: {
            'message': function($http){
            return $http.get('https://restaurantor-26d08.firebaseio.com/.json')
            .then(function(response){
              return response.data;
            });
          }
        }
    });
});

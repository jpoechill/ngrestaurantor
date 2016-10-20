// Routes file
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html"
    })
    .when("/:pagename", {
        templateUrl : "templates/item.html",
    });
});

// Start Restaurant app
// Using Angular.js

// Angular setup
// Define 'phonecatApp' module
var app = angular.module('myRestaurantApp', ['ngRoute']);

// Main page controller
// Search and filter controller
// Item page controller
// Item page new post controller
// PhoneListController

// Define 'RestrController' controller
app.controller('RestrController', ['$scope', '$routeParams', function RestrController($scope, $routeParams) {
  $scope.page = $routeParams;

  $scope.pagelink = function () {
    // console.log("Hello, world@!");

    if ($scope.isSignedIn == false) {
      console.log("You are signed in.");
      alert("Thank you for signing in.");
      $scope.isSignedIn = true;
    } else {
      console.log("You are signed out.");
      $scope.isSignedIn = false;
    }
  };

  $scope.pagelink.signedIn = function () {
    if ($scope.isSignedIn == false) {
      return "Sign in";
    } else {
      return "Sign out";
    }
  }

  $scope.pagelink.signedInPicture = function () {
    if ($scope.isSignedIn == false) {
      return "/img/avatar/blank.png";
    } else {
      return "/img/avatar/ava-4.png";
    }
  }

  $scope.isSignedIn = false;

  $scope.myReview = "Write a review...";

  $scope.addLikes = function (restID) {
    var thisRest = this.restaurants[restID];
    console.log(thisRest.liked);
    // thisRest.likes=100;

    if (thisRest.liked == false) {
        thisRest.likes++;
        thisRest.liked = true;
        this
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
    for (var i = 0; i < $scope.restaurants.length; i++) {
      var thisRestRating;
      var currentSum = 0;
      for (var t = 0; t < $scope.restaurants[i].reviews.length; t++) {
        currentSum = currentSum + $scope.restaurants[i].reviews[t].rating;
      }

      thisRestRating = currentSum / $scope.restaurants[i].reviews.length;
      $scope.restaurants[i].rating = parseFloat(thisRestRating).toFixed(1);
    }
  }

  $scope.writeReview = function  (restID) {
    var thisRest = this.restaurants[restID];

    if (thisRest.reviewed == false) {
      thisRest.reviews.push(
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

    // alert("Thank you for the review!");
  };

  $scope.getRestID = function (name) {
    var thisID;

    for (var i = 0; i < $scope.restaurants.length; i++) {
      if (name == $scope.restaurants[i].link) {
        thisID = i;
      }
    };

    return thisID;
  }

  $scope.restaurants = [
    {
      name: "Battambang",
      rating: 4.2,
      address: "850 Broadway, Oakland, CA 94607",
      blurb: "When Battambang opened in Oakland in 1993, it was one of the very few Cambodian restaurants in the Bay Area. Now, more than 10 years later, it still is -- and it's also a pleasant place to get a sampling of the flavors of the Southeast Asian country. Battambang occupies a well-lit row of remodeled storefronts on the edge of Oakland's Chinatown. Walls are painted in warm pumpkin hues, lit by wall sconces and decorated with precisely spaced small framed paintings and an assortment of Cambodian artifacts... ",
      photo: "",
      liked: false,
      likes: 7,
      link: "battambang",
      reviewed: false,
      hours: {
        mond: "8pm - 8pm",
        tues: "8pm - 8pm",
        wedn: "8pm - 8pm",
        thur: "8pm - 8pm",
        frid: "8pm - 8pm",
        satr: "8pm - 10pm",
        sund: "8pm - 10pm",
      },
      reviews: [
        {
          author: "Srikant Ramakrishnan",
          rating: 5,
          img: "ava-1.png",
          dateposted: "1 day ago",
          review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
        },
        {
          author: "David",
          rating: 5,
          img: "ava-2.png",
          dateposted: "1 day ago",
          review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
        },
        {
          author: "Miles",
          rating: 3,
          img: "ava-3.png",
          dateposted: "4 day ago",
          review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
        },
        {
          author: "Nelson Wong",
          rating: 4,
          img: "ava-4.png",
          dateposted: "1 week ago",
          review: "The cambodian restaurant with the funny name. Good curries, solid papaya salads if your tired of same old chinese, korean, thai options give the bang a try."
        },
        {
          author: "Paul Parker",
          rating: 5,
          img: "ava-5.png",
          dateposted: "1 month ago",
          review: "They are very pleasant and the special skewers where very good. It would be much better with a soda fountain and more selection of drinks and more atmosphere."
        },
        {
          author: "Lucy Wu",
          rating: 4,
          img: "ava-6.png",
          dateposted: "3 months ago",
          review: "Went there for a late lunch and the place had more flies than people. Menu and furniture feels a bit worn. Food was good but not spectacular. Maybe better for dinner."
        }
      ],
    },
    {
      name: "Cosecha",
      rating: 4.3,
      address: "907 Washington St, Oakland, CA 94607",
      blurb: "Those who find their way to our location in Old Oakland experience the communion of California and Mexico and will find comfort in our home-style offerings. We prepare everything from scratch every day, including handmade tortillas, pastries, and complex traditional entrees, as well as seasonal salads and soups. We strive to provide high quality, affordable meals that can be eaten inside or on the go. We serve California wines, beers, and ingredients that use an abundance of high quality, local products.",
      photo: "",
      liked: false,
      link: "cosecha",
      reviewed: false,
      likes: 8,
      hours: {
        mond: "8pm - 8pm",
        tues: "8pm - 8pm",
        wedn: "8pm - 8pm",
        thur: "8pm - 8pm",
        frid: "8pm - 8pm",
        satr: "8pm - 10pm",
        sund: "8pm - 10pm",
      },
      reviews: [
        {
          author: "Srikant Ramakrishnan",
          rating: 5,
          img: "ava-1.png",
          dateposted: "1 day ago",
          review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
        },
        {
          author: "David",
          rating: 5,
          img: "ava-2.png",
          dateposted: "1 day ago",
          review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
        },
        {
          author: "Miles",
          rating: 5,
          img: "ava-3.png",
          dateposted: "4 day ago",
          review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
        },
        {
          author: "Nelson Wong",
          rating: 5,
          img: "ava-4.png",
          dateposted: "1 week ago",
          review: "The cambodian restaurant with the funny name. Good curries, solid papaya salads if your tired of same old chinese, korean, thai options give the bang a try."
        },
        {
          author: "Paul Parker",
          rating: 2,
          img: "ava-5.png",
          dateposted: "1 month ago",
          review: "They are very pleasant and the special skewers where very good. It would be much better with a soda fountain and more selection of drinks and more atmosphere."
        },
        {
          author: "Lucy Wu",
          rating: 5,
          img: "ava-6.png",
          dateposted: "3 months ago",
          review: "Went there for a late lunch and the place had more flies than people. Menu and furniture feels a bit worn. Food was good but not spectacular. Maybe better for dinner."
        },
        {
          author: "Naomi Lewis",
          rating: 4,
          img: "ava-1.png",
          dateposted: "4 months ago",
          review: "The owners are very nice they treat me like family! Very happy that I found a restaurant similar to my grandmothers cooking. A++++ "
        }
      ],
    },
    {
      name: "Le Cheval",
      rating: 4.4,
      address: "1007 Clay St, Oakland, CA 94607",
      blurb: "Since 1985, Le Cheval has been at the forefront of introducing the flavors of Asia to Oakland. Today, we proudly serve our family recipes in Old Oakland and in Walnut Creek. Our style of food brings together the flavors of French, Chinese and Southeast Asian cooking. Each of our recipes includes a balanced combination of fresh ingredients and exotic spices to bring out the best flavor in every dish. We strongly believe that the food you eat is just as important as who you eat it with and we strive to create an environment that makes each gathering special. Enjoy! ",
      photo: "",
      link: "lecheval",
      reviewed: false,
      liked: false,
      likes: 9,
      hours: {
        mond: "8pm - 8pm",
        tues: "8pm - 8pm",
        wedn: "8pm - 8pm",
        thur: "8pm - 8pm",
        frid: "8pm - 8pm",
        satr: "8pm - 10pm",
        sund: "8pm - 10pm",
      },
      reviews: [
        {
          author: "Srikant Ramakrishnan",
          rating: 4,
          img: "ava-1.png",
          dateposted: "1 day ago",
          review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
        },
        {
          author: "David",
          rating: 5,
          img: "ava-2.png",
          dateposted: "1 day ago",
          review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
        },
        {
          author: "Miles",
          rating: 4,
          img: "ava-3.png",
          dateposted: "4 day ago",
          review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
        },
        {
          author: "Nelson Wong",
          rating: 4,
          img: "ava-4.png",
          dateposted: "1 week ago",
          review: "The cambodian restaurant with the funny name. Good curries, solid papaya salads if your tired of same old chinese, korean, thai options give the bang a try."
        },
        {
          author: "Paul Parker",
          rating: 2,
          img: "ava-5.png",
          dateposted: "1 month ago",
          review: "They are very pleasant and the special skewers where very good. It would be much better with a soda fountain and more selection of drinks and more atmosphere."
        },
        {
          author: "Lucy Wu",
          rating: 4,
          img: "ava-6.png",
          dateposted: "3 months ago",
          review: "Went there for a late lunch and the place had more flies than people. Menu and furniture feels a bit worn. Food was good but not spectacular. Maybe better for dinner."
        }
      ],
    },
    {
      name: "Tamarindo",
      rating: 4.3,
      address: "468 8th St, Oakland, CA 94607",
      blurb: "Gloria Dominguez, a native from Mixtlan in the state of Jalisco, opened Tamarindo Antojeria Mexicana in 2005 with her son Alfonso Dominguez. Gloria happily introduces an old concept into a new experience  of eating Mexican food:  small cravings (Antojitos)  “I had a simple goal - no fusion, just traditional Mexican cuisine that one can find thoughout Mexico”. Another important goal was bringing the social aspect back into dining. She was surprised to find the Mexican dining experience differed here in the US, with individual plates rather than sharing small bites as she would in Mexico. ",
      photo: "",
      link: "tamarindo",
      reviewed: false,
      liked: false,
      likes: 10,
      hours: {
        mond: "8pm - 8pm",
        tues: "8pm - 8pm",
        wedn: "8pm - 8pm",
        thur: "8pm - 8pm",
        frid: "8pm - 8pm",
        satr: "8pm - 10pm",
        sund: "8pm - 10pm",
      },
      reviews: [
        {
          author: "Srikant Ramakrishnan",
          rating: 5,
          img: "ava-1.png",
          dateposted: "1 day ago",
          review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
        },
        {
          author: "David",
          rating: 4,
          img: "ava-2.png",
          dateposted: "1 day ago",
          review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
        },
        {
          author: "Miles",
          rating: 5,
          img: "ava-3.png",
          dateposted: "4 day ago",
          review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
        }
      ],
    },
    {
      name: "Cafe 817",
      rating: 3.3,
      address: "817 Washington St, Oakland, CA 94607",
      blurb: "Here we are. At a place that was created to remind us of the Old World in the middle of a city that has as much diversity as any European metropolis. We are a café and restaurant with a neighborhood feel in Oakland’s vibrant downtown business district. Here you will enjoy a cup of legendary coffee and food as comforting as that you\’d expect from your grandmother’s kitchen. Caffe 817 is a place where we come to gather, visit, discuss, and laugh. And eat! We\’re open for breakfast and lunch throughout the week, and brunch on the weekends. ",
      photo: "",
      link: "cafe817",
      reviewed: false,
      liked: false,
      likes: 10,
      hours: {
        mond: "8pm - 8pm",
        tues: "8pm - 8pm",
        wedn: "8pm - 8pm",
        thur: "8pm - 8pm",
        frid: "8pm - 8pm",
        satr: "8pm - 10pm",
        sund: "8pm - 10pm",
      },
      reviews: [
        {
          author: "Srikant Ramakrishnan",
          rating: 5,
          img: "ava-1.png",
          dateposted: "1 day ago",
          review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
        },
        {
          author: "David",
          rating: 5,
          img: "ava-2.png",
          dateposted: "1 day ago",
          review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
        },
        {
          author: "Miles",
          rating: 5,
          img: "ava-3.png",
          dateposted: "4 day ago",
          review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
        },
        {
          author: "Nelson Wong",
          rating: 5,
          img: "ava-4.png",
          dateposted: "1 week ago",
          review: "The cambodian restaurant with the funny name. Good curries, solid papaya salads if your tired of same old chinese, korean, thai options give the bang a try."
        },
        {
          author: "Paul Parker",
          rating: 2,
          img: "ava-5.png",
          dateposted: "1 month ago",
          review: "They are very pleasant and the special skewers where very good. It would be much better with a soda fountain and more selection of drinks and more atmosphere."
        }
      ],
    },
    {
        name: "Authentic Bagel Company",
        rating: 5,
        address: "463 2nd St., Oakland, CA 94607",
        blurb: "From Italian restaurants in Providence, they moved to managing and cooking in restaurants in Berkeley and Portland, then to Monaghan’s on the Hill in the Oakland Hills. For a Mother’s Day brunch menu one year, they decided to offer housemade bagel sandwiches, which were a hit. For the Sunday-afternoon football crowd, more bagel sandwiches, until customers started asking where they got their bagels, and could they buy a dozen to take home? ",
        photo: "",
        link: "authenticbagelcompany",
        reviewed: false,
        liked: false,
        likes: 10,
        hours: {
          mond: "8pm - 8pm",
          tues: "8pm - 8pm",
          wedn: "8pm - 8pm",
          thur: "8pm - 8pm",
          frid: "8pm - 8pm",
          satr: "8pm - 10pm",
          sund: "8pm - 10pm",
        },
        reviews: [
          {
            author: "Srikant Ramakrishnan",
            rating: 1,
            img: "ava-1.png",
            dateposted: "1 day ago",
            review: "Loved the noodles, Shandong special dumplings were just ok. Had to wait about 1/2 hour, but we could watch the noodles being made and cooked while we waited. Inside is crowded and busy, but a happy vibe. "
          },
          {
            author: "David",
            rating: 4,
            img: "ava-2.png",
            dateposted: "1 day ago",
            review: "The best fried rice ever. I love this place so much and tell all of my friends. The dumplings are very good whether you choose to dine in or out or even grab a bag to prepare at home. I would suggest making a reservation if your party is more than 4 people on a weekend night. "
          },
          {
            author: "Miles",
            rating: 3,
            img: "ava-3.png",
            dateposted: "4 day ago",
            review: "First time with Cambodian food, and I'm hooked. Similar to Thai and Malaysian, plus they do kebobs. Great food, excellent value; we will be back. "
          },
          {
            author: "Nelson Wong",
            rating: 5,
            img: "ava-4.png",
            dateposted: "1 week ago",
            review: "The cambodian restaurant with the funny name. Good curries, solid papaya salads if your tired of same old chinese, korean, thai options give the bang a try."
          }
       ],
    }
  ];

  var init = function () {
   $scope.updateAvgRatings();
  };

  init();
}]);

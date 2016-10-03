// App for installing, utilizing IndexedDB (with Dexie.js)

// Define your database
var db = new Dexie("bartorDB");
db.version(1).stores({
    trains: 'rout'
});

// Open db
db.open().catch(function (e) {
    console.log("Open failed: " + e);
});

function loadTrainsInfoFromDB() {
    var count = 0;
    // $("#dbDataTable").empty();

    // db.trains
    //     .each(function(routName) {
    //         var rout = routName;
    //         count++;

    //         var thisHTMLString = "<tr><th scope=\"row\">" + count + "</th><td>" + rout.rout + "</td><td>" + rout.orig + "</td><td>"
    //             + rout.dest + "</td><td>"+ rout.fare + "</td><td>" + rout.durr + "</td><td>" + rout.times[0].departs + ", " + rout.times[0].arrives + "</td></tr>";
    //         $('#dbDataTable').append(thisHTMLString);
    //     }
    // );

    // $('#thisBartDataTable').empty();
    // db.trains
    //     .each(function(routName) {
    //         var rout = routName;
    //         count++;

    //         var thisHTMLString = "<tr><th scope=\"row\">" + count + "</th><td>" + rout.times[0].departs + "</td><td>" + rout.times[0].arrives + "</td>";
    //         $('#thisBartDataTable').append(thisHTMLString);
    //         // var thisHTMLString = "<tr><th scope=\"row\">" + count + "</th><td>" + rout.rout + "</td><td>" + rout.orig + "</td><td>"
    //         //     + rout.dest + "</td><td>"+ rout.fare + "</td><td>" + rout.durr + "</td><td>" + rout.times[0].departs + ", " + rout.times[0].arrives + "</td></tr>";
    //         // $('#dbDataTable').append(thisHTMLString);
    //     }
    // );
};

function sayHello() {
    console.log("Hello, world");
}

function addNewTrainInfo (name, orig, dest, fare, duration, times) {
    db.trains.put(
        {
            rout: name,
            orig: orig,
            dest: dest,
            fare: fare,
            durr: duration,
            times: times
        }
    );
}
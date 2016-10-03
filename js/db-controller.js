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

function loadTrainsInfoFromDB(thisRout) {
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

    console.log("Matching");
    db.trains
        .each(function(routName) {
            var rout = routName;

            if (rout.rout == thisRout){
                count++;
                // console.log(count);
                console.log("Match found");

                $('#thisBartDataTable').empty();

                for (var i = 0; i < rout.times.length; i++) {
                    var thisHTMLString = "<tr><th scope=\"row\">" + count + "</th><td>" + rout.times[0].departs + "</td><td>" + rout.times[0].arrives + "</td><tr>";
                    $('#thisBartDataTable').append(thisHTMLString);
                }

                // Update DOM from DB info
                document.getElementById('fare').innerHTML = "$ " + rout.fare;
                document.getElementById('duration').innerHTML = rout.durr;
            }
        }
    );
};

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
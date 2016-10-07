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
    // console.log("Hello");
    db.trains
        .each(function(routName) {
            var rout = routName;

            if (rout.rout == thisRout){
                // Match found
                $('#thisBartDataTable').empty();

                for (var i = 0; i < rout.times.length; i++) {
                    count++
                    var thisHTMLString = "<tr><th scope=\"row\">" + count + "</th><td>" + rout.times[i].departs + "</td><td>" + rout.times[i].arrives + "</td><tr>";
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

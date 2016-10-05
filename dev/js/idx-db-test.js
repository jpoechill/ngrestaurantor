// App-3 for installing, utilizing IndexedDB

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("MyTranportationDB", 2);

// Create the schema if not already created
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var index = store.createIndex("NameIndex", ["route.departing", "route.arriving"]);
};

open.onsuccess = function(event) {
    // Start a new transaction
    var db = open.result;
    // console.log(event);
    console.log(db);

    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");

    // Add some data
    store.put({id: 12345, route: {departing: "West Oakland", arriving: "Embarcadero"}, age: 42});
    store.put({id: 67890, route: {departing: "West Oakland", arriving: "Montgomery"}, age: 35});

    // Query the data
    var getJohn = store.get(12345);
    var getBob = index.get(["Montgomery", "West Oakland"]);

    // getJohn.onsuccess = function() {
    //     console.log(getJohn.result.route.departing);  // => "West Oakland"
    // };

    // getBob.onsuccess = function() {
    //     console.log(getBob);   // => "Bob"
    // };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
};

open.onerror = function(event) {
  console.log('There was an error requesting the database.');
};
// JS doc for Transportation App (BART)
// API Key: QR4P-5A9K-9K3T-DWE9
// Test link: http://api.bart.gov/api/bsa.aspx?cmd=count&key=QR4P-5A9K-9K3T-DWE9
// https://api.bart.gov/api/sched.aspx?cmd=depart&orig=woak&dest=mont&date=now&key=QR4P-5A9K-9K3T-DWE9&b=4&a=4&l=1'
var API_Key = "QR4P-5A9K-9K3T-DWE9";

$(document).ready(function(){
    // fetchBartInfo();
    initCookies();

    fetchBartTrains();

    fetchDefaults();
    // loadTrainsInfoFromDB();
});

function fetchDefaults() {
    var origDropdown = $('#dropDownTrainInfo');
    var destDropdown = $('#dropDownTrainInfoSecond');

    origDropdown.text(stationsJSON['woak']);
    origDropdown.val(stationsJSON['woak']);
    destDropdown.text(stationsJSON['mont']);
    destDropdown.val(stationsJSON['mont']);

    // Defaults
    loadTrainsInfoFromDB('woakmont');
    fetchBartDepartures("woak", "mont");
};

// Basic API Info
function fetchBartInfo () {
    $.ajax({
        cache: true,
        url: 'https://api.bart.gov/api/bsa.aspx?cmd=count' + '&key=' + API_Key,
        error: function(data) {
            console.log("There was an error retreiving the JSON.");
        },
        success: function(data) {
            var xmlDoc = data;

            var date = xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue;
            var time = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
            var traincount = xmlDoc.getElementsByTagName("traincount")[0].childNodes[0].nodeValue;

            document.getElementById("bartDate").innerHTML = date;
            document.getElementById("bartTime").innerHTML = time;
            document.getElementById("bartTrainCount").innerHTML = traincount;
        },
    });
}

// Populate dropdowns
function fetchBartTrains () {
    $.ajax({
        cache: true,
        url: 'https://api.bart.gov/api/stn.aspx?cmd=stns' + '&key=' + API_Key,
        error: function(data) {
            console.log("There was an error retreiving the JSON. Using back up.");

            $(".dropdown-menu").empty();

            for ( stationAbbrev in stationsJSON ) {
                $('#dropdownListTrainInfo').append("<li><a id=\"" + stationAbbrev + "\" class=\"dropdown-item\" href=\"#\">" + stationsJSON[stationAbbrev] + "</a></li>");
                $('#dropdownListTrainInfoSecond').append("<li><a id=\"" + stationAbbrev + "\" class=\"dropdown-item\" href=\"#\">" + stationsJSON[stationAbbrev] + "</a></li>");
            }
        },
        success: function(data) {
            var xmlDoc = data;
            var x = xmlDoc.getElementsByTagName('station');
            var xLen = x.length;

            $(".dropdown-menu").empty();

            for (var i = 0; i < xLen; i++) {
                var thisTrainHere = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                var thisTrainKey;

                for (stationAbbrev in stationsJSON) {
                    if (stationsJSON[stationAbbrev] == thisTrainHere) {
                        thisTrainKey = stationAbbrev;
                    };
                }

                $('#dropdownListTrainInfo').append("<li><a id=\"" + thisTrainKey + "\" class=\"dropdown-item\" href=\"#\">" + thisTrainHere + "</a></li>");
                $('#dropdownListTrainInfoSecond').append("<li><a id=\"" + thisTrainKey + "\" class=\"dropdown-item\" href=\"#\">" + thisTrainHere + "</a></li>");
            }
        },
    });
}

function fetchBartDepartures (orig, dest) {
    $.ajax({
        cache: true,
        url: 'https://api.bart.gov/api/sched.aspx?cmd=depart&orig=' + orig + '&dest=' + dest + '&date=now&key=' + API_Key + '&b=4&a=4&l=1',
        error: function(data) {
            console.log("There was an error retreiving the JSON.");
        },
        success: function(data) {
            var xmlDoc = data;
            var x = xmlDoc.getElementsByTagName('trip');

            var thisTrainArray = [];
            var thisOrig = stationsJSON[orig];
            var thisDest = stationsJSON[dest];

            thisRoute = orig + dest;

            // Clear data-table
            $('#thisBartDataTable').empty();

            // Capture fare and duration
            var thisTrainDBFare = x[0].getAttribute("fare");;
            var thisTrainDBDuration = calculateTravelDuration(x[0].getAttribute("origTimeMin").split(" "), x[0].getAttribute("destTimeMin").split(" "));;

            for (var i = 0; i < x.length; i++ ) {
                // Set up vars
                var thisOrigTime = x[i].getAttribute("origTimeMin");
                var thisDestTime = x[i].getAttribute("destTimeMin");
                var thisTrainNum = i + 1;

                // Update DOM
                var thisHTMLString = "<tr><th scope=\"row\">" + thisTrainNum + "</th><td>" + thisOrigTime + "</td><td>" + thisDestTime + "</td>";
                $('#thisBartDataTable').append(thisHTMLString);

                // Update major array
                thisTrainArray.push({id: thisTrainNum, departs: thisOrigTime, arrives: thisDestTime});
            }

            // Update DOM
            document.getElementById('fare').innerHTML = "$ " + thisTrainDBFare;
            document.getElementById('duration').innerHTML = thisTrainDBDuration;

            // Update DB
            addNewTrainInfo(thisRoute, thisOrig, thisDest, thisTrainDBFare, thisTrainDBDuration, thisTrainArray);

            //Update Cookies
            document.cookie = "lastFare=" + thisTrainDBFare;
            document.cookie = "lastDurr=" + thisTrainDBDuration;
            document.cookie = "theseTrains=" + JSON.stringify(thisTrainArray);
        }
    });
}

function calculateTravelDuration (firstTime, secondTime) {
    var thisTrainOrigTimeArr = firstTime;
    var thisTrainDestTimeArr = secondTime;

    var firstTime = thisTrainOrigTimeArr[0].split(":");
    var firstHH = firstTime[0];
    var firstMM = firstTime[1];
    var firstAMPM = thisTrainOrigTimeArr[1];

    var secondTime = thisTrainDestTimeArr[0].split(":");
    var secondHH = secondTime[0];
    var secondMM = secondTime[1];
    var secondAMPM = thisTrainDestTimeArr[1];

    thisTrainDurrTime = secondHH - firstHH;

    if (secondMM - firstMM <= 0) {
        thisTrainDurrTime = secondMM - firstMM + 60;
        thisTrainDurrTime += " mins";
    } else {
        thisTrainDurrTime = secondMM - firstMM;
        thisTrainDurrTime += " mins";
    }

    return thisTrainDurrTime;
}

// Tranlate station names per Bart API
function updateBartDepartures (val1, val2) {
    // Object converter
    var thisStationDepartureAbbrev;
    var thisStationArrivalAbbrev;

    for ( stationAbbrev in stationsJSON ) {
        if (stationsJSON[stationAbbrev] == val1) {
            thisStationDepartureAbbrev = stationAbbrev;
        }
    }

    for ( stationAbbrev in stationsJSON ) {
        if (stationsJSON[stationAbbrev] == val2) {
            thisStationArrivalAbbrev = stationAbbrev;
        }
    }

    fetchBartDepartures(thisStationDepartureAbbrev, thisStationArrivalAbbrev);
}

// Conversion data key
var stationsJSON = {
    "12th": "12th St. Oakland City Center",
    "16th": "16th St. Mission",
    "19th": "19th St. Oakland",
    "24th": "24th St. Mission",
    ashb: "Ashby",
    balb: "Balboa Park",
    bayf: "Bay Fair",
    cast: "Castro Valley",
    civc: "Civic Center/UN Plaza",
    cols: "Coliseum",
    colm: "Colma",
    conc: "Concord",
    daly: "Daly City",
    dbrk: "Downtown Berkeley",
    dubl: "Dublin/Pleasanton",
    deln: "El Cerrito del Norte",
    plza: "El Cerrito Plaza",
    embr: "Embarcadero",
    frmt: "Fremont",
    ftvl: "Fruitvale",
    glen: "Glen Park",
    hayw: "Hayward",
    lafy: "Lafayette",
    lake: "Lake Merritt",
    mcar: "MacArthur",
    mlbr: "Millbrae",
    mont: "Montgomery St.",
    nbrk: "North Berkeley",
    ncon: "North Concord/Martinez",
    oakl: "Oakland Int'l Airport",
    orin: "Orinda",
    pitt: "Pittsburg/Bay Point",
    phil: "Pleasant Hill/Contra Costa Centre",
    powl: "Powell St.",
    rich: "Richmond",
    rock: "Rockridge",
    sbrn: "San Bruno",
    sfia: "San Francisco Int'l Airport",
    sanl: "San Leandro",
    shay: "South Hayward",
    ssan: "South San Francisco",
    ucty: "Union City",
    wcrk: "Walnut Creek",
    wdub: "West Dublin/Pleasanton",
    woak: "West Oakland",
};

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
};

function initCookies() {
  var thisOrig = getCookie("lastOrigCookie");
  var trainsOBJ = getCookie("theseTrains");
  var thisDest = getCookie("lastDestCookie");

  if (thisOrig == "" || thisDest == "" || trainsOBJ == "") {
    return;
  }

  // Populate first dropdown
  $('#dropDownTrainInfo').text(thisOrig);
  $('#dropDownTrainInfo').val(thisOrig);

  // Populate second dropdown
  $('#dropDownTrainInfoSecond').text(thisDest);
  $('#dropDownTrainInfoSecond').val(thisDest);

  // Fare and duration
  var thisFare = getCookie("lastFare");
  document.getElementById('fare').innerHTML = "$ " + thisFare;
  var thisDurr = getCookie("lastDurr");
  document.getElementById('duration').innerHTML = thisDurr;

  // Train times
  $('#thisBartDataTable').empty();
  trainsOBJ = JSON.parse(trainsOBJ);

  for (var i = 0; i < trainsOBJ.length; i++) {
      var thisTrainNum = i + 1;
      var thisHTMLString = "<tr><th scope=\"row\">" + thisTrainNum + "</th><td>" + trainsOBJ[i].departs + "</td><td>" + trainsOBJ[i].arrives + "</td>";
      $('#thisBartDataTable').append(thisHTMLString);
  }

};

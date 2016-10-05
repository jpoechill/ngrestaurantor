// Code for dropdown menu action
var departureDropdownVal = $('#dropDownTrainInfo').text();
var arrivalDropdownVal = $('#dropDownTrainInfoSecond').text();

// Menus class
var menus = $(".dropdown-menu");
menus.on('click', 'li a', function(el) {
    var clickedElement = $(el.currentTarget);
    var updateText = clickedElement.text();
    var updateElement = $(el.currentTarget).closest(".dropdown").find('.btn');

    updateElement.text(updateText);
    updateElement.val(updateText);

    if (updateElement.attr('id') == "dropDownTrainInfo") {
      document.cookie = "lastOrigCookie=" + updateText;
    } else if (updateElement.attr('id') == "dropDownTrainInfoSecond") {
      document.cookie = "lastDestCookie=" + updateText;
    }
});

// First dropdown
var trainInfoMenu = $("#dropdownListTrainInfo");
trainInfoMenu.on('click', 'li a', function(el) {
    var clickedElement = $(el.currentTarget);
    var updateText = clickedElement.text();

    departureDropdownVal = $('#dropDownTrainInfo').text().trim();
    arrivalDropdownVal = $('#dropDownTrainInfoSecond').text().trim();
    if (arrivalDropdownVal != "Select Arrival Station") {

        var thisVal = "";
        for (stationKey in stationsJSON) {
            if (stationsJSON[stationKey] == departureDropdownVal) {
                thisVal = thisVal + stationKey;
            }
        }
        for (stationKey in stationsJSON) {
            if (stationsJSON[stationKey] == arrivalDropdownVal) {
                thisVal = thisVal + stationKey;
            }
        }

        loadTrainsInfoFromDB(thisVal);

        updateBartDepartures(departureDropdownVal, arrivalDropdownVal);
    }

    var thisTrainKey;
    for ( stationAbbrev in stationsJSON ) {
        if (stationsJSON[stationAbbrev] == updateText) {
            thisTrainKey = stationAbbrev;
        };
    }

    thisTitleID = "#" + thisTrainKey;
    $("#dropdownListTrainInfoSecond").find(".disabled").removeClass("disabled");
    $("#dropdownListTrainInfoSecond").find(thisTitleID).addClass("disabled");
});

// Second dropdown
var trainInfoMenu = $("#dropdownListTrainInfoSecond");
trainInfoMenu.on('click', 'li a', function(el) {
    var clickedElement = $(el.currentTarget);
    var updateText = clickedElement.text();

    departureDropdownVal = $('#dropDownTrainInfo').text().trim();
    arrivalDropdownVal = $('#dropDownTrainInfoSecond').text().trim();
    if (departureDropdownVal != "Select Departure Station") {

        var thisVal = "";
        for (stationKey in stationsJSON) {
            if (stationsJSON[stationKey] == departureDropdownVal) {
                thisVal = thisVal + stationKey;
            }
        }
        for (stationKey in stationsJSON) {
            if (stationsJSON[stationKey] == arrivalDropdownVal) {
                thisVal = thisVal + stationKey;
            }
        }

        loadTrainsInfoFromDB(thisVal);

        updateBartDepartures(departureDropdownVal, arrivalDropdownVal);
    }

        var thisTrainKey;
    for ( stationAbbrev in stationsJSON ) {
        if (stationsJSON[stationAbbrev] == updateText) {
            thisTrainKey = stationAbbrev;
        };
    }

    thisTitleID = "#" + thisTrainKey;
    $("#dropdownListTrainInfo").find(".disabled").removeClass("disabled");
    $("#dropdownListTrainInfo").find(thisTitleID).addClass("disabled");
});
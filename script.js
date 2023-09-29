(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        var c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var plel = h >= 12 ? 'PL' : 'EL';
            h = h % 12;
            h = h ? h : 12;
            m = m < 10 ? '0' + m : m;

            c.innerHTML = h + ":" + m + ":" + s + " " + plel;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    var e = document.getElementById("delivery");
    e.innerHTML = "x,xx &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        var linn = document.getElementById("linn");
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let price;
        if (fname.value === "" || lname.value === "") {
            alert("Palun täida kõik lahtrid.");
            fname.focus();
            lname.focus();
            return;

        }
        if (/\d/.test(fname.value) || /\d/.test(lname.value)) {
            alert("Nimed ei tohi sisaldada numberid.");
            fname.focus();
            lname.focus();
            return;

        }
        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;

        } else {
            if (linn.value === "trt" || linn.value === "nrv") {
                price = 2.5;
            } else if (linn.value === "tln") {
                price = 0.0;
            } else {
                price = 3.0;
            }
        }
        if (document.getElementById("v1").checked) {
            price += 5.0;
        }
        if (document.getElementById("v2").checked) {
            price += 1.0;
        }
        e.innerHTML = price + " &euro;";

        console.log("Tarne hind on arvutatud");
    }

})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    "use strict";
    var middlePoint = new Microsoft.Maps.Location(
        58.000,
        26.9
    );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: middlePoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    var centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    var newPoint = new Microsoft.Maps.Location(
        57.714045,
        27.060047
    );
    var pin = new Microsoft.Maps.Pushpin(centerPoint);
    var pin2 = new Microsoft.Maps.Pushpin(newPoint);

    pin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht',
        text: 'UT'
    };

    pin2.metadata = {
        title: 'Suur Munamägi',
        description: 'Kõrge koht',
        text: 'SM'
    };

    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pin2, 'click', pushpinClicked);

    map.entities.push(pin);
    map.entities.push(pin2);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}



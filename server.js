var express = require("express");
var app = express();
var path = require('path');
var port = 5000 || process.env.PORT; // Arbitrary number. Make it whatever you want.

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));

app.listen(port, function() {
  // This message will display only in the console:
  console.log("The server is running on port: " + port);
});

app.get("/", function(request, response) {
  response.sendFile("public/index.html", { root : __dirname});
})

app.get("/home", function(request, response) {
  response.sendFile("public/index.html", { root : __dirname});
})

app.get("/selection", function(request, response) {
  var uom = request.query["uom"];
  var weight = request.query["weight"];
  var service = request.query["mailType"];
  var solution = calcRate(uom,weight,service);
  var serv = "";
  if(uom == "oz") weight = weight / 16;
  if((service == "metered" || service == "stamped") && weight > .21875)
    service = "flats";
  if (weight > .8125) service = "parcel";
  switch(service) {
    case "stamped":
      serv = "Letters (Stamped)";
      break;
    case "metered":
      serv = "Letters (Metered)";
      break;
    case "flats":
      serv = "Large Envelops (Flats)";
      break;
    case "retail":
      serv = "First-Class Package Service-Retail";
      break;
    case "parcel":
      serv = "USPS Retail Ground";
      break;
  }
  var parameters = {sol: solution,srv: serv,wgt: weight};
  response.render("domath", parameters);
  response.end();
});

function calcRate (uom,weight,servType) {
  if(uom == "oz") weight = weight / 16;
  if((servType == "metered" || servType == "stamped") && weight > .21875)
    servType = "flats";
  if (weight > .8125) servType = "parcel";
  var rate = 0;
  switch(servType) {
    case "stamped":
      if(weight <= .0625) rate = .55;
      else if(weight <= .125) rate = .70;
      else if(weight <= .1875) rate = .85;
      else if(weight <= .21875) rate = 1;
      break;
    case "metered":
      if(weight <= .0625) rate = .5;
      else if(weight <= .125) rate = .65;
      else if(weight <= .1875) rate = .8;
      else if(weight <= .21875) rate = .95;
      break;
    case "flats":
      if(weight <= .0625) rate = 1;
      else if(weight <= .125) rate = 1.15;
      else if(weight <= .1875) rate = 1.3;
      else if(weight <= .25) rate = 1.45;
      else if(weight <= .3125) rate = 1.6;
      else if(weight <= .375) rate = 1.75;
      else if(weight <= .4375) rate = 1.9;
      else if(weight <= .5) rate = 2.05;
      else if(weight <= .5625) rate = 2.2;
      else if(weight <= .625) rate = 2.35;
      else if(weight <= .6875) rate = 2.5;
      else if(weight <= .75) rate = 2.65;
      else if(weight <= .8125) rate = 2.8;
      break;
    case "retail":
      if(weight <= .25) rate = 3.66;
      else if(weight <= .5) rate = 4.39;
      else if(weight <= .75) rate = 5.19;
      else if(weight <= .8125) rate = 5.71;
      break;
    case "parcel":
      if(weight <= 1) rate = 7.95;
      else if(weight <= 2) rate = 10.29;
      else if(weight <= 3) rate = 11.9;
      else if(weight <= 4) rate = 12.38
      else if(weight <= 5) rate = 13.14
      else if(weight <= 6) rate = 14.92
      else if(weight <= 7) rate = 16.7;
      else if(weight <= 8) rate = 19.39;
      else if(weight <= 9) rate = 22.09;
      else if(weight <= 10) rate = 23.62;
      else if(weight <= 11) rate = 25.45;
      else if(weight <= 12) rate = 27.3;
      else if(weight <= 13) rate = 28.89;
      else if(weight <= 14) rate = 30.66;
      else if(weight <= 15) rate = 32.49;
      else if(weight <= 16) rate = 34.28;
      else if(weight <= 17) rate = 36.09;
      else if(weight <= 18) rate = 37.85;
      else if(weight <= 19) rate = 38.84;
      else if(weight <= 20) rate = 39.57;
      else if(weight <= 21) rate = 40.11;
      else if(weight <= 22) rate = 41.07;
      else if(weight <= 23) rate = 41.77;
      else if(weight <= 24) rate = 42.69;
      else if(weight <= 25) rate = 43.87;
      else if(weight <= 26) rate = 44.73;
      else if(weight <= 27) rate = 47.06;
      else if(weight <= 28) rate = 48.27;
      else if(weight <= 29) rate = 48.96;
      else if(weight <= 30) rate = 49.62;
      else if(weight <= 31) rate = 50.33;
      else if(weight <= 32) rate = 50.90;
      else if(weight <= 33) rate = 51.56;
      else if(weight <= 34) rate = 52.63;
      else if(weight <= 35) rate = 53.73;
      else if(weight <= 36) rate = 55.02;
      else if(weight <= 37) rate = 55.95;
      else if(weight <= 38) rate = 57.01;
      else if(weight <= 39) rate = 58.2;
      else if(weight <= 40) rate = 59.44;
      else if(weight <= 41) rate = 60.01;
      else if(weight <= 42) rate = 61.26;
      else if(weight <= 43) rate = 62.6;
      else if(weight <= 44) rate = 63.96;
      else if(weight <= 45) rate = 65.41;
      else if(weight <= 46) rate = 66.54;
      else if(weight <= 47) rate = 68.10;
      else if(weight <= 48) rate = 69.44;
      else if(weight <= 49) rate = 70.68;
      else if(weight <= 50) rate = 72.11;
      else if(weight <= 51) rate = 73.26;
      else if(weight <= 52) rate = 73.86;
      else if(weight <= 53) rate = 74.43;
      else if(weight <= 54) rate = 75.06;
      else if(weight <= 55) rate = 75.59;
      else if(weight <= 56) rate = 76.05;
      else if(weight <= 57) rate = 76.48;
      else if(weight <= 58) rate = 77.09;
      else if(weight <= 59) rate = 77.50;
      else if(weight <= 60) rate = 77.86;
      else if(weight <= 61) rate = 78.30;
      else if(weight <= 62) rate = 78.70;
      else if(weight <= 63) rate = 79.11;
      else if(weight <= 64) rate = 79.50;
      else if(weight <= 65) rate = 79.7;
      else if(weight <= 66) rate = 80.11;
      else if(weight <= 67) rate = 70.44;
      else if(weight <= 68) rate = 80.61;
      else if(weight <= 69) rate = 80.84;
      else if(weight <= 70) rate = 81.05;
      else rate = 121.34
      break;
  }
  return rate;
}

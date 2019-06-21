var express = require("express");
var app = express();
var port = 5000 || process.env.PORT; // Arbitrary number. Make it whatever you want.

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, function() {
  // This message will display only in the console:
  console.log("The server is running on port: " + port);
});

app.get("/", function(request, response) {
  response.sendfile("input.html");
})

app.get("/selection", function(request, response) {
  var uom = request.query["uom"];
  var weight = request.query["weight"];
  var service = request.query["mailType"];
  var solution = calcRate(uom,weight,service);
  var parameters = {sol: solution};
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
      if(weight <= .21875) rate = 1;
      if(weight <= .1875) rate = .85;
      if(weight <= .125) rate = .70;
      if(weight <= .0625) rate = .55;
      break;
    case "metered":
      if(weight <= .21875) rate = .95;
      if(weight <= .1875) rate = .8;
      if(weight <= .125) rate = .65;
      if(weight <= .0625) rate = .5;
      break;
    case "flats":
      if(weight <= .8125) rate = 2.8;
      if(weight <= .75) rate = 2.65;
      if(weight <= .6875) rate = 2.5;
      if(weight <= .625) rate = 2.35;
      if(weight <= .5625) rate = 2.2;
      if(weight <= .5) rate = 2.05;
      if(weight <= .4375) rate = 1.9;
      if(weight <= .375) rate = 1.75;
      if(weight <= .3125) rate = 1.6;
      if(weight <= .25) rate = 1.45;
      if(weight <= .1875) rate = 1.3;
      if(weight <= .125) rate = 1.15;
      if(weight <= .0625) rate = 1;
      break;
    case "retail":
      if(weight <= .8125) rate = 5.71;
      if(weight <= .75) rate = 5.19;
      if(weight <= .5) rate = 4.39;
      if(weight <= .25) rate = 3.66;
      break;
    case "parcel":
      if(weight <= 9999999999) rate = 121.34;
      if(weight <= 70) rate = 81.05;
      break;
  }
  return rate;
}

// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// work work!
app.get("/api/whoami", function(req,res){
  //req.connection is deprecated, but it will work for the test :) 
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // another solution to this approach, would be to listen to port '0.0.0.0' to force ipv4 traffic
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  // we could use x-real-ip if it was set behind a nginx/reverse proxy.
  res.json({ipaddress: ip , language: req.headers["accept-language"], software: req.headers["user-agent"]});
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

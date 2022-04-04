require('dotenv').config();
var express = require('express');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
const { default: axios } = require('axios');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami/html", function (req, res) {
  res.sendFile(__dirname + '/views/alternative.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


async function getIpClient(res) {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    console.log(port);

    //console.log(response2);
    console.log(response.data.ip);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    ipN = response.data.ip;

    console.log("**********");
    console.log(process.env.LANG);
    //res.json({ipaddress: response.data.ip})
    // TODO: Look into how to send data from html/js to server side js.

    res.json({ipaddress: response.data.ip, language: process.env.LANG, software: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"});
    console.log("**********");

    //return response.data.ip
  } catch (error) {
    console.error(error);
  }
}

app.get("/api/whoami", function (req, res) {
  var ipClient = getIpClient(res).then(
    function(value) { console.log(ipN)},
    function(error) { console.log("error 0") }
  );  //res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  port = listener.address().port;
  console.log('Your app is listening on port ' + listener.address().port);
});

// === HTTP service ===
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const path = ("/public");
var util = require('util');

// setup data store
var cors = require('cors');
var dal = require('./dal.js');
const { findOne } = require('./dal.js');
const { timeStamp } = require('console');

//write JSON file
var fs = require('fs');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.get('', function (req, res) {
    setTimeout(function(){
    dal.findOne().then((result) => {
        dal.findOne().then((result) => {
            console.log("printing result");
            console.log(result)

            let sentiment = JSON.stringify(result);
            fs.writeFileSync('/public/assets/json/sentiment.json',sentiment);
        }); 
    });
}, 800);
})


// setup directory used to serve static files
app.use(express.static('public'))

const _table_01 = require('./public/assets/json/table-01.json');
const _table_02 = require('./public/assets/json/table-02.json');
const _table_03 = require('./public/assets/json/table-03.json');

var _chart_01 = "";
var _chart_02 = "";

fs.readFile('./public/assets/json/sentiment.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  _chart_01 = data;
});



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// "/json/" used only fo json response
app.get('/assets/json/chart-table-01', function(req, res) {
    res.status(200);
   res.json(_table_01);
});
app.get('/assets/json/chart-table-02', function(req, res) {
    res.status(200);
   res.json(_table_02);
});
app.get('/assets/json/chart-table-03', function(req, res) {
    res.status(200);
   res.json(_table_03);
});


app.get('/assets/json/sentiment', function(req, res) {
    res.status(200);
   res.json(_chart_01);
});


app.listen(3000, function(){
    console.log('Running on port: 3000');
});
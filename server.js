var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var PORT = '3000';

app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}....`);
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.post('/', function(req, res) {
  console.log('post router called...');
  res.json({
    confirmation: 'sucess',
    data: req.body
  });
  console.log(req.body);
});

module.exports = app;

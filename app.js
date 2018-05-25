var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// provide static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// route
require('./routes/route')(app);

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function(){
  console.log(`Express server listening on port ${port}...`);
});

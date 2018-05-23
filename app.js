var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var formidable = require('formidable');

// provide static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res)=>{  
    res.sendFile( __dirname + '/public/index.html');
});

app.get('/register', (req, res)=>{  
    res.sendFile( __dirname + '/public/register.html');
});

app.post('/', (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile( __dirname + '/public/index.html');
})

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/manager'; //name of the database

MongoClient.connect(url, (err, db)=>{
    assert.equal(null, err);
    console.log("Connected successfully to server.");
    console.log(db);
    db.close();
});










const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function(){
  console.log(`Express server listening on port ${port}...`);
});

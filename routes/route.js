module.exports = function(app){

    var path = require('path');
    var formidable = require('formidable');
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');

    var url = 'mongodb://localhost:27017/manager'; //name of the database
    
    app.get('/', (req, res)=>{  
        res.sendFile( __dirname + '/public/index.html');
    });

    app.get('/register', (req, res)=>{  
        res.sendFile( __dirname + '/public/register.html');
    });

    app.post('/', (req,res)=>{
        var data = {};
        data = { "username":req.body.name,
                 "password":hash(req.body.password),
                 "passport":req.body.passport };
        console.log(data);
        
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client)=>{
            if(err){
                console.log("Unable to connect to the server",err); 
            }
            else{
                console.log("Connection Established.");
            }
            
            var db = client.db("user");
            db.collection("user").insertOne(data, (err, res)=>{
                if (err) throw err;
                console.log("Registered successfully.");
                
            });
            client.close();
        });
        uploadFile(req);

        //res.sendFile( __dirname + '/public/index.html');
        res.sendFile( path.resolve(__dirname,'..') + '/public/index.html');
    })

    function uploadFile(req){
        var form = new formidable.IncomingForm();
        
        form.parse(req);

        form.on('fileBegin', function (name, file){
            file.path = path.resolve(__dirname,'..') + '/uploads/' + file.name;
        });

        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });
    }

    function hash(str){
        return require('crypto').createHash('md5').update(str).digest("hex");
    }

}
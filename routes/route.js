module.exports = function(app){

    var path = require('path');
    var formidable = require('formidable');
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');

    var url = 'mongodb://localhost:27017/manager';
    
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
        
        res.sendFile( path.resolve(__dirname,'..') + '/public/index.html');
    })

    app.post('/dashboard', (req, res)=>{  
        if(req.body.name == "" || req.body.password == ""){
            res.status(404).send('<h1>Missing username or password!</h1>');
            res.redirect("/");
        }
       
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
            if(err){
                console.log("Unable to connect to the server",err); }
            else{
                console.log("Connection Established.");}
            
            var db = client.db("user");
        
            db.collection('user').findOne({"username":req.body.name}, (err, items)=>{
                if(items == null){  //Invalid username
                    return false;
                }
                else if ( items["password"] != req.body.password ){
                    return false;  //Invalid password
                }
                console.log(items);
            });
            client.close();
        });

        res.sendFile( path.resolve(__dirname,'..')  + '/public/dashboard.html');
    });

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
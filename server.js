

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var LOCATION_COLLECTION = "location";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://yasin:crushinto123_@ds145868.mlab.com:45868/locationdb", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


//  API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/adress", function(req, res) {
  db.collection(LOCATION_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get locations");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post('/adress', function(req, res){
 

  
  var newLocation =  req.body;


   console.log(newLocation);

  db.collection(LOCATION_COLLECTION).insertOne(newLocation, function(err, doc){

     if (err) {
      handleError(res, err.message, "Failed to create new location.");
    } else {
      res.status(201).json(doc.ops[0]);
      console.log("Success");
    }
     
  });



  
  
});
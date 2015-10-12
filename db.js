var databaseURI = "ds051893.mongolab.com:51893/movies";
var collections = ["movies"];
var db = require("mongojs").connect('movies:pa$5w0rd@' + databaseURI, collections);

module.exports = db;

//var db = require("./db");
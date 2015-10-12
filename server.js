var db = require("./db");
var Handlebars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');
var Hapi = require('hapi');
var Path = require('path');
var Good = require('good');
var engine = Handlebars.create();
HandlebarsLayouts.register(engine);

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: "GET",
    path: "/public/{path*}",
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var movies = '';
        db.movies.find({"Title": { $regex: /^a/i }}, function(err, movies) {
            //console.log(err);
            //console.log(movies);
          if( err || !movies){
            console.log("No movies found");
          }
          else{
            //console.log(movies);
            reply.view('index', {movies: movies, anchor: 'movies', total: movies.length});
          }
        }).limit(50);
    }
});
server.route({
    method: 'GET',
    path: '/letter/{letter}',
    handler: function (request, reply) {
        console.log(encodeURIComponent(request.params.letter));
        var letter = new RegExp("^" + encodeURIComponent(request.params.letter) ,"i");
        var movies = '';
        console.log(letter);
        db.movies.find({"Title": { $regex: letter }}, function(err, movies) {
            //console.log(err);
            //console.log(movies);
          if( err || !movies){
            console.log("No movies found");
          }
          else{
            //console.log(movies);
            reply.view('index', {movies: movies, anchor: 'movies', total: movies.length, half: (Math.ceil(movies.length/2))});
          }
        });
    }
});
server.route({
    method: 'GET',
    path: '/detail/{id}',
    handler: function (request, reply) {

        console.log(encodeURIComponent(request.params.id));

        db.movies.find({"Barcode": encodeURIComponent(request.params.id)}, function(err, details) {
            //console.log(err);
            console.log(details);
          if( err || !details){
            console.log("No details found");
          }
          else{
            reply.view("details", {details: details, anchor: 'details', total: details.length});
          }
        });
    }
});
server.route({
    method: 'GET',
    path: '/year/{id}',
    handler: function (request, reply) {

        console.log(encodeURIComponent(request.params.id));

        db.movies.find({"Movie Release Year": encodeURIComponent(request.params.id)}, function(err, year) {
            //console.log(err);
            console.log(year);
          if( err || !year){
            console.log("No year found");
          }
          else{
            reply.view("details", {details: year, anchor: 'year', total: year.length});
          }
        });
    }
});
server.route({
    method: 'GET',
    path: '/director/{id}',
    handler: function (request, reply) {

        console.log(encodeURIComponent(request.params.id));

        db.movies.find({"Director": encodeURIComponent(request.params.id)}, function(err, director) {
            //console.log(err);
            console.log(director);
          if( err || !director){
            console.log("No director found");
          }
          else{
            reply.view("details", {details: director, anchor: 'director', total: director.length});
          }
        });
    }
});
server.route({
    method: 'GET',
    path: '/format/{id}',
    handler: function (request, reply) {

        console.log(encodeURIComponent(request.params.id));

        db.movies.find({"Format": encodeURIComponent(request.params.id)}, function(err, format) {
            //console.log(err);
            console.log(format);
          if( err || !format){
            console.log("No format found");
          }
          else{
            reply.view("details", {details: format, anchor: 'format', total: format.length});
          }
        });
    }
});

server.route({
    method: 'GET',
    path: '/search',
    handler: function (request, reply) {
        reply.view('search');
    }
});

server.views({
    engines: {
        html: engine
    },
    path: Path.join(__dirname, 'views'),
    partialsPath: Path.join(__dirname, 'views/partials'),
    helpersPath: Path.join(__dirname, 'views/helpers')
});
  //relativeTo: __dirname,
  //path: "templates",
  //partialsPath: 'partials',
  //helpersPath: "helpers"

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

// this gets the socket.io module
var io = require('socket.io').listen(server)
// root route to render the index.ejs view
app.get('/', function(request, response) {
	response.render("index");
});
var counter = 0;
//listen to connection even from the client side
io.sockets.on('connection', function (socket){
    console.log("Socket connection up!")
	//server listens to "posting_form" event
	socket.on("increase_count", function (data){
        counter += 1;

		 io.emit('updated_counter', {counter});

    });
    socket.on("reset_count", function (data) {
        counter = 0;
        io.emit('updated_counter', {counter});
    });
});
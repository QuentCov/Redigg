var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send("Welcome to the first Node.js App!");
});

app.listen(3000, function() {
    console.log("Server running at http://localhost:3000/");
});

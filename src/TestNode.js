var http = require('http');
http.createServer(function (request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Welcome to the first Node.js App!\n);
}).listen(3000);
console.log('Server runnint at http://localhost:3000/');

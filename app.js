
//clean code
//creating server
const http = require('http');

const routes = require('./routes.js')

console.log(routes.someText);


//sending response 

const server = http.createServer(routes.handler);

server.listen(4000);





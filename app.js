
//creating server
const http = require('http');

// function rqListener(req, res) {

// }

// http.createServer(rqListener);

// //with anonymous function 

// http.createServer(function rqListener(req, res) {

// })

//with arrow

const server = http.createServer((req, res) => {
    console.log('amar');
})

server.listen(4000);
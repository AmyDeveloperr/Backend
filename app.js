
//creating server
const http = require('http');

// function rqListener(req, res) {

// }

// http.createServer(rqListener);

// //with anonymous function 

// http.createServer(function rqListener(req, res) {

// })

//with arrow

//sending response 

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if(req.url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My first page</title></head>');
        res.write('<body><h1>Welcome Home</h1></body>');
        res.write('</html>')
        res.end(); 
    } else if(req.url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My first page</title></head>');
        res.write('<body><h1>Welcome to about us page</h1></body>');
        res.write('</html>')
        res.end(); 
    } else if(req.url === '/node') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My first page</title></head>');
        res.write('<body><h1>Welcome to my Node JS project</h1></body>');
        res.write('</html>')
        res.end(); 
    }
})

server.listen(4000);
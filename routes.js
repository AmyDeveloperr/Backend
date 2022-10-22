// making clean code by exporting this code 
//const http = require('http');
const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    
    if(url === '/') {
        //const filePath = path.join(__dirname, 'message.txt');   
        fs.readFile('message.text', {encoding:'utf-8'}, (err, data)=> {
            if(err) {
                console.log(err);
            }
      
        //res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Enter Message</title></head>');
        res.write(`<body>${data}</body>`)
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end(); 
      })
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.text', message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node JS server</h1></body>');
    res.write('</html>');
    res.end;

}
   // just exporting function 
//module.exports = requestHandler;

//exporting the objec

// module.exports = {
//     handler: requestHandler,
//     someText: 'some text'
// }

//we can also export like this

module.exports.handler = requestHandler;
module.exports.someText = 'some text';

// we can also omit the module  word

exports.handler = requestHandler;
exports.someText = 'some text';

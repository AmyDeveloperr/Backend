

const express = require('express');
const app = express();
app.use((req, res, next) => {
    console.log('in the middleware');
    next();
})

app.use((req, res, next) => {
    console.log('in the middleware!');
    res.send( { key1: "value5" });
    //res.send('<h2>Hello Express.JS</h2>');

})

  
app.listen(3000);





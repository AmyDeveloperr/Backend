const express = require('express');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST"><label>Username </label><input id="username" type="text" name="name"><button type="submit">Submit</button></form>`);
    
})

router.post('/login', (req, res, next) => {
    res.redirect('/');
})

module.exports = router;


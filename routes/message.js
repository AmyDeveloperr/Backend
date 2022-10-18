const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res, next) => {

    fs.readFile('chat.txt', (err, data) => {
        if (err) {
            console.log(err);
            data = 'no data exists';

        }

        res.send(`${data}<form action="/" onsubmit= "document.getElementById('message').value=localStorage.getItem('username')" method="POST">
        <input id="msg" name="msg" type="text"placeHolder="message">
        <input type="hidden" name="username" id="message">
        <button type="submit">send</button></form>`)
    })


});

router.post('/', (req, res, next) => {
    fs.writeFile("chat.txt", `${req.body.username} : ${req.body.msg}` , { flag: 'a' }, (err) => err ? console.log(err) : res.redirect('/'));

})

module.exports = router;


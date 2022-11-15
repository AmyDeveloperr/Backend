const jwt = require('jsonwebtoken');

const User = require('../models/user');


const auth = async(req, res, next) => {

    try{
    const token = req.header('Authorization'); //we sent this header from front end

    const user = jwt.verify(token, 'barbalugota'); //while loggin we have created token
    console.log('>>>>>>', user.userId);


    const getUser = await User.findByPk(user.userId); //here we are getting userdata by userId
   
    req.user = getUser; // we are storing users info who logged in, in req.user
    next();

    }catch(err) {console.log(err)};
}

module.exports = {auth};
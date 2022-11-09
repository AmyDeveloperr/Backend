const express = require('express');
const sequelize = require('./util/database');
const user = require('./models/user');
const cors = require('cors');

const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

const app = express();

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(userRoute);

//sync look for all define (we used define in models)

sequelize.sync().then((result) => {
    //console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));


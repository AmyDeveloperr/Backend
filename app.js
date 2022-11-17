const express = require('express');
const sequelize = require('./util/database');
const cors = require('cors');

const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const forgotPassRoute = require('./routes/forgotPass');
const User = require('./models/user');
const Expenses = require('./models/expense');
const Orders = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');

const app = express();
const dotenv = require('dotenv').config();

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/password', forgotPassRoute);

User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

//sync look for all define (we used define in models)

sequelize.sync().then((result) => {
    //console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));


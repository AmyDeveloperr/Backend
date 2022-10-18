
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const addProductRoutes = require('./routes/add-product.js');
const shopRoutes = require('./routes/shop.js');
const contactRoutes = require('./routes/contact-us.js');
const successRoutes = require('./routes/success.js');
// const loginRoutes = require('./routes/login.js');
// const messageRoutes = require('./routes/message.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(addProductRoutes);
app.use(shopRoutes);
app.use(contactRoutes);
app.use(successRoutes);
// app.use(loginRoutes);
// app.use(messageRoutes);


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'pageNotFound.html')); 
});
// app.use((req, res, next) => {
//     res.status(404).send('<h1>Page Not Found</h1>');
// })
app.listen(3000);





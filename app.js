const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //every time we require something to our html such as images, scripts, stylesheet or whatever, we just specify the last path e.g: /img/img123.png
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);



app.listen(3000);
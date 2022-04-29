// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const math = require('./modules/math/math');

// app uses
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/math', math);
app.use('/answer', math);

// globals
const port = 5001;

// spin up server
app.listen(port, ()=>{
  console.log('server up on:', port);
});
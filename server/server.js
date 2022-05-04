// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const math = require('./modules/math/math');
const math2 = require('./modules/math/math2');

// app uses
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/math', math);
app.use('/math2', math2);

// globals
const port = process.env.PORT || 5001;

// spin up server
app.listen(port, ()=>{
  console.log('server up on:', port);
});
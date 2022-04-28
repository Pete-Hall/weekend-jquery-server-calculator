// requires
const express = require('express');
const app = express();
const math = require('./modules/math/math');

// app uses
app.use(express.static('./server/public'));
app.use('/math', math);

// globals
const port = 5001;

// spin up server
app.listen(port, ()=>{
  console.log('server up on:', port);
});
// requires
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  console.log('/math GET');
  res.send('meow');
})

// exports
module.exports = router;
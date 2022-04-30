// requires
const express = require('express');
const router = express.Router();

let equations2 = [];

router.post('/', (req, res)=>{
  console.log('/math2 POST:', req.body);
  equations2.push(req.body);
  res.sendStatus(200);
})


// exports
module.exports = router;
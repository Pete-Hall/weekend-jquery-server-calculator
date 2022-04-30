// requires
const express = require('express');
const router = express.Router();

let equations2 = [];

router.post('/', (req, res)=>{
  console.log('/math2 POST:', req.body);
  equations2.push(req.body);
  res.sendStatus(200);
})

router.get('/', (req, res)=>{
  console.log('/math2 GET');
  res.send(equations2);
})

// exports
module.exports = router;
// requires
const express = require('express');
const router = express.Router();

let equations = [];

router.get('/', (req, res)=>{
  console.log('/math GET');
  res.send(equations);
})

router.post('/', (req, res)=>{
  console.log('/math POST:', req.body);
  equations.push(req.body);
  res.sendStatus(200)
})

// exports
module.exports = router;
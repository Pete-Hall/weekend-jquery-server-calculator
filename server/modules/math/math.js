// requires
const express = require('express');
const router = express.Router();

let equations = [];
let test = '';

// SAMPLE EQUATION OBJECT --> all .val()'s are initially strings I think
// let newEquation = {
//   firstNum: $('#firstNumIn').val(),
//   operator: chosenOperator,
//   lastNum: $('#secondNumIn').val()
// }

// http://localhost:5001/math
router.get('/', (req, res)=>{ // sends the equation array to the DOM
  console.log('/math GET');
  res.send(equations);
})

// http://localhost:5001/math/answer
router.get('/answer', (req, res)=>{ // performs math logic and sends the answer to the DOM
  console.log('/answer GET');
  for(let i = 0; i < equations.length; i++) { // why does this logic need to be in the router.get function??
    if(equations[i].operator === "+") {
      answer = (+equations[i].firstNum) + (+equations[i].lastNum);
      answer = answer.toString();
    }
    else if(equations[i].operator === "-") {
      answer = (+equations[i].firstNum) - (+equations[i].lastNum);
      answer = answer.toString();
    }
    else if(equations[i].operator === "*") {
      answer = (+equations[i].firstNum) * (+equations[i].lastNum);
      answer = answer.toString();
    }
    else if(equations[i].operator === "/") {
      answer = (+equations[i].firstNum) / (+equations[i].lastNum);
      answer = answer.toString();
    }
    else {
      answer = 'math went wrong';
    }
  }
  res.send(answer);
})

router.post('/', (req, res)=>{ // adds a new equation to the equations array
  console.log('/math POST:', req.body);
  equations.push(req.body);
  res.sendStatus(200)
})

// exports
module.exports = router;
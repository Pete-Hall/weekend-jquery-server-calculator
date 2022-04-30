// requires
const express = require('express');
const router = express.Router();

let equations = [];
let answer = null;

// SAMPLE EQUATION OBJECT --> all .val()'s are initially strings
// let newEquation = {
//   firstNum: $('#firstNumIn').val(),
//   operator: chosenOperator,
//   lastNum: $('#secondNumIn').val()
// }

// http://localhost:5001/math
router.get('/', (req, res)=>{ // performs the math logic, sends the equation array to the DOM (which will include the final answer for the appropriate equation)
  console.log('/math GET');
  for(let i = 0; i < equations.length; i++) { // moved this logic from the router.get for the /answer to here
    if(equations[i].operator === "+") {
      answer = (+equations[i].firstNum) + (+equations[i].lastNum); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
      answer = answer.toString();
      equations[i].finalAnswer = answer;
    }
    else if(equations[i].operator === "-") {
      answer = (+equations[i].firstNum) - (+equations[i].lastNum);
      answer = answer.toString();
      equations[i].finalAnswer = answer;
    }
    else if(equations[i].operator === "*") {
      answer = (+equations[i].firstNum) * (+equations[i].lastNum);
      answer = answer.toString();
      equations[i].finalAnswer = answer;
    }
    else if(equations[i].operator === "/") {
      answer = (+equations[i].firstNum) / (+equations[i].lastNum);
      answer = answer.toString();
      equations[i].finalAnswer = answer;
    }
    else {
      answer = 'math went wrong';
    }
  }
  res.send(equations);
})

// http://localhost:5001/math/answer
router.get('/answer', (req, res)=>{ // sends the current answer to the DOM
  console.log('/answer GET');
  res.send(answer);
})

router.post('/', (req, res)=>{ // adds a new equation to the equations array (see example object above)
  console.log('/math POST:', req.body);
  equations.push(req.body);
  res.sendStatus(200)
})

// exports
module.exports = router;
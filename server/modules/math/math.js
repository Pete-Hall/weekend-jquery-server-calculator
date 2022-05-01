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
// GET request after the POST to get the actual calcuation
router.get('/', (req, res)=>{ // performs the math logic, sends the equation array to the DOM (which will include the final answer for the appropriate equation)
  console.log('/math GET');
  for(let i = 0; i < equations.length; i++) { // moved this logic from the router.get for the /answer to here and it works (not 100% sure why it works here and not globally in the file).
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

router.get('/rerun', (req, res)=>{
  console.log('/rerun GET');
  res.send(equations);
})

router.post('/', (req, res)=>{ // adds a new equation to the equations array (see example object above)
  console.log('/math POST:', req.body);
  equations.push(req.body);
  res.sendStatus(200) // once the calculation is complete, send back the OK
})

router.delete('/', (req, res)=>{ // deletes all values in the equations array and resets the answer to null
  console.log('/math DELETE');
  equations = [];
  answer = null;
  res.send('equation history removed');
})

// exports
module.exports = router;
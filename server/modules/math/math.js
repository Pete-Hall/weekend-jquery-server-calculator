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


/* for(let i = 0; i < equations.length; i++) {
  // change to appropriate data types
  test = equations[i].firstNum; // why can't I loop thru the array and re-value the test global variable??
  let numberFirstNum = +equations[i].firstNum;
  let numberLastNum = +equations[i].lastNum;
  // conditional statement based on operator (but I'm not converting the operator to use it, I just need to know which one to use in this statement)
  // +, -, *, /
  //answer = numberFirstNum + numberLastNum;
}

//answer = answer.toString();

//answer = 2+2; // this works in changing the value of answer and sending it with GET */

router.get('/', (req, res)=>{ // sends the equation array to the DOM
  console.log('/math GET');
  res.send(equations);
})

// set up router with /answer // http://localhost:5001/answer routes to /math /math/answer routes to answer - worry about this later
router.get('/answer', (req, res)=>{
  console.log('/answer GET');
  for(let i = 0; i < equations.length; i++) {
    if(equations[i].operator === "+") {
      answer = (+equations[i].firstNum) + (+equations[i].lastNum);
      answer = answer.toString();
    }
  }
  res.send(answer); // this sends back the operator of the first object in the array (so we know we can find this info after the POST)
})

router.post('/', (req, res)=>{ // adds a new equation to the equations array
  console.log('/math POST:', req.body);
  equations.push(req.body);
  res.sendStatus(200)
})

// exports
module.exports = router;
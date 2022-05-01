// requires
const express = require('express');
const router = express.Router();

let equations2 = [];
let answer = null;

router.post('/', (req, res)=>{
  console.log('/math2 POST:', req.body);
  equations2.push(req.body);
  res.sendStatus(200);
})

// SAMPLE EQUATION2 OBJECT
// let newEquation2 = {
//   inputItems: $('#numbersIn').val()
// };

router.get('/', (req, res)=>{
  console.log('/math2 GET');

  for(let i = 0; i < equations2.length; i++) {
    //split up string into a usable equation
    // split up numbers before and after an operator ('123+456' = 123 + 456)
    answer = equations2[i].inputItems;
    if(answer.includes('+')) {
      let splitUp = answer.split('+');
      //equations2[i].finalAnswer2 = splitUp; // creates the key of finalAnswer2 as an array of the split up string (ex. "3+2" --> [3,2]). .length gives us the length of the array
      answer = (+splitUp[0]) + (+splitUp[1]); // if enter "6+-6" in interface, [1] is '-6' and the answer is 0...interesting
      equations2[i].finalAnswer2 = answer;
    } else if(answer.includes('-')) {
      let splitUp = answer.split('-');
      answer = (+splitUp[0]) - (+splitUp[1]);
      equations2[i].finalAnswer2 = answer;
    } else if(answer.includes('*')) {
      let splitUp = answer.split('*');
      answer = (+splitUp[0]) * (+splitUp[1]);
      equations2[i].finalAnswer2 = answer;
    } else if(answer.includes('/')) {
      let splitUp = answer.split('/');
      answer = (+splitUp[0]) / (+splitUp[1]);
      equations2[i].finalAnswer2 = answer;
    } else {
      answer = 'math went wrong';
    }
  }

  // let formula = [];
  // let operators = ['+', '-', '*', '/'];
  // for(let i=0; i<equations2.length; i++) {
  //   let inputs = equations2[i].inputItems;
  //   formula = [];
  //   for(let j=0; j<inputs.length; j++) {
  //     for(let k=0; k<operators.length; k++) {
  //       if(inputs[j]===(operators[k])) {
  //         formula.push([j]); // returns an array of the indexes of all the operators in the equation
  //         equations2[i].finalAnswer2 = formula;
  //       }
  //     }
  //   }
  // }

  res.send(equations2);
})

// exports
module.exports = router;
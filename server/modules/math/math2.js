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

  ///// TRYING TO DO LOGIC WITHOUT REGEX OR MATHJS LIBRARY = HARD. /////
  //// i think if the inputted user equation wasn't an input field but just a normal text line, I could use span's to break up the order of operations better but the example looks like a user input field. Also not sure how it would work sending a POST without getting the user input .val(), maybe .text() would work instead. keep splitting up strings by operators to get multi digit numbers and then create expression tree/post,infix? https://www.parsonsmatt.org/2014/07/07/postfixjs.html#:~:text=Postfix%20arithmetic%20means%20that%20the,with%20its%20equivalent%205%203%20%2B%20. ////

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
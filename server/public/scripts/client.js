$(document).ready(onReady);

let equations = [];

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
}

function equals() {
  console.log('in equals');
  // get user input & place in an object
  let newOperator = 0;
  let newEquation = {
    firstNum: $('#firstNumIn'),
    // operator
    // lastNum
  }
}

function operatorChoose() {
  console.log('in operatorChoose');
  console.log($(this).text());
}
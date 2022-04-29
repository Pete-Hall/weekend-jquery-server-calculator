$(document).ready(onReady);

//let equations = []; // for testing the object creation
let chosenOperator = 0; // I wonder if this global variable will be a problem

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
}

function equals() { // When the submit (`=` button) is clicked, capture this input (values and operator), bundle it up in an object, and send this object to the server via a POST.
  console.log('in equals');
  // get user input & place in an object
  let newEquation = {
    firstNum: $('#firstNumIn').val(),
    operator: chosenOperator,
    lastNum: $('#secondNumIn').val()
  }
  //equations.push(newEquation); // for testing the object creation
  console.log('adding:', newEquation);
  // using AJAX, make a POST request to CREATE a new equation in the equation array (which will need to be setup in the math.js file).
}

function operatorChoose() { // updates the chosenOperator for the current equation
  console.log('in operatorChoose');
  console.log($(this).text()); // get the text content of the button element. https://api.jquery.com/val/ and https://api.jquery.com/text/
  chosenOperator = $(this).text();
  //console.log(chosenOperator);
}
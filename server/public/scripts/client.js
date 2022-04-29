$(document).ready(onReady);

//let dataTypeTest = []; // for TESTING how to convert the operator from a string to the arithmetic version
let chosenOperator = 0; // I wonder if this global variable will be a problem

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
}

function getAnswer() {
  console.log('in getAnswer');
  // use AJAX to make a GET request to retrieve the answer from the most recent inputted equation and display on the DOM
  $.ajax({
    method: 'GET',
    url: '/math/answer' //trying /answer instead of /math (will likely need to create /answer?)
  }).then(function(response){
    console.log(response);
    let el = $('#answerOut');
    el.empty();
    el.append(response);
  }).catch(function(err){
    console.log(err);
    alert('error getting answer');
  })
}

function getEquations() { // creates a GET request in order to display all inputted equations onto the DOM
  console.log('in getEquations');
  // use AJAX to make a GET request to retrieve the equations array in math.js and display it on the DOM
  $.ajax({
    method: 'GET',
    url: '/math'
  }).then(function(response) {
    console.log(response);
    let el = $('#equationHistoryOut');
    el.empty();
    for(let i = 0; i < response.length; i++) {
      el.append(`<li>${response[i].firstNum} ${response[i].operator} ${response[i].lastNum}</li>`);
    }
  }).catch(function(err){
    console.log(err);
    alert('error getting equations history');
  })
}

function equals() { // When the submit (`=` button) is clicked, capture this input (values and operator), bundle it up in an object, and send this object to the server via a POST.
  console.log('in equals');
  // get user input & place in an object
  let newEquation = {
    firstNum: $('#firstNumIn').val(),
    operator: chosenOperator,
    lastNum: $('#secondNumIn').val()
  }
  //dataTypeTest.push(newEquation); // for TESTING the data type of the object
  console.log('adding:', newEquation);
  // using AJAX, make a POST request to CREATE a new equation in the equation array (which will need to be setup in the math.js file).
  $.ajax({
    method: 'POST',
    url: '/math', // not sure if this is right or if it needs to be '/'
    data: newEquation
  }).then(function(response){
    console.log('back from POST', response);
    // update equation history on DOM
    getEquations();
    // upadate current answer on DOM
    getAnswer();
  }).catch(function(err){
    console.log(err);
    alert('error adding equation');
  })
}

function operatorChoose() { // updates the chosenOperator for the current equation
  console.log('in operatorChoose');
  console.log($(this).text()); // get the text content of the button element. https://api.jquery.com/val/ and https://api.jquery.com/text/
  chosenOperator = $(this).text();
  //console.log(chosenOperator);
}

// function dataType() {
//   for(let i = 0; i < dataTypeTest.length; i++) {
//     let firstNumber = +dataTypeTest[i].firstNum;
//     let secondNumber = +dataTypeTest[i].lastNum;
//     console.log(firstNumber, secondNumber);
//     let operatorType = dataTypeTest[i].operator;
//     console.log(firstNumber, operatorType, secondNumber); // returns the operator as string = boo!!
//   };
// }
$(document).ready(onReady);

let chosenOperator = null;

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
  $('#clearButton').on('click', clear);

  // STRETCH GOALS
  $('#optionsIn').on('click', '.optionButtonsIn', optionButtons);
  $('#clearButton2').on('click', clear2);
  $('#equalsButton2').on('click', equals2);
}

function clear() { // Clears the user inputs (including the operator)
  console.log('in clear');
  $('#firstNumIn').val('');
  $('#secondNumIn').val('');
  chosenOperator = null;
}

function clear2() {
  console.log('in clear2');
  $('#numbersIn').val('');
}

function equals() { // When the submit (`=` button) is clicked, capture the input (values and operator), bundle it up in an object, and send this object to the server via a POST. Updates the DOM
  console.log('in equals');
  // get user input & place in an object
  let newEquation = {
    firstNum: $('#firstNumIn').val(),
    operator: chosenOperator,
    lastNum: $('#secondNumIn').val()
  };
  console.log('adding:', newEquation);
  // using AJAX, make a POST request to CREATE a new equation in the equation array (which will need to be setup in the math.js file).
  $.ajax({
    method: 'POST',
    url: '/math', 
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

function equals2() {
  console.log('in equals2');
  let newEquation2 = {
    inputItems: $('#numbersIn').val()
  };
  console.log('adding:', newEquation2);
  $.ajax({
    method: 'POST',
    url: '/math2', // TODO: create this route and file when necessary
    data: newEquation2
  }).then(function(response){
    console.log('back from POST', response);
    // update equation history on DOM
    getEquations2();
    //update current answer on DOM
  }).catch(function(err){
    console.log(err);
    alert('error adding equation from STRETCH calculator');
  })
}

function getAnswer() { // creates a GET request in order to display the most recent answer on the DOM
  console.log('in getAnswer');
  // use AJAX to make a GET request to retrieve the answer from the most recent inputted equation and display on the DOM
  $.ajax({
    method: 'GET',
    url: '/math/answer'
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

function getEquations() { // creates a GET request in order to display all inputted equations onto the DOM including that equation's answer
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
      el.append(`<li>${response[i].firstNum} ${response[i].operator} ${response[i].lastNum} = ${response[i].finalAnswer}</li>`);
    }
  }).catch(function(err){
    console.log(err);
    alert('error getting equations history');
  })
}

function getEquations2() {
  console.log('in getEquations2');
  $.ajax({
    method: 'GET',
    url: '/math2'
  }).then(function(response){
    console.log(response);
    let el = $('#equationHistoryOut2');
    el.empty();
    for(let i = 0; i < response.length; i++) {
      el.append(`<li>${response[i].inputItems} = ${response[i].finalAnswer2}`);
    };
  }).catch(function(err){
    console.log(err);
    alert('error getting equations history 2');
  })
}

function operatorChoose() { // updates the chosenOperator for the current equation (where it will be used in equals() in the POST data object)
  console.log('in operatorChoose');
  console.log($(this).text()); // get the text content of the button element. https://api.jquery.com/val/ and https://api.jquery.com/text/
  chosenOperator = $(this).text();
  //console.log(chosenOperator);
}

function optionButtons() {
  console.log('in optionButtons');
  let buttonValue = $(this).val();
  console.log(buttonValue);
  $('#numbersIn').val($('#numbersIn').val() + buttonValue); // hey JQ, target the numbersIn input field and set the value to the current contents of the input field & the value of the specific button clicked. https://stackoverflow.com/questions/4146502/jquery-selectors-on-custom-data-attributes-using-html5 and http://jsfiddle.net/mE6CX/ 
}
$(document).ready(onReady);

let chosenOperator = 0;

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
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

function equals() { // When the submit (`=` button) is clicked, capture the input (values and operator), bundle it up in an object, and send this object to the server via a POST. Updates the DOM
  console.log('in equals');
  // get user input & place in an object
  let newEquation = {
    firstNum: $('#firstNumIn').val(),
    operator: chosenOperator,
    lastNum: $('#secondNumIn').val()
  }
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

function operatorChoose() { // updates the chosenOperator for the current equation (where it will be used in equals() in the POST data object)
  console.log('in operatorChoose');
  console.log($(this).text()); // get the text content of the button element. https://api.jquery.com/val/ and https://api.jquery.com/text/
  chosenOperator = $(this).text();
  //console.log(chosenOperator);
}

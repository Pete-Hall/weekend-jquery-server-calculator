// const res = require("express/lib/response");

$(document).ready(onReady);

//let equations = []; // for testing the object creation
let chosenOperator = 0; // I wonder if this global variable will be a problem

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
}

function getEquations() {
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
  //equations.push(newEquation); // for testing the object creation
  console.log('adding:', newEquation);
  // using AJAX, make a POST request to CREATE a new equation in the equation array (which will need to be setup in the math.js file).
  $.ajax({
    method: 'POST',
    url: '/math', // not sure if this is right or if it needs to be '/'
    data: newEquation
  }).then(function(response){
    console.log('back from POST', response);
    // update DOM
    getEquations();
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
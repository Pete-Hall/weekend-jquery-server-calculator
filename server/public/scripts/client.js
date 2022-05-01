$(document).ready(onReady);

let chosenOperator = '';

function onReady() {
  $('#equalsButton').on('click', equals);
  $('#operatorsIn').on('click', '.operatorChooseButton', operatorChoose);
  $('#clearButton').on('click', clear);
  $('#deleteHistoryButton').on('click', deleteHistory); // STRETCH goal
  $('#equationHistoryOut').on('click', '.rerunEquation', rerunEquation); // STRETCH goal

  // STRETCH INTERFACE
  $('#optionsIn').on('click', '.optionButtonsIn', optionButtons);
  $('#clearButton2').on('click', clear2);
  $('#equalsButton2').on('click', equals2);
}

function clear() { // Clears the user inputs (including the operator)
  console.log('in clear');
  $('#firstNumIn').val('');
  $('#secondNumIn').val('');
  chosenOperator = '';
  $('#answerOut').empty();
  $('.operatorChooseButton').css('background-color', '');
}

function clear2() {
  console.log('in clear2');
  $('#numbersIn').val('');
}

function deleteHistory() { // Goes to the server and deletes the equation history and the most recent answer. https://dirask.com/posts/Node-js-Express-js-AJAX-DELETE-request-1XobEj
  console.log('in deleteHistory');
  $.ajax({
    method: 'DELETE',
    url: '/math'
  }).then(function(response){
    console.log(response);
    getEquations();
    getAnswer();
  }).catch(function(err){
    console.log(err);
    alert('error deleting history')
  })
}

function equals() { // When the submit (`=` button) is clicked, capture the input (values and operator), bundle it up in an object, and send this object to the server via a POST. Updates the DOM
  console.log('in equals');
  // get user input & place in an object
  let newEquation = {
    firstNum: $('#firstNumIn').val(),
    operator: chosenOperator,
    lastNum: $('#secondNumIn').val()
  };
  if(newEquation.firstNum === '' || newEquation.operator === '' || newEquation.lastNum === '') { // STRETCH goal: adds validation for data integrity
    alert('Please input a valid equation');
    return false;
  } else {
    console.log('adding:', newEquation);
  };
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
    // update equation history and current answer on DOM
    getEquations2();
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
      el.append(`<li class="rerunEquation" data-index="${i}">${response[i].firstNum} ${response[i].operator} ${response[i].lastNum} = ${response[i].finalAnswer}</li>`);
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
    let answerEl = $('#answerOut2');
    answerEl.empty();
    answerEl.append(response[response.length-1].finalAnswer2);
    for(let i = 0; i < response.length; i++) {
      el.append(`<li>${response[i].inputItems} = ${response[i].finalAnswer2}`); // remove finalAnswer2 for correct interface but I like this better
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
  $('.operatorChooseButton').css('background-color', '');
  $(this).css('background-color', 'lightgreen');
  
  //console.log(chosenOperator);
}

function optionButtons() {
  console.log('in optionButtons');
  let buttonValue = $(this).val();
  console.log(buttonValue);
  $('#numbersIn').val($('#numbersIn').val() + buttonValue); // hey JQ, target the numbersIn input field and set the value to the current contents of the input field & the value of the specific button clicked. https://stackoverflow.com/questions/4146502/jquery-selectors-on-custom-data-attributes-using-html5 and http://jsfiddle.net/mE6CX/ 
}

function rerunEquation() {
  console.log('in rerunEquation');
  console.log($(this).text());
  // need data index to target the specific response[n] object
  console.log($(this).data('index')); // returns the index of the clicked on element
  let target = $(this).data('index');
  $.ajax({
    method: 'GET',
    url: '/math/rerun'
  }).then(function(response){
    console.log(response);
    let elFirst = $('#firstNumIn');
    let elSecond = $('#secondNumIn');
    let elAnswer = $('#answerOut')
    elFirst.val('');
    elSecond.val('');
    elAnswer.empty();
    // console.log(response[target].firstNum);
    elFirst.val(response[target].firstNum);
    elSecond.val(response[target].lastNum);
    elAnswer.append(response[target].finalAnswer);
    chosenOperator = response[target].operator;
    $('.operatorChooseButton').css('background-color', '');
    if(chosenOperator === '+') {
      $('#addButton').css('background-color', 'lightgreen');
    } else if(chosenOperator === '-') {
      $('#subtractButton').css('background-color', 'lightgreen');
    } else if(chosenOperator === '*') {
      $('#multiplyButton').css('background-color', 'lightgreen');
    } else if(chosenOperator === '/') {
      $('#divideButton').css('background-color', 'lightgreen')
    };
  }).catch(function(err){
    console.log(err);
    alert('problem rerunning an equation');
  })
}
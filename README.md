# Project Name

[Project Instructions](./INSTRUCTIONS.md)

## Description

### Required Features Calculator

This interface functions as a simple calcutor taking two input numbers and one operator. It bundles the user inputs into an object, makes a POST call to send the data to the server, calculates the logic server-side, and makes a GET request to display the correct answer and equation history onto the DOM. 

Added features includes button styling/animation, data validation, ability to delete the equation history making a DELETE request, and the ability to rerun an equation when you click on an equation in the history list on the DOM. 

### Stretch Goals Calculator

This calculator has an updated interface to be more intuitive. Similar to the required features calculator, this interface bundles user input into an object, makes a POST call to send the data to the server, calculates the logic server-side, and makes a GET request to display the correct answer and equation history onto the DOM. This interface only correctly functions when given two numbers to calculate (ex. 1 + 2 = 3, NOT 1 + 2 * 4 = 9).

Added features include button styling/animation.

(Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).)

## TODO

### Required Features Tasks

- [x] npm init --y
- [x] npm install express
- [x] set up folders and files: server, public, modules (math folder, math.js like pets module in ajaxIntro) etc
- [x] source everything in (html, JS, JQ)
- [x] require express stuff to spin up server
- [x] create static html home page on server
- [x] create interface on html
- [x] create router on math.js
- [x] send input values to server (index.html --> client.js --> server.js --> math.js), pushing new equation object to the equations array using a POST
- [x] send equations from server to display on the DOM using a GET request
- [x] set up math logic on server side
- [x] display the current answer on the DOM
- [x] update the equation history to include the answer to said equation
- [x] set up C button functionality
- [x] review ALL required baseline functionality on INSTRUCTIONS

### Stretch Goals Tasks

- [x] ceate a new calculator to match the one for Stretch goals and have it function (somewhat) normally
  - [x] create interface on index.html
  - [x] create equal sign functionality to send equation object to the server
  - [x] create GET request to send the equations2 array
  - [x] send the equations from server to the DOM
  - [x] create math logic on server side - works with 2 numbers (n + x works but n + x * y does not). This is fine for now.
- [x] only allow the POST call to happen if all necessary input is ready
  - [x] add to baseline calculator
  - [x] add to stretch interface (added operator button limitations to get around this. Any equation without a number replaces the blank number with a 0).
    [ ] add user limitations to the decimal button.
- [ ] allow a user to clear the history by clicking on a button. Technically this shouldn't be a GET or a POST. Look into making a DELETE request! (DELETE deletes info already on the server)
  - [x] add to baseline calculator
  - [ ] add to stretch interface
- [ ] allow a user to click on an entry in the History list to re-run that calculation. This should display the answer on the calculator interface like a normal calculation.
  - [x] add to baseline calculator
  - [ ] add to stretch interface
- [x] add animation/style to button clicks
  - [x] add to baseline calculator
  - [x] add to stretch interface


Maybe's:
- [ ] install mathjs library and use functionality to see how it works with the STRETCH interface?
- [ ] create math logic on server side that works with multiple numbers and order of operations? (ex. 1+2*3) or limit user input so they can only do 2 numbers...this is hard. look at replacing input field with p tag and using span's to break the equation up into components to use in a conditional statement? split, loop, index, calculate, splice, replace?
 


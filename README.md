# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

## TODO

Required Features Tasks
---
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

Stretch Goals Tasks
---
- [x] ceate a new calculator to match the one for Stretch goals and have it function (somewhat) normally
  - [x] create interface on index.html
  - [x] create equal sign functionality to send equation object to the server
  - [x] create GET request to send the equations2 array
  - [x] send the equations from server to the DOM
  - [x] create math logic on server side - works with 2 numbers (n + x works but n + x * y does not). This is fine for now.
- [ ] only allow the POST call to happen if all necessary input is ready
  - [x] add to baseline calculator
  - [ ] add to stretch interface (this is gonna be interesting/messy)
- [ ] allow a user to clear the history by clicking on a button. Technically this shouldn't be a GET or a POST. Look into making a DELETE request! (DELETE deletes info already on the server)
  - [x] add to baseline calculator
  - [ ] add to stretch interface
- [ ] allow a user to click on an entry in the History list to re-run that calculation. This should display the answer on the calculator interface like a normal calculation.
  - [x] add to baseline calculator
  - [ ] add to stretch interface
- [ ] add animation to button clicks
  - [ ] add to baseline calculator
  - [ ] add to stretch interface



Maybe's:
- [ ] install mathjs library and use functionality to see how it works with the STRETCH interface?
- [ ] create math logic on server side that works with multiple numbers and order of operations? (ex. 1+2*3) or limit user input so they can only do 2 numbers...this is hard af. What's protocol on using libraries like mathjs in the real world
 


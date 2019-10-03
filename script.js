//null, numberA, numberB, operator, equals, point

function clickNumber() {}
function clickOperator() {}
function clickEquals() {}
function clickClear() {}
function clickPoint() {}
function clickBack() {}

/* Calculator Operation Functions */
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const equals = (a, b, operator) => operator(a, b);

/* DOM Objects */
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const equalsButton = document.querySelector("#equals");
const pointButton = document.querySelector("#point");
const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#back");

const screenPara = document.querySelector("#screen");

/* DOM Object Events */
numberButtons.forEach(button => button.addEventListener("click", clickNumber));
operatorButtons.forEach(button => button.addEventListener("click", clickOperator));
equalsButton.addEventListener("click", clickEquals);
pointButton.addEventListener("click", clickPoint);
clearButton.addEventListener("click", clickClear);
backButton.addEventListener("click", clickBack);

/* Global Variables */
let numberA = null;
let numberB = null;
let activeOperator = null;
let lastInputType = null;
//null, numberA, numberB, operator, equals, point

function clickNumber() {
    let numStr = this.value;

    switch (lastInputType) {
        case null:
        case "equals":
            if (numStr === "0") return;
            screenPara.textContent = numStr;
            numberA = Number(numStr);
            lastInputType = "numberA";
            break;
        case "numberA":
            screenPara.textContent += numStr;
            numberA = Number(screenPara.textContent);
            lastInputType = "numberA";
            break;
        case "numberB":
            screenPara.textContent += numStr;
            numberB = Number(screenPara.textContent.match(regex)[2]);
            lastInputType = "numberB";
            break;
        case "operator":
            if (numStr === "0") return;
            screenPara.textContent += numStr;
            numberB = Number(numStr);
            lastInputType = "numberB";
            break;
    }
}

function clickOperator() {
    let opStr = " " + this.textContent + " ";
    let opFn = ops[this.id];

    switch (lastInputType) {
        case null:
            numberA = 0;
            screenPara.textContent = "0" + opStr;
            break;
        case "numberA":
            screenPara.textContent += opStr;
            break;
        case "numberB":
            numberA = equals(numberA, numberB, activeOperator);
            // fallthrough;
        case "operator":
            screenPara.textContent = numberA + opStr;
            break;
        case "equals":
            numberA = Number(screenPara.textContent);
            screenPara.textContent = numberA + opStr;
            break;
    }

    activeOperator = opFn;
    lastInputType = "operator";
}

function clickEquals() {
    switch (lastInputType) {
        case null:
        case "numberA":
            return;
        case "operator":
            numberB = numberA;
            break;
        case "equals":
            numberA = Number(screenPara.textContent);
            break;
    }

    // case "numberB":
    screenPara.textContent = equals(numberA, numberB, activeOperator);
    lastInputType = "equals";
}

function clickClear() {
    switch (lastInputType) {
        case null:
        case "numberA":
        case "numberB":
        case "operator":
        case "equals":
        case "point":
    }
}

function clickPoint() {
    switch (lastInputType) {
        case null:
        case "numberA":
        case "numberB":
        case "operator":
        case "equals":
        case "point":
    }
}

function clickBack() {
    switch (lastInputType) {
        case null:
        case "numberA":
        case "numberB":
        case "operator":
        case "equals":
        case "point":
    }
}

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
const regex = /[^\s]+/g;

/* Special Object Literal */
const ops = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
}
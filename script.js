function simulateClick(e) {
    if (e.key === "0") { document.querySelector("#zero").click(); }
    else if (e.key === "1") { document.querySelector("#one").click(); }
    else if (e.key === "2") { document.querySelector("#two").click(); }
    else if (e.key === "3") { document.querySelector("#three").click(); }
    else if (e.key === "4") { document.querySelector("#four").click(); }
    else if (e.key === "5") { document.querySelector("#five").click(); }
    else if (e.key === "6") { document.querySelector("#six").click(); }
    else if (e.key === "7") { document.querySelector("#seven").click(); }
    else if (e.key === "8") { document.querySelector("#eight").click(); }
    else if (e.key === "9") { document.querySelector("#nine").click(); }
    else if (e.key === ".") { document.querySelector("#point").click(); }
    else if (e.key === "+") { document.querySelector("#add").click(); }
    else if (e.key === "-") { document.querySelector("#subtract").click(); }
    else if (e.key === "*") { document.querySelector("#multiply").click(); }
    else if (e.key === "/") { document.querySelector("#divide").click(); }
    else if (e.key === "Backspace") { document.querySelector("#back").click(); }
    else if (e.key === "=" || e.key === "Enter") { document.querySelector("#equals").click(); }
    else if (e.key === "C" || e.key === "c") { document.querySelector("#clear").click(); }
    else return;
}

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
            if (screenPara.textContent.slice(-1) === ".") {
                screenPara.textContent += "0" + opStr;
            } else {
                screenPara.textContent += opStr;
            }
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
    activeOpStr = opStr;
    lastInputType = "operator";
    containsPoint = false;
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
    calcPara.textContent = numberA + activeOpStr + numberB + " =";
    lastInputType = "equals";
    containsPoint = false;
}

function clickClear() {
    numberA = null;
    numberB = null;
    activeOperator = null;
    activeOpStr = null;
    lastInputType = null;
    containsPoint = false;
    screenPara.textContent = 0;
    calcPara.textContent = "";
}

function clickPoint() {
    if (containsPoint) return;

    switch (lastInputType) {
        case null:
        case "equals":
            screenPara.textContent = "0.";
            numberA = 0;
            lastInputType = "numberA";
            break;
        case "numberA":
        case "numberB":
            screenPara.textContent += ".";
            break;
        case "operator":
            screenPara.textContent += "0.";
            numberB = 0;
            lastInputType = "numberB";
            break;
    }

    containsPoint = true;
}

function clickBack() {
    let displayed = screenPara.textContent.match(regex);
    let i = displayed.length - 1;

    switch (displayed.length) {
        case 0: return;
        case 1: // numberA
            if (displayed[i].length === 1) {
                numberA = null;
                lastInputType = null;
                screenPara.textContent = "0";
            } else {
                if (displayed[i].slice(-1) === ".") {
                    containsPoint = false;
                }
                
                let newNumber = displayed[i].slice(0, displayed[i].length - 1);

                numberA = Number(newNumber);
                screenPara.textContent = newNumber;
                lastInputType = "numberA";
            }
            break;
        case 2: //operator
            screenPara.textContent = displayed[0];
            lastInputType = "numberA";
            activeOperator = null;
            break;
        case 3: // numberB
            if (displayed[i].length === 1) {
                numberB = null;
                lastInputType = "operator";
                screenPara.textContent = displayed[0] + " " + displayed[1] + " ";
            } else {
                if (displayed[i].slice(-1) === ".") {
                    containsPoint = false;
                }

                let newNumber = displayed[i].slice(0, displayed[i].length - 1);

                numberB = Number(newNumber);
                screenPara.textContent = displayed[0] + " " + displayed[1] + " " + newNumber;
                lastInputType = "numberB";
            }
            break;
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
const calcPara = document.querySelector("#calculation");

/* DOM Object Events */
numberButtons.forEach(button => button.addEventListener("click", clickNumber));
operatorButtons.forEach(button => button.addEventListener("click", clickOperator));
equalsButton.addEventListener("click", clickEquals);
pointButton.addEventListener("click", clickPoint);
clearButton.addEventListener("click", clickClear);
backButton.addEventListener("click", clickBack);

window.addEventListener("keydown", simulateClick);

/* Global Variables */
let numberA = null;
let numberB = null;
let activeOperator = null;
let activeOpStr = null;
let lastInputType = null;
let containsPoint = false;
const regex = /[^\s]+/g;

/* Special Object Literal */
const ops = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
}
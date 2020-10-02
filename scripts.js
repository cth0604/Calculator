// global variables

let displayValue = null;
let firstValue = null;
let secondValue = null;
let operator = null;
let startSecond = false;
let canEnd = false;

// functions

// operation functions
function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    if (num2 == 0) {
        displayValue = null;
        firstValue = null;
        secondValue = null;
        operator = null;
        startSecond = false;
        canEnd = true;
        const content = document.querySelector('.displayText');
        content.textContent = 'ERROR';
        return 'ERROR'
    } else {
        return num1 / num2;
    }
}

function operate (operator, num1, num2) {
    return operator(num1, num2);
}

function modulo (num1, num2) {
    return num1 % num2;
}


// event listeners
function displays (e) {
    if (firstValue != null && operator == null) {
        return;
    }

    if (this.innerText === '.') {
        if (dotCannotBeUsed()) {
            return;
        }
    }

    const content = document.querySelector('.displayText');
    if (startSecond === false && canEnd === false) {
        content.textContent += this.innerText;
    } else {
        if (operator != null) {
            unhighlightOperator();  
        }
        content.textContent = this.innerText;
        startSecond = false;
        canEnd = false;
    }
    displayValue = parseFloat(content.textContent);
}

function saveOperator (e) {
    const content = document.querySelector('.displayText');
    if (content.textContent === '' || content.textContent === '.') {
        return;
    }   

    if (firstValue == null) {
        firstValue = displayValue;
    } else if (displayValue != null) {
        secondValue = displayValue;
        let result = operate(operator, firstValue, secondValue);
        if (result === 'ERROR') {
            return;
        }
        firstValue = result;
        const content = document.querySelector('.displayText');
        content.textContent = result;
        displayValue = result;
        secondValue = null;
    } else {

    }
    displayValue = null;
    if (operator != null) {
        unhighlightOperator();
    }
    highlightOperator(this.classList[0]);
    operator = window[this.classList[0]];
    startSecond = true;
}

function reset (e) {
    if (operator != null) {
        unhighlightOperator();
    }
    displayValue = null;
    firstValue = null;
    secondValue = null;
    operator = null;
    tartSecond = false;
    canEnd = false;
    const content = document.querySelector('.displayText');
    content.textContent = '';
}

function equate (e) {
    const content = document.querySelector('.displayText');
    if (firstValue == null || displayValue == null || content.textContent === '.') {
        return;
    }
    secondValue = displayValue;
    let result = operate(operator, firstValue, secondValue);
    if (result === 'ERROR') {
        return;
    }
    content.textContent = result;
    displayValue = result;
    operator = null;
    firstValue = null;
    secondValue = null;
    startSecond = false;
    canEnd = true;
}

function erase (e) {
    if (displayValue == null) {
        return;
    } else if (canEnd || startSecond) {
        return;
    } else {
        const content = document.querySelector('.displayText');
        content.textContent = content.textContent.slice(0, -1);
        if (content.textContent === '' || content.textContent === '.' || content.textContent === '-') {
            displayValue = null;
            content.textContent = '';
        } else {
            displayValue = parseFloat(content.textContent);
        }
    }
}

function unhighlightOperator () {
    const previousOperator = document.querySelector('.' + operator.name);
    previousOperator.classList.remove('selected');
}

function highlightOperator (operatorString) {
    const currentOperator = document.querySelector('.' + operatorString);
    currentOperator.classList.add('selected');
}

function dotCannotBeUsed () {
    const content = document.querySelector('.displayText');
    return content.innerText.includes('.') ? true : false;
}

function changeSign () {
    const content = document.querySelector('.displayText');
    if (content.textContent === '' && displayValue === null) {
        return;
    } 
    if (startSecond) {
        firstValue *= -1
    } else {
        displayValue *= -1;
    }
    content.textContent = content.textContent.includes('-') ? content.textContent.slice(1) : '-' + content.textContent;
}


// function section ends

const numbers = document.querySelectorAll('.number');
Array.from(numbers).forEach(number => number.addEventListener('click', displays))

const operators = document.querySelectorAll('.operator');
Array.from(operators).forEach(operator => operator.addEventListener('click', saveOperator))

const equal = document.querySelector('.equal');
equal.addEventListener('click', equate);

const clear = document.querySelector('.clear');
clear.addEventListener('click', reset);

const dot = document.querySelector('.dot');
dot.addEventListener('click', displays);

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', erase);

const sign = document.querySelector('.sign');
sign.addEventListener('click', changeSign);
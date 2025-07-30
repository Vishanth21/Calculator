let firstOperand = null, displayValue = null, operator = null,waitingSecondOperand = false, tempOperand = null;

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operand1,operand2,operator) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);
    switch(operator) {
        case 'add':
            return add(operand1,operand2);
        case 'subtract':
            return subtract(operand1,operand2);
        case 'multiply':
            return multiply(operand1,operand2);
        case 'divide':
            if(operand2 === 0)
                return "so tuff 🥀";
            return divide(operand1,operand2);
    };
}

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

function removeActiveOperator() {
    const activeOperator = document.querySelector('.operator.active');
    if(activeOperator)
        activeOperator.classList.remove('active');
}

window.addEventListener('DOMContentLoaded',clearAll);

buttons.addEventListener('click',function(event) {
    if(event.target.classList.contains('button')) {
        if(event.target.id === 'AC') {
            clearAll();
        }
        if(event.target.id === 'CE' && display.value) {
            if(displayValue)
                displayValue = displayValue.slice(0,displayValue.length - 1);
            display.value = display.value.slice(0,display.value.length - 1);
        }
        if(event.target.id === 'equals') {
            removeActiveOperator();
            if(displayValue && firstOperand && operator) {
                tempOperand = displayValue;
                printResult(firstOperand,displayValue);                
            }
            else if(displayValue === null && firstOperand && operator) {
                if(!tempOperand)
                    tempOperand = firstOperand;
                printResult(firstOperand,tempOperand);
            }
        }
        if(event.target.id === 'percentage') {
            if(displayValue) {
                displayValue = (Number(displayValue)/100).toString();
                display.value = displayValue;
            }
        }
        if(event.target.classList.contains('operator') && event.target.id !== 'percentage') {
            removeActiveOperator();
            event.target.classList.add('active');
            if(firstOperand === null) {
                firstOperand = displayValue;
                displayValue = null;
                display.value = '';
                operator = event.target.id;
                waitingSecondOperand = true;
            }
            else if(waitingSecondOperand) {
                printResult(firstOperand,displayValue);
                operator = event.target.id;
            }
        }
        if(event.target.classList.contains('digit') || event.target.id === 'decimal') {
            if(event.target.id === 'decimal') {
                if(!displayValue) {
                    displayValue = '0.';
                    display.value = displayValue;
                }
                else if(!displayValue.includes('.')) {
                    displayValue += '.';
                    display.value = displayValue;
                }
            }
            else {
                if(!displayValue)
                    displayValue = '';
                displayValue += event.target.id;
                display.value = displayValue;
            }
        }
    }    
})

function printResult(first,second) {
    const result = operate(first,second,operator);
    if(typeof result === 'string') {
        display.value = result;
        setTimeout(() => clearAll(),1500);
    }
    else {
        display.value = result;
        firstOperand = result;
        displayValue = null;
    }
}

function clearAll() {
    firstOperand = null;
    displayValue = null;
    operator = null;
    tempOperand = null;
    waitingSecondOperand = false;
    display.value = '';
    removeActiveOperator();
}
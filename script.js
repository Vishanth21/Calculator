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
            return divide(operand1,operand2);

    };
}

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click',function(event) {
    if(event.target.classList.contains('button')) {
        if(event.target.id === 'AC') {
            firstOperand = null;
            displayValue = null;
            operator = null;
            tempOperand = null;
            waitingSecondOperand = false;
            display.value = displayValue;
        }
        if(event.target.id === 'CE' && display.value) {
            if(displayValue)
                displayValue = displayValue.slice(0,displayValue.length - 1);
            display.value = display.value.slice(0,display.value.length - 1);
        }
        if(event.target.id === 'equals') {
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
    }    
})

function printResult(first,second) {
    display.value = operate(first,second,operator);
    firstOperand = display.value;
    displayValue = null;
}
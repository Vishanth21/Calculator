const VALID_OPERATORS = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
};
window.addEventListener('DOMContentLoaded',() => {
    clearAll();
    if(!window.sessionStorage.getItem('hasSeenAlert')) {
        alert('Works with keyboard btw:\n1. Clear All (AC): Escape,Delete.\n2. Clear Entry (CE): Backspace.\n3. Equals (=): Enter.\n4. Operators and digits: Respective keys.');
        window.sessionStorage.setItem('hasSeenAlert',true);
    }
});

const calculator = {
    firstOperand: null,
    displayValue: null,
    operator: null,
    waitingSecondOperand: false,
    tempOperand: null,
    add(a,b) {
        return a+b;
    },
    subtract(a,b) {
        return a-b;
    },
    multiply(a,b) {
        return a*b;
    },
    divide(a,b) {
        return a/b;
    },  
    operate(operand1,operand2,operator) {
        operand1 = Number(operand1);
        operand2 = Number(operand2);
        switch(operator) {
            case 'add':
                return this.add(operand1,operand2);
            case 'subtract':
                return this.subtract(operand1,operand2);
            case 'multiply':
                return this.multiply(operand1,operand2);
            case 'divide':
                if(operand2 === 0)
                    return "so tuff 🥀";
                return this.divide(operand1,operand2);
        }
    },
}

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', function(event) {
    if(event.target.classList.contains('button')) {
        if(event.target.id === 'AC') {
            clearAll();
        }
        if(event.target.id === 'CE' && display.value) {
            clearEntry();
        }
        if(event.target.id === 'equals') {
            handleResult();
        }
        if(event.target.id === 'percentage') {
            handlePercentage();
        }
        if(event.target.classList.contains('operator') && event.target.id !== 'percentage') {
            handleOperator(event.target);
        }
        if(event.target.classList.contains('digit') || event.target.id === 'decimal') {
            handleDigit(event.target.id);
        }
    }    
})

window.addEventListener('keydown', function(event) {
    if(event.key === 'Escape' || event.key === 'Delete') {
        clearAll();
    }
    if(event.key === 'Backspace' && display.value) {
        clearEntry();
    }
    if(event.key === 'Enter') {
        handleResult();
    }
    if(event.key === '%') {
        handlePercentage();
    }
    if(event.key in VALID_OPERATORS) {
        const operatorObject = document.querySelector(`#${VALID_OPERATORS[event.key]}`);
        handleOperator(operatorObject);
    }
    if(!isNaN(Number(event.key)) || event.key === '.') {
        const key = event.key === '.' ? 'decimal' : event.key;
        handleDigit(key);
    }
})

function printResult(first,second) {
    const result = calculator.operate(first,second,calculator.operator);
    if(typeof result === 'string') {
        display.value = result;
        setTimeout(() => clearAll(),1500);
    }
    else {
        display.value = result;
        calculator.firstOperand = result;
        calculator.displayValue = null;
    }
}

function clearAll() {
    calculator.firstOperand = null;
    calculator.displayValue = null;
    calculator.operator = null;
    calculator.tempOperand = null;
    calculator.waitingSecondOperand = false;
    display.value = '';
    removeActiveOperator();
}

function handleDigit(key) {
    if(!calculator.waitingSecondOperand) {
        calculator.firstOperand = null;
        calculator.operator = null;
    }
    calculator.waitingSecondOperand = true;
    if(key === 'decimal') {
        if(!calculator.displayValue) {
            calculator.displayValue = '0.';
        }
        else if(!calculator.displayValue.includes('.')) {
            calculator.displayValue += '.';
        }
    }
    else {
        if(!calculator.displayValue)
            calculator.displayValue = '';
        calculator.displayValue += key;
    }
    display.value = calculator.displayValue;
}

function handleOperator(operatorObject) {
    if(calculator.displayValue === null && calculator.waitingSecondOperand === false) {
        calculator.operator = operatorObject.id;
        calculator.waitingSecondOperand = true;
        display.value = null;
        removeActiveOperator();
        operatorObject.classList.add('active');
        return;
    }
    if(calculator.firstOperand === null) {
        calculator.firstOperand = calculator.displayValue;
        display.value = '';
        calculator.operator = operatorObject.id;
        calculator.waitingSecondOperand = true;
    }
    else if(calculator.waitingSecondOperand) {
        printResult(calculator.firstOperand,calculator.displayValue);
        calculator.operator = operatorObject.id;
    }
    calculator.displayValue = null;
    removeActiveOperator();
    operatorObject.classList.add('active');
}

function handleResult() {
    removeActiveOperator();
    if(calculator.displayValue && calculator.firstOperand && calculator.operator) {
        calculator.tempOperand = calculator.displayValue;
        printResult(calculator.firstOperand,calculator.displayValue);                
    }
    else if(calculator.displayValue === null && calculator.firstOperand && calculator.operator) {
        if(!calculator.tempOperand)
            calculator.tempOperand = calculator.firstOperand;
        printResult(calculator.firstOperand,calculator.tempOperand);
    }
    calculator.waitingSecondOperand = false;
}

function handlePercentage() {
    if(calculator.displayValue) {
        calculator.displayValue = (Number(calculator.displayValue)/100).toString();
        display.value = calculator.displayValue;
    }
}

function clearEntry() {
    if(calculator.displayValue)
        calculator.displayValue = calculator.displayValue.slice(0,calculator.displayValue.length - 1);
    display.value = calculator.displayValue;
}

function removeActiveOperator() {
    const activeOperator = document.querySelector('.operator.active');
    if(activeOperator)
        activeOperator.classList.remove('active');
}

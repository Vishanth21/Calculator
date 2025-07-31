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

function removeActiveOperator() {
    const activeOperator = document.querySelector('.operator.active');
    if(activeOperator)
        activeOperator.classList.remove('active');
}

window.addEventListener('DOMContentLoaded',clearAll);

buttons.addEventListener('click',function(event) {
    if(event.target.classList.contains('button')) {
        console.log(event.target.id);
        if(event.target.id === 'AC') {
            clearAll();
        }
        if(event.target.id === 'CE' && display.value) {
            if(calculator.displayValue)
                calculator.displayValue = calculator.displayValue.slice(0,calculator.displayValue.length - 1);
            display.value = calculator.displayValue;
        }
        if(event.target.id === 'equals') {
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
        }
        if(event.target.id === 'percentage') {
            if(calculator.displayValue) {
                calculator.displayValue = (Number(calculator.displayValue)/100).toString();
                display.value = calculator.displayValue;
            }
        }
        if(event.target.classList.contains('operator') && event.target.id !== 'percentage') {
            removeActiveOperator();
            event.target.classList.add('active');
            if(calculator.firstOperand === null) {
                calculator.firstOperand = calculator.displayValue;
                calculator.displayValue = null;
                display.value = '';
                calculator.operator = event.target.id;
                calculator.waitingSecondOperand = true;
            }
            else if(calculator.waitingSecondOperand) {
                printResult(calculator.firstOperand,calculator.displayValue);
                calculator.operator = event.target.id;
            }
        }
        if(event.target.classList.contains('digit') || event.target.id === 'decimal') {
            if(event.target.id === 'decimal') {
                if(!calculator.displayValue) {
                    calculator.displayValue = '0.';
                    display.value = calculator.displayValue;
                }
                else if(!calculator.displayValue.includes('.')) {
                    calculator.displayValue += '.';
                    display.value = calculator.displayValue;
                }
            }
            else {
                if(!calculator.displayValue)
                    calculator.displayValue = '';
                calculator.displayValue += event.target.id;
                display.value = calculator.displayValue;
            }
        }
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
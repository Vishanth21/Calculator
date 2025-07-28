let operand1, operand2, operator;

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
let operand1, operand2, operator;

function add(a,b) {
    return Number(a) + Number(b);
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
        case '+':
            return add(operand1,operand2);
        case '-':
            return subtract(operand1,operand2);
        case '*':
            return multiply(operand1,operand2);
        case '/':
            return divide(operand1,operand2);

    };
}
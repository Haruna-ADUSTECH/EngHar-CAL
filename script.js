let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
    } else if (currentInput !== '') {
        currentInput += op;
    }
    display.value = currentInput;
}

function appendDecimal() {
    let lastNumber = currentInput.split(/[-+*/=]/).pop();
    if (!lastNumber.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function calculate() {
    try {
        let equation = currentInput.replace('=', '');
        let solution = solveQuadratic(equation);
        display.value = solution;
        currentInput = solution;
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

function solveQuadratic(equation) {
    // Ensure the equation contains 'x^2'
    if (!equation.includes('x^2')) {
        throw new Error('Not a quadratic equation');
    }

    // Extract coefficients a, b, and c
    let { a, b, c } = extractCoefficients(equation);

    // Calculate the discriminant
    let discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return 'No Real Solutions';
    } else {
        let sqrtDiscriminant = Math.sqrt(discriminant);
        let x1 = (-b + sqrtDiscriminant) / (2 * a);
        let x2 = (-b - sqrtDiscriminant) / (2 * a);

        return `x1 = ${x1}, x2 = ${x2}`;
    }
}

function extractCoefficients(equation) {
    // Normalize the equation by removing spaces
    equation = equation.replace(/\s+/g, '');

    // Match the pattern for ax^2, bx, and c
    let aMatch = equation.match(/([-+]?\d*\.?\d*)x\^2/);
    let bMatch = equation.match(/([-+]?\d*\.?\d*)x(?!\^2)/);
    let cMatch = equation.match(/([-+]?\d*\.?\d+)(?!x)/);

    // Parse coefficients or default to 1 or 0
    let a = aMatch ? parseFloat(aMatch[1] || '1') : 1;
    let b = bMatch ? parseFloat(bMatch[1] || (bMatch[0][0] === '-' ? '-1' : '1')) : 0;
    let c = cMatch ? parseFloat(cMatch[1]) : 0;

    return { a, b, c };
}

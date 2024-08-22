// script.js

function calculateExpression() {
    const expression = document.getElementById("expression").value;
    let result = "";

    try {
        // Replace '^' with '**' for exponentiation
        const sanitizedExpression = expression.replace(/\^/g, "**");

        // Evaluate the expression using JavaScript's eval() function
        result = eval(sanitizedExpression);

        // Display the result
        document.getElementById("result").innerText = `Result: ${result}`;
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }

    // Prevent the form from submitting (no page refresh)
    return false;
}

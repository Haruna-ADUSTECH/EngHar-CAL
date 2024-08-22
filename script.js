document.addEventListener("DOMContentLoaded", function() {
    const calcForm = document.getElementById("calcForm");
    const resultDisplay = document.getElementById("result");

    calcForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const calculationType = document.getElementById("calculationType").value;
        const expression = document.getElementById("expression").value;
        const variable = document.getElementById("variable").value || "x";
        const value = document.getElementById("value").value || null;

        if (!expression) {
            displayResult("Please enter an expression", true);
            return;
        }

        try {
            let result;

            switch (calculationType) {
                case "evaluate":
                    result = evaluateExpression(expression, variable, value);
                    break;
                case "differentiate":
                    result = differentiateExpression(expression, variable, value);
                    break;
                case "integrate":
                    result = integrateExpression(expression, variable, value);
                    break;
                case "limit":
                    result = calculateLimit(expression, variable, value);
                    break;
                case "solve":
                    result = solveEquation(expression, variable);
                    break;
                default:
                    result = "Invalid calculation type selected";
            }

            displayResult(result);
        } catch (error) {
            displayResult("Error in calculation: " + error.message, true);
        }
    });

    function evaluateExpression(expr, variable, value) {
        let formattedExpr = expr.replace(/\^/g, "**");
        if (value !== null) {
            formattedExpr = formattedExpr.replace(new RegExp(variable, "g"), value);
        }
        return new Function('return ' + formattedExpr)();
    }

    function differentiateExpression(expr, variable, point) {
        // Use a library like math.js for symbolic differentiation
        const result = math.derivative(expr, variable).toString();
        if (point !== null) {
            return `f'(${point}) = ` + math.evaluate(result.replace(new RegExp(variable, "g"), point));
        }
        return result;
    }

    function integrateExpression(expr, variable, point) {
        // Use a library like math.js for symbolic integration
        const result = math.integral(expr, variable).toString();
        if (point !== null) {
            return `∫(${expr}) d${variable} = ` + math.evaluate(result.replace(new RegExp(variable, "g"), point));
        }
        return result + " + C";
    }

    function calculateLimit(expr, variable, point) {
        // Use a library like math.js for limits
        return math.limit(expr, variable, point);
    }

    function solveEquation(expr, variable) {
        // Use a library like math.js to solve equations
        const solutions = math.solve(expr, variable);
        return solutions.length > 0 ? solutions.join(", ") : "No solution found";
    }

    function displayResult(result, isError = false) {
        resultDisplay.textContent = `Result: ${result}`;
        resultDisplay.style.color = isError ? "red" : "green";
    }
});

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.matheclipse.core.eval.ExprEvaluator, org.matheclipse.core.expression.F, org.matheclipse.core.interfaces.IExpr" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculation Result - EngHar_CAL</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Calculation Result</h1>
        <div id="result">
            <%
                // Retrieve input parameters
                String calculationType = request.getParameter("calculationType");
                String expression = request.getParameter("expression");
                String variable = request.getParameter("variable");

                ExprEvaluator util = new ExprEvaluator(false, 100);
                IExpr result = null;

                try {
                    switch (calculationType) {
                        case "solve":
                            // Replace '=' with '==' to correctly form an equation for solving
                            String equation = expression.replace("=", "==");
                            result = util.eval("Solve(" + equation + ", " + variable + ")");
                            break;
                        // Other cases (evaluate, differentiate, etc.) would go here
                        default:
                            result = F.stringx("Invalid calculation type selected");
                    }
                } catch (Exception e) {
                    result = F.stringx("Error in calculation: " + e.getMessage());
                }
            %>
            <p>Expression: <%= expression %></p>
            <p>Result: <%= result != null ? result.toString() : "No result" %></p>
        </div>
        <a href="index.html">Back to Calculator</a>
    </div>
</body>
</html>

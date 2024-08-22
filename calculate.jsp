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
                String calculationType = request.getParameter("calculationType");
                String expression = request.getParameter("expression");
                String variable = request.getParameter("variable");
                String valueStr = request.getParameter("value");
                double value = valueStr != null && !valueStr.isEmpty() ? Double.parseDouble(valueStr) : 0;

                ExprEvaluator util = new ExprEvaluator(false, 100);
                IExpr result = null;
                
                try {
                    switch (calculationType) {
                        case "evaluate":
                            result = util.eval(expression);
                            break;
                        case "differentiate":
                            result = util.eval("D(" + expression + "," + variable + ")");
                            if (!valueStr.isEmpty()) {
                                result = util.eval(result.toString() + " /. " + variable + " -> " + value);
                            }
                            break;
                        case "integrate":
                            result = util.eval("Integrate(" + expression + "," + variable + ")");
                            break;
                        case "limit":
                            result = util.eval("Limit(" + expression + "," + variable + " -> " + value + ")");
                            break;
                        case "solve":
                            result = util.eval("Solve(" + expression + ", " + variable + ")");
                            break;
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

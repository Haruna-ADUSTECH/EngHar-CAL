<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, javax.script.*" %>
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
                String expression = request.getParameter("expression");
                String result = "";
                try {
                    ScriptEngineManager manager = new ScriptEngineManager();
                    ScriptEngine engine = manager.getEngineByName("JavaScript");
                    result = engine.eval(expression).toString();
                } catch (Exception e) {
                    result = "Error in calculation: " + e.getMessage();
                }
            %>
            <p>Expression: <%= expression %></p>
            <p>Result: <%= result %></p>
        </div>
        <a href="index.html">Back to Calculator</a>
    </div>
</body>
</html>

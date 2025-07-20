document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.getElementById("theme-switch");
    const body = document.body;
    const display = document.getElementById("result");
    const history = document.getElementById("history");
    const buttons = document.querySelectorAll(".btn");
    const backspaceBtn = document.getElementById("backspace");

    // Load theme from local storage
    const savedTheme = localStorage.getItem("theme") || "light";
    body.classList.add(savedTheme);
    themeButton.innerText = savedTheme === "dark" ? "☀️" : "🌙";

    // Toggle theme
    themeButton.addEventListener("click", function () {
        if (body.classList.contains("light")) {
            body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
            themeButton.innerText = "☀️";
        } 
        else {
            body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
            themeButton.innerText = "🌙";
        }
    });

    // Calculator logic
    let expression = "";
    
    // Backspace functionality
    backspaceBtn.addEventListener("click", function () {
        if (expression.length > 0) {
            expression = expression.slice(0, -1);
            display.innerText = expression.length > 0 ? expression : "0";
        }
    });

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            if (this === backspaceBtn) return; // Skip backspace button

            const value = this.innerText;

            if (value === "C") {
                expression = "";
                history.innerText = "";
                display.innerText = "0";
            } else if (value === "=") {
                try {
                    let result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
                    history.innerText = expression;
                    display.innerText = result;
                    expression = result.toString();
                } catch {
                    display.innerText = "Error";
                    expression = "";
                }
            } else {
                if (display.innerText === "0" || display.innerText === "Error") {
                    display.innerText = value;
                    expression = value;
                } else {
                    display.innerText += value;
                    expression += value;
                }
            }
        });
    });
});
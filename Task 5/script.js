document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'];
    
    if (validKeys.includes(key)) {
        event.preventDefault();
        
        switch (key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                backspace();
                break;
            case 'Escape':
                clearDisplay();
                break;
            default:
                appendToDisplay(key);
        }
    }
}

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function calculate() {
    const display = document.getElementById("display");
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function squareRoot() {
    const display = document.getElementById("display");
    const value = parseFloat(display.value);
    if (value >= 0) {
        display.value = Math.sqrt(value);
    } else {
        display.value = "Error";
    }
}

function percentage() {
    const display = document.getElementById("display");
    const value = parseFloat(display.value);
    display.value = value / 100;
}

function exponent() {
    const display = document.getElementById("display");
    const value = parseFloat(display.value);
    display.value = value * value;
}

function backspace() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

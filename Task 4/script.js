let conversionHistory = [];

document.getElementById('convertButton').addEventListener('click', convertTemperature);
document.getElementById('temperatureInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

function convertTemperature() {
    const temperature = parseFloat(document.getElementById('temperatureInput').value);
    const unit = document.querySelector('input[name="unit"]:checked').value;
    let convertedTemperature;
    let resultText;

    if (isNaN(temperature)) {
        document.getElementById('result').innerText = 'Please enter a valid number';
        return;
    }

    if (unit === 'celsius') {
        convertedTemperature = (temperature * 9/5) + 32;
        resultText = `${temperature}°C is ${convertedTemperature.toFixed(2)}°F`;
    } else {
        convertedTemperature = (temperature - 32) * 5/9;
        resultText = `${temperature}°F is ${convertedTemperature.toFixed(2)}°C`;
    }

    document.getElementById('result').innerText = resultText;
    
    // Add to history
    conversionHistory.unshift(resultText);
    if (conversionHistory.length > 5) {
        conversionHistory.pop();
    }
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    conversionHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Toggle between Celsius and Fahrenheit
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const label = this.value === 'celsius' ? 'Celsius' : 'Fahrenheit';
        document.getElementById('temperatureInput').placeholder = `Enter temperature in ${label}`;
    });
});

// Initialize placeholder
document.getElementById('temperatureInput').placeholder = 'Enter temperature in Celsius';

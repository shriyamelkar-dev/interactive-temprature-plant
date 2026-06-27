// Custom Alert
function showCustomAlert(message) {
    const old = document.getElementById('customAlert');
    if (old) old.remove();

    const modal = document.createElement('div');
    modal.id = 'customAlert';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); display: flex;
        align-items: center; justify-content: center; z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #6b40c3, #8e66e3); color: white; padding: 35px 45px;
                    border-radius: 28px; text-align: center; max-width: 400px; box-shadow: 0 25px 60px rgba(0,0,0,0.5);">
            <h3 style="margin: 0 0 20px 0; color: #dac1ff;">🌸 Temperature Converter</h3>
            <p style="font-size: 1.25rem; margin: 0 0 25px 0;">${message}</p>
            <button onclick="this.closest('#customAlert').remove()" 
                    style="background:white; color:#6b40c3; border:none; padding:14px 40px; border-radius:50px; font-weight:700; cursor:pointer;">
                OK ✨
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Main Logic
document.getElementById('tempForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const tempInput = document.getElementById('tempnum');
    const tempValue = parseFloat(tempInput.value);
    const unit = document.querySelector('input[name="tempunit"]:checked');
    const resultDiv = document.getElementById('result');
    const plantBox = document.getElementById('plantBox');
    const plantStatus = document.getElementById('plantStatus');

    if (isNaN(tempValue) || tempValue === '') {
        showCustomAlert("Please enter a valid number 🌸");
        tempInput.focus();
        return;
    }
    if (!unit) {
        showCustomAlert("Please select Celsius or Fahrenheit ✨");
        return;
    }

    let resultText = '';
    let celsius = 0;

    if (unit.value === "Celsius") {
        celsius = tempValue;
        const f = (tempValue * 9/5) + 32;
        resultText = `${tempValue}°C = <strong>${f.toFixed(2)}°F</strong>`;
    } else {
        celsius = (tempValue - 32) * 5/9;
        resultText = `${tempValue}°F = <strong>${celsius.toFixed(2)}°C</strong>`;
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = resultText;

    // Plant Reaction
    if (celsius < 10) {
        plantBox.className = 'plant-container cold';
        document.getElementById('plant').textContent = '🥶🌿';
        plantStatus.textContent = "Too Cold!";
        plantStatus.style.color = "#7ec8ff";
    } else if (celsius > 35) {
        plantBox.className = 'plant-container hot';
        document.getElementById('plant').textContent = '🥵🌱';
        plantStatus.textContent = "Too Hot!";
        plantStatus.style.color = "#ff6b6b";
    } else {
        plantBox.className = 'plant-container';
        document.getElementById('plant').textContent = '🪴';
        plantStatus.textContent = "Perfect Temperature!";
        plantStatus.style.color = "#7cff9b";
    }
});
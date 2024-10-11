function handleSignup(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return false;
    }

    const constraints = checkPasswordStrength(newPassword);
    if (!Object.values(constraints).every(Boolean)) {
        errorMessage.textContent = "Password does not meet all requirements.";
        return false;
    }

    // Store the new user credentials in localStorage
    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    alert("Signup successful! You can now log in.");
    window.location.href = 'index.html';
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Validate credentials
    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'welcome.html';
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
}

// Add this to your existing script.js file
function logout() {
    // Clear any session data or tokens here
    alert("You have been logged out.");
    window.location.href = 'index.html';
}

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(toggleId);

    if (passwordInput && toggleButton) {
        toggleButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }
}

// Check password strength and show constraints
function checkPasswordStrength(password) {
    const constraints = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    return constraints;
}

function updatePasswordConstraints() {
    const password = document.getElementById('newPassword').value;
    const constraints = checkPasswordStrength(password);
    const constraintsElement = document.getElementById('passwordConstraints');

    if (constraintsElement) {
        constraintsElement.innerHTML = `
            <p class="${constraints.length ? 'valid' : 'invalid'}">At least 8 characters</p>
            <p class="${constraints.uppercase ? 'valid' : 'invalid'}">At least one uppercase letter</p>
            <p class="${constraints.lowercase ? 'valid' : 'invalid'}">At least one lowercase letter</p>
            <p class="${constraints.number ? 'valid' : 'invalid'}">At least one number</p>
            <p class="${constraints.special ? 'valid' : 'invalid'}">At least one special character</p>
        `;
    }
}

// Initialize password visibility toggles and constraints
document.addEventListener('DOMContentLoaded', function() {
    togglePasswordVisibility('newPassword', 'toggleNewPassword');
    togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
    togglePasswordVisibility('password', 'togglePassword');

    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', updatePasswordConstraints);
    }
});

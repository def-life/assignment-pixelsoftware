console.log("Dummy Data for copy paste", { first_name: "Abhi", last_name: "kumar", email: "abhi@gmail.com", phone_number: "1234567890", password: "random@1234" });


// utility functions
function validateString(input) {
    if (typeof input !== 'string') {
        return false;
    }
    return input.length > 0 && /^[A-Za-z\s]+$/.test(input);
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}


function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phoneNumber);
}


function validatePassword(password) {
    // At least 8 characters, 1 letter, 1 number, 1 special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}



function displayError(element, errorMessage) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('text-red-600', 'text-sm', 'error-message');
    errorElement.textContent = errorMessage;
    element.parentNode.appendChild(errorElement);
}


// entry point

function main() {

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); // Show/hide mobile menu
    });


    // form stuff


    const form = document.querySelector('form');
    if (!form) {
        console.error('Form not found');
        return;
    }

    const firstNameInput = form.querySelector('#first-name');
    const lastNameInput = form.querySelector('#last-name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const passwordInput = form.querySelector('#password');

    if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !passwordInput) {
        console.error('One or more form inputs are missing');
        return;
    }

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        let allFieldsFilled = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(errorMessage => {
            errorMessage.remove();
        });

        // Check for empty fields
        [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput].forEach(input => {
            if (!input.value) {
                displayError(input, 'Field is required');
                allFieldsFilled = false;
            }
        });

        if (!allFieldsFilled) return;

        // Validate inputs
        if (!validateString(firstName)) {
            displayError(firstNameInput, 'Invalid first name');
            return;
        }
        if (!validateString(lastName)) {
            displayError(lastNameInput, 'Invalid last name');
            return;
        }
        if (!validateEmail(email)) {
            displayError(emailInput, 'Invalid email');
            return;
        }
        if (!validatePhoneNumber(phone)) {
            displayError(phoneInput, 'Invalid phone number');
            return;
        }
        if (!validatePassword(password)) {
            displayError(passwordInput, 'Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character');
            return;
        }

        // log the data to the console
        console.log("Sent Data:", {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phone,
            password
        });
    }
}

document.addEventListener('DOMContentLoaded', main);

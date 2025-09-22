// script.js

document.addEventListener('DOMContentLoaded', function () {
    // PART 1: JAVASCRIPT EVENT HANDLING

    // Matatu Horn Click Event
    const clickBtn = document.getElementById('clickBtn');
    if (clickBtn) {
        clickBtn.addEventListener('click', function () {
            const clickMessage = document.getElementById('clickMessage');
            if (clickMessage) {
                clickMessage.textContent = 'Puuuup! Puuuup! 🚨 Matatu horn sounding!';
                clickMessage.style.color = '#e74c3c';
                clickMessage.style.fontWeight = 'bold';
            }
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Matatu Decoration Mouse Events
    const matatuBox = document.getElementById('colorBox');
    const mouseStatus = document.getElementById('mouseStatus');
    const matatuColors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];

    if (matatuBox && mouseStatus) {
        matatuBox.addEventListener('mouseover', function () {
            const randomColor = matatuColors[Math.floor(Math.random() * matatuColors.length)];
            const body = this.querySelector('.matatu-body');
            if (body) body.style.backgroundColor = randomColor;
            mouseStatus.textContent = 'Nice color! Click to add more details';
            mouseStatus.style.color = randomColor;
        });

        matatuBox.addEventListener('mouseout', function () {
            mouseStatus.textContent = 'Hover or click to customize';
            mouseStatus.style.color = '';
        });

        matatuBox.addEventListener('click', function () {
            const randomPattern = Math.floor(Math.random() * 3) + 1;
            const body = this.querySelector('.matatu-body');
            if (body) {
                if (randomPattern === 1) {
                    body.style.backgroundImage = 'linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.3) 50%)';
                    body.style.backgroundSize = '20px 20px';
                } else if (randomPattern === 2) {
                    body.style.backgroundImage = 'radial-gradient(circle, rgba(255,255,255,0.3) 20%, transparent 20%)';
                    body.style.backgroundSize = '15px 15px';
                } else {
                    body.style.backgroundImage = 'none';
                }
            }
            mouseStatus.textContent = 'Pattern added! Looks like a real matatu now!';
            mouseStatus.style.color = '#f39c12';
        });
    }

    // Route Search Keyboard Event
    const routeInput = document.getElementById('keyInput');
    const routeDisplay = document.getElementById('keyDisplay');
    const nairobiRoutes = {
        'westlands': 'Route 106 - Westlands to Town',
        'kawangware': 'Route 23 - Kawangware to Town',
        'kibera': 'Route 32 - Kibera to Town',
        'karen': 'Route 24 - Karen to Town',
        'runda': 'Route 106 - Runda to Town',
        'buruburu': 'Route 33 - Buruburu to Town',
        'kariobangi': 'Route 8 - Kariobangi to Town',
        'kangemi': 'Route 23 - Kangemi to Town'
    };

    if (routeInput && routeDisplay) {
        routeInput.addEventListener('keyup', function () {
            const inputText = this.value.toLowerCase();
            if (inputText.length > 2) {
                let foundRoute = 'Route not found. Try: Westlands, Kawangware, Kibera';
                for (const [key, value] of Object.entries(nairobiRoutes)) {
                    if (inputText.includes(key)) {
                        foundRoute = value;
                        break;
                    }
                }
                routeDisplay.textContent = foundRoute;
                routeDisplay.style.backgroundColor = '#2ecc71';
                routeDisplay.style.color = 'white';
            } else {
                routeDisplay.textContent = 'Route: Type more to search';
                routeDisplay.style.backgroundColor = '#dee2e6';
                routeDisplay.style.color = 'black';
            }
        });
    }

    // PART 2: INTERACTIVE ELEMENTS

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // Fare Calculator
    let distance = 0;
    const fareDisplay = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');

    function calculateFare() {
        let fare = 50;
        if (distance > 5) {
            fare += (distance - 5) * 10;
        }
        if (fareDisplay) {
            fareDisplay.textContent = `KSh ${fare}`;
            fareDisplay.style.color = fare > 100 ? '#e74c3c' : '#2ecc71';
        }
    }

    if (incrementBtn) {
        incrementBtn.addEventListener('click', function () {
            distance += 5;
            calculateFare();
        });
    }
    if (decrementBtn) {
        decrementBtn.addEventListener('click', function () {
            if (distance >= 5) {
                distance -= 5;
                calculateFare();
            }
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            distance = 0;
            calculateFare();
        });
    }
    calculateFare();

    // Matatu FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
            document.querySelectorAll('.faq-question span:last-child').forEach(icon => icon.textContent = '+');
            if (!isActive) {
                answer.classList.add('active');
                this.querySelector('span:last-child').textContent = '-';
            }
        });
    });

    // Matatu Types Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            const tabContent = document.getElementById(tabId);
            if (tabContent) tabContent.classList.add('active');
        });
    });

    // PART 3: FORM VALIDATION

    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const locationInput = document.getElementById('location');
    const passwordInput = document.getElementById('password');

    function validateName() {
        const nameError = document.getElementById('nameError');
        if (!nameInput || !nameError) return false;
        if (nameInput.value.trim().length < 2) {
            nameError.style.display = 'block';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            nameError.style.display = 'none';
            nameInput.style.borderColor = '#2ecc71';
            return true;
        }
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        if (!emailInput || !emailError) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#2ecc71';
            return true;
        }
    }

    function validateLocation() {
        const locationError = document.getElementById('locationError');
        if (!locationInput || !locationError) return false;
        if (locationInput.value.trim().length === 0) {
            locationError.style.display = 'block';
            locationInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            locationError.style.display = 'none';
            locationInput.style.borderColor = '#2ecc71';
            return true;
        }
    }

    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        if (!passwordInput || !passwordError) return false;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            passwordError.style.display = 'none';
            passwordInput.style.borderColor = '#2ecc71';
            return true;
        }
    }

    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (locationInput) locationInput.addEventListener('input', validateLocation);
    if (passwordInput) passwordInput.addEventListener('input', validatePassword);

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isLocationValid = validateLocation();
            const isPasswordValid = validatePassword();
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            if (isNameValid && isEmailValid && isLocationValid && isPasswordValid) {
                if (successMessage) successMessage.style.display = 'block';
                if (errorMessage) errorMessage.style.display = 'none';
                setTimeout(() => {
                    form.reset();
                    if (successMessage) successMessage.style.display = 'none';
                    document.querySelectorAll('input').forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 5000);
            } else {
                if (successMessage) successMessage.style.display = 'none';
                if (errorMessage) errorMessage.style.display = 'block';
            }
        });
    }

    // ADDITIONAL INTERACTIVE FEATURES

    // Navigation Smooth Scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Gallery Interaction
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.innerHTML = ['🚌', '🎵', '🌟', '💥', '🔥', '✨'][index] || '';
        item.addEventListener('click', function () {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
});
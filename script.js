// ===== GET FORM ELEMENTS =====
const form = document.getElementById('registerForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const errorMsg = document.getElementById('errorMsg');

// ===== HELPER: Show Error =====
function showError(message) {
  errorMsg.textContent = message;
}

// ===== HELPER: Clear Error =====
function clearError() {
  errorMsg.textContent = '';
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId, eyeIcon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    eyeIcon.textContent = '🙈';
  } else {
    input.type = 'password';
    eyeIcon.textContent = '👁️';
  }
}

// ===== SHAKE INPUT ON ERROR =====
function shakeInput(input) {
  input.classList.add('shake');
  setTimeout(() => input.classList.remove('shake'), 400);
}

// ===== VALIDATE FUNCTION =====
function validateForm() {

  clearError();

  // Check empty fields
  if (firstName.value.trim() === '') {
    showError('First name is required.');
    shakeInput(firstName);
    firstName.focus();
    return false;
  }

  if (lastName.value.trim() === '') {
    showError('Last name is required.');
    shakeInput(lastName);
    lastName.focus();
    return false;
  }

  if (username.value.trim() === '') {
    showError('Username is required.');
    shakeInput(username);
    username.focus();
    return false;
  }

  // Username: only letters, numbers, dots allowed
  const usernamePattern = /^[a-zA-Z0-9.]+$/;
  if (!usernamePattern.test(username.value.trim())) {
    showError('Username can only contain letters, numbers, and dots.');
    username.focus();
    return false;
  }

  // Password length
  if (password.value.length < 8) {
    showError('Password must be at least 8 characters.');
    password.focus();
    return false;
  }

  // Passwords must match
  if (password.value !== confirmPassword.value) {
    showError('Passwords do not match.');
    confirmPassword.focus();
    shakeInput(password);
    return false;
  }

  return true;
}

// ===== FORM SUBMIT EVENT =====
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (validateForm()) {
    // Show success screen
    document.getElementById('welcomeName').textContent = firstName.value;
    document.getElementById('registerForm').style.display = 'none';
    document.querySelector('.form-header').style.display = 'none';
    document.getElementById('successScreen').classList.add('active');
  }
});

// Reset back to form
function resetAll() {
  form.reset();
  form.style.display = 'block';
  document.querySelector('.form-header').style.display = 'block';
  document.getElementById('successScreen').classList.remove('active');
}

// ===== LIVE: Clear error when user starts typing =====
[firstName, lastName, username, password, confirmPassword].forEach(function(input) {
  input.addEventListener('input', clearError);
});
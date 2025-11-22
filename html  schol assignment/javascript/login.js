// Login behavior moved from CSS -> JS
document.addEventListener('DOMContentLoaded', () => {
  // Utility: storage of login state
  function isLoggedIn() { return localStorage.getItem('userLoggedIn') === 'true'; }
  function setLoggedIn() {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('loginTime', Date.now().toString());
  }
  function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('loginTime');
    window.location.href = 'home.html';
  }

  // Validation rules (adjustable)
  const USERNAME_MIN = 3;
  const USERNAME_MAX = 6;
  const PW_MIN = 8;
  const PW_MAX = 12;

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const signInBtn = document.getElementById('signInBtn');
  const form = (usernameInput && usernameInput.closest('form')) || document.querySelector('.login-form');

  // realtime limiting (optional)
  if (usernameInput) usernameInput.setAttribute('maxlength', String(USERNAME_MAX));
  if (passwordInput) passwordInput.setAttribute('maxlength', String(PW_MAX));

  function validateUsername(username) {
    if (username.length === 0) { alert('Please enter a username.'); return false; }
    if (username.length < USERNAME_MIN) { alert(`Username too short — minimum ${USERNAME_MIN} chars.`); return false; }
    if (username.length > USERNAME_MAX) { alert(`Username too long — maximum ${USERNAME_MAX} chars.`); return false; }
    return true;
  }
  function validatePassword(password) {
    if (password.length === 0) { alert('Please enter a password.'); return false; }
    if (password.length < PW_MIN) { alert(`Password too short — minimum ${PW_MIN} chars.`); return false; }
    if (password.length > PW_MAX) { alert(`Password too long — maximum ${PW_MAX} chars.`); return false; }
    return true;
  }

  function handleLogin(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!validateUsername(username) || !validatePassword(password)) return false;

    // Example auth stub: change to real authentication as needed
    // setLoggedIn() will persist login state; here we just set and redirect
    setLoggedIn();
    alert('Login successful — redirecting...');
    window.location.href = 'gallery.html';
    return true;
  }

  if (signInBtn) signInBtn.addEventListener('click', handleLogin);
  if (form && form.tagName === 'FORM') form.addEventListener('submit', handleLogin);

  // optional: trim pasted overlong username/password immediately and alert
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      if (usernameInput.value.length > USERNAME_MAX) {
        alert('Username too long — trimmed to max length.');
        usernameInput.value = usernameInput.value.slice(0, USERNAME_MAX);
      }
    });
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      if (passwordInput.value.length > PW_MAX) {
        alert('Password too long — trimmed to max length.');
        passwordInput.value = passwordInput.value.slice(0, PW_MAX);
      }
    });
  }

  console.log('login.js initialized');
});
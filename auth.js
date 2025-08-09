// Simulate user database in localStorage
const USER_KEY = 'users';
const SESSION_KEY = 'sessionUser';

function getUsers() {
  return JSON.parse(localStorage.getItem(USER_KEY) || '[]');
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

function findUser(username, password) {
  return getUsers().find(u => u.username === username && u.password === password);
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Handle Sign Up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    const existing = getUsers().find(u => u.username === username);
    if (existing) {
      alert('Username already exists.');
      return;
    }

    const user = { username, password, role };
    saveUser(user);
    alert('Signup successful! Please log in.');
    window.location.href = 'login.html';
  });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = findUser(username, password);
    if (!user) {
      alert('Invalid username or password.');
      return;
    }

    saveSession(user);
    alert(`Welcome, ${user.username}! Role: ${user.role}`);
    window.location.href = 'dashboard.html'; // or route by role
  });
}
// Simulating a database with localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('works')) {
    localStorage.setItem('works', JSON.stringify([]));
}

let currentUser = null;

// Helper functions
function updateUI() {
    document.getElementById('signupBtn').style.display = currentUser ? 'none' : 'inline';
    document.getElementById('loginBtn').style.display = currentUser ? 'none' : 'inline';
    document.getElementById('uploadBtn').style.display = currentUser ? 'inline' : 'none';
    document.getElementById('logoutBtn').style.display = currentUser ? 'inline' : 'none';
}

function loadHome() {
    const works = JSON.parse(localStorage.getItem('works'));
    let html = '<h2>Recent Works</h2>';
    works.forEach(work => {
        html += `
            <div class="work">
                <h3>${work.title}</h3>
                <p>By: ${work.author}</p>
                <p>${work.content.substring(0, 100)}...</p>
                <button onclick="readWork(${work.id})">Read More</button>
            </div>
        `;
    });
    document.getElementById('mainContent').innerHTML = html;
}

function loadSignup() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Sign Up</h2>
        <form id="signupForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
        </form>
    `;
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

function loadLogin() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function loadUpload() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Upload Work</h2>
        <form id="uploadForm">
            <input type="text" id="title" placeholder="Title" required>
            <textarea id="content" placeholder="Your poem or story" required></textarea>
            <select id="type">
                <option value="poem">Poem</option>
                <option value="story">Story</option>
            </select>
            <button type="submit">Upload</button>
        </form>
    `;
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
}

function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    if (users.find(user => user.username === username)) {
        alert('Username already exists');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful');
        loadLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = username;
        updateUI();
        loadHome();
    } else {
        alert('Invalid credentials');
    }
}

function handleUpload(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const type = document.getElementById('type').value;
    const works = JSON.parse(localStorage.getItem('works'));
    works.push({ id: Date.now(), title, content, type, author: currentUser });
    localStorage.setItem('works', JSON.stringify(works));
    alert('Work uploaded successfully');
    loadHome();
}

function readWork(id) {
    const works = JSON.parse(localStorage.getItem('works'));
    const work = works.find(work => work.id === id);
    document.getElementById('mainContent').innerHTML = `
        <h2>${work.title}</h2>
        <p>By: ${work.author}</p>
        <p>${work.content}</p>
        <button onclick="loadHome()">Back to Home</button>
    `;
}

function handleLogout() {
    currentUser = null;
    updateUI();
    loadHome();
}

// Event listeners
document.getElementById('homeBtn').addEventListener('click', loadHome);
document.getElementById('signupBtn').addEventListener('click', loadSignup);
document.getElementById('loginBtn').addEventListener('click', loadLogin);
document.getElementById('uploadBtn').addEventListener('click', loadUpload);
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

// Initial load
loadHome();
updateUI();

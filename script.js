// Xeerka galitaanka iyo bogga aasaasiga ah
// Xusuusin: Faylkani wuxuu maamulaa galitaanka iyo habka madow

document.addEventListener('DOMContentLoaded', function() {
    // Haddii boggani yahay login.html, cusbooneysii doorka
    if (window.location.pathname.includes('login.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role') || 'admin';
        document.getElementById('selected-role').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        document.getElementById('login-title').textContent = `Login as ${role}`;
    }
    
    // U habee galitaanka bogga login.html
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        
        // Ku dar event listener-ka "Enter" key
        document.getElementById('password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleLogin();
        });
    }
    
    // U habee habka madow
    setupDarkMode();
});

// Funksiyada galitaanka
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const roleElement = document.getElementById('selected-role');
    const role = roleElement ? roleElement.textContent.toLowerCase() : 'admin';
    
    if (!username || !password) {
        showError('Please fill all fields');
        return;
    }
    
    const user = dataStorage.findUser(username, password);
    
    if (!user) {
        showError('Invalid username or password');
        return;
    }
    
    if (user.role !== role) {
        showError('Invalid role selected');
        return;
    }
    
    // Keydi isticmaale hadda galay
    // Never keep the password in the session copy of the user
    const { password: _omit, ...sessionUser } = user;
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    
    // U qaado bogga dashboard-ka
    switch(user.role) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'teacher':
            window.location.href = 'teacher.html';
            break;
        case 'student':
            window.location.href = 'student.html';
            break;
    }
}

// Funksiyada fudud
function showError(message) {
    alert(`❌ ${message}`);
}

function showSuccess(message) {
    alert(`✅ ${message}`);
}

function setupDarkMode() {
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            
            // Cusbooneysii astaanta badhanka
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
        
        // Haddii habka madow hore uu jiro, cusbooneysii
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            const icon = darkModeBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-sun';
        }
    }
}
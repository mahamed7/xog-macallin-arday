// Xeerka maamulaha - Faylkani wuxuu maamulaa admin dashboard-ka
// Xusuusin: Faylkani wuxuu ku xiran yahay admin.html

document.addEventListener('DOMContentLoaded', function() {
    // Xaqiiji isticmaale
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
    
    // Cusbooneysii magaca isticmaale
    document.getElementById('admin-name').textContent = `Welcome, ${currentUser.name}`;
    
    // U habee ficilada
    setupEventListeners();
    
    // Soo bandhii ardayda
    displayStudents();
});

// U habee dhammaan event listeners
function setupEventListeners() {
    // Kordhin arday cusub
    document.getElementById('add-student-btn').addEventListener('click', addNewStudent);
    
    // Raadinta ardayda
    document.getElementById('search-student').addEventListener('input', displayStudents);
    
    // Bixi system-ka
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // U habee habka madow
    setupDarkMode();
}

// Ku dar arday cusub
function addNewStudent() {
    const name = document.getElementById('student-name').value.trim();
    const username = document.getElementById('student-username').value.trim();
    const password = document.getElementById('student-password').value.trim();
    
    if (!name || !username || !password) {
        alert('❌ Please fill all fields');
        return;
    }
    
    const newStudent = { username, password, name };
    dataStorage.addStudent(newStudent);
    
    // Nadifi fooranka
    document.getElementById('student-name').value = '';
    document.getElementById('student-username').value = '';
    document.getElementById('student-password').value = '';
    
    // Cusbooneysii liiska
    displayStudents();
    
    alert(`✅ Student added: ${name}`);
}

// Soo bandhii ardayda
function displayStudents() {
    const listElement = document.getElementById('students-list');
    const searchTerm = document.getElementById('search-student').value.toLowerCase();
    
    let students = dataStorage.getAllStudents();
    
    if (searchTerm) {
        students = students.filter(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            s.username.toLowerCase().includes(searchTerm)
        );
    }
    
    let html = '';
    if (students.length === 0) {
        html = '<div class="data-item">No students found</div>';
    } else {
        students.forEach(student => {
            html += `
                <div class="data-item">
                    <div>
                        <strong>${student.name}</strong>
                        <p>${student.username}</p>
                    </div>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            `;
        });
    }
    
    listElement.innerHTML = html;
}

// Tirtir arday
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        dataStorage.deleteStudent(id);
        displayStudents();
        alert('✅ Student deleted successfully');
    }
}

// U habee habka madow
function setupDarkMode() {
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

}
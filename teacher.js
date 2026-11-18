// Xeerka macallinka - Faylkani wuxuu maamulaa teacher dashboard-ka
// Xusuusin: Faylkani wuxuu ku xiran yahay teacher.html

document.addEventListener('DOMContentLoaded', function() {
    // Xaqiiji isticmaale
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }
    
    // Cusbooneysii magaca isticmaale
    document.getElementById('teacher-name').textContent = `Welcome, ${currentUser.name}`;
    
    // U habee ficilada
    setupEventListeners();
    
    // Cusbooneysii doorashada ardayda
    updateStudentSelectors();
    
    // Soo bandhii qiimaynada
    displayGrades();
});

// U habee dhammaan event listeners
function setupEventListeners() {
    // Ku dar qiimaynta cusub
    document.getElementById('add-grade-btn').addEventListener('click', addNewGrade);
    
    // Filter qiimaynada
    document.getElementById('filter-grades').addEventListener('change', displayGrades);
    
    // Bixi system-ka
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // U habee habka madow
    setupDarkMode();
}

// Cusbooneysii doorashada ardayda
function updateStudentSelectors() {
    const students = dataStorage.getAllStudents();
    const options = students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    
    document.getElementById('select-student').innerHTML = '<option value="">Select Student...</option>' + options;
    document.getElementById('filter-grades').innerHTML = '<option value="">All Students</option>' + options;
}

// Ku dar qiimaynta cusub
function addNewGrade() {
    const studentId = document.getElementById('select-student').value;
    const subject = document.getElementById('grade-name').value.trim();
    const grade = document.getElementById('grade-value').value;
    
    if (!studentId || !subject || !grade || grade < 0 || grade > 100) {
        alert('❌ Please fill all fields (grade must be 0-100)');
        return;
    }
    
    const students = dataStorage.getAllStudents();
    const student = students.find(s => s.id == studentId);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const newGrade = {
        studentId: parseInt(studentId),
        studentName: student.name,
        teacherId: currentUser.id,
        teacherName: currentUser.name,
        subject: subject,
        grade: parseInt(grade)
    };
    
    dataStorage.addGrade(newGrade);
    
    // Nadifi fooranka
    document.getElementById('grade-name').value = '';
    document.getElementById('grade-value').value = '';
    
    // Cusbooneysii liiska
    displayGrades();
    
    alert(`✅ Grade added: ${student.name} - ${grade}`);
}

// Soo bandhii qiimaynada
function displayGrades() {
    const listElement = document.getElementById('grades-list');
    const selectedStudentId = document.getElementById('filter-grades').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    let grades = dataStorage.getTeacherGrades(currentUser.id);
    
    if (selectedStudentId) {
        grades = grades.filter(g => g.studentId == selectedStudentId);
    }
    
    let html = '';
    if (grades.length === 0) {
        html = '<div class="data-item">No grades found</div>';
    } else {
        grades.forEach(grade => {
            const gradeColor = grade.grade >= 80 ? '#4cc9f0' : grade.grade >= 60 ? '#f59e0b' : '#f72585';
            html += `
                <div class="data-item">
                    <div>
                        <strong>${grade.studentName}</strong>
                        <p>${grade.subject} - <span style="color: ${gradeColor}; font-weight: bold;">${grade.grade}</span></p>
                    </div>
                    <small>${grade.date}</small>
                </div>
            `;
        });
    }
    
    listElement.innerHTML = html;
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
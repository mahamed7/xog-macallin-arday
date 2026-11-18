// Xeerka ardayga - Faylkani wuxuu maamulaa student dashboard-ka
// Xusuusin: Faylkani wuxuu ku xiran yahay student.html

document.addEventListener('DOMContentLoaded', function() {
    // Xaqiiji isticmaale
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') {
        window.location.href = 'index.html';
        return;
    }
    
    // Cusbooneysii magaca isticmaale
    document.getElementById('student-name').textContent = `Welcome, ${currentUser.name}`;
    
    // U habee ficilada
    setupEventListeners();
    
    // Soo bandhii qiimaynada
    displayStudentGrades();
});

// U habee dhammaan event listeners
function setupEventListeners() {
    // Raadinta qiimaynada
    document.getElementById('search-grades').addEventListener('input', displayStudentGrades);
    
    // Bixi system-ka
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // U habee habka madow
    setupDarkMode();
}

// Soo bandhii qiimaynada ardayga
function displayStudentGrades() {
    const listElement = document.getElementById('my-grades-list');
    const searchTerm = document.getElementById('search-grades').value.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    let grades = dataStorage.getStudentGrades(currentUser.id);
    
    if (searchTerm) {
        grades = grades.filter(g => g.subject.toLowerCase().includes(searchTerm));
    }
    
    let html = '';
    if (grades.length === 0) {
        html = '<div class="data-item">No grades found</div>';
    } else {
        grades.forEach(grade => {
            let gradeColor, letterGrade;
            if (grade.grade >= 80) {
                gradeColor = '#4cc9f0'; letterGrade = 'A';
            } else if (grade.grade >= 70) {
                gradeColor = '#2ecc71'; letterGrade = 'B';
            } else if (grade.grade >= 60) {
                gradeColor = '#f59e0b'; letterGrade = 'C';
            } else if (grade.grade >= 50) {
                gradeColor = '#e67e22'; letterGrade = 'D';
            } else {
                gradeColor = '#f72585'; letterGrade = 'F';
            }
            
            html += `
                <div class="data-item">
                    <div>
                        <strong>${grade.subject}</strong>
                        <p>Teacher: ${grade.teacherName}</p>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 1.5rem; color: ${gradeColor}; font-weight: bold;">${grade.grade}</span>
                        <p style="color: ${gradeColor}">${letterGrade}</p>
                        <small>${grade.date}</small>
                    </div>
                </div>
            `;
        });
    }
    
    listElement.innerHTML = html;
    
    // Xisaabi tirakoobka qiimaynada
    calculateGradeStatistics(grades);
}

// Xisaabi tirakoobka qiimaynada
function calculateGradeStatistics(grades) {
    const stats = dataStorage.calculateGradeStats(grades);
    
    document.getElementById('total-grades').textContent = stats.count;
    document.getElementById('average-grade').textContent = stats.average;
    document.getElementById('max-grade').textContent = stats.highest;
    document.getElementById('min-grade').textContent = stats.lowest;
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
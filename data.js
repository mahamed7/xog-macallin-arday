// Xeerka xogta iyo keydinta localStorage
// Xusuusin: Faylkani wuxuu maamulaa xogta system-ka

// ============================================
// DATE CONFIGURATION - Fagaaraha Taariikhda
// ============================================
// WAX KA BADAL HALKAN: Isbadal taariikhda haddii aad rabto
const currentDate = "2025-10-20"; // Halkan ku qor taariikhda aad rabto (format: YYYY-MM-DD)
// ============================================

// Xogta asalka ah - Initial data
const initialUsers = {
    admin: [{ id: 1, username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' }],
    teacher: [{ id: 1, username: 'macallin', password: 'macallin123', name: 'Teacher Aadan', role: 'teacher' }],
    student: [
        { id: 1, username: 'arday', password: 'arday123', name: 'Student Cusmaan', role: 'student' },
        { id: 2, username: 'cali', password: 'cali123', name: 'Cali Maxamed', role: 'student' },
        { id: 3, username: 'safiya', password: 'safiya123', name: 'Safiya Cusmaan', role: 'student' },
        {id: 4, username: 'Faarax', password: 'faarax22', name: 'faarax Xaashi', role: 'student'},
        {id: 5, username: 'Aamina', password: 'aamina55', name: 'Aamina Cabdi', role: 'student'},
        {id: 6, username: 'Jamaal', password: 'jamaal99', name: 'Jamaal Xasan', role: 'student'},
        {id: 7, username: 'Hodan', password: 'hodan11', name: 'Hodan Cali', role: 'student'},
        {id: 8, username: 'Khadar', password: 'khadar33', name: 'Khadar Maxamed', role: 'student'},
        {id: 9, username: 'Nasteexo', password: 'nasteexo77', name: 'Nasteexo Warsame', role: 'student'},
        {id: 10, username: 'Yusuf', password: 'yusuf88', name: 'Yusuf Cabdi', role: 'student'},
        {id: 11, username: 'Zahra', password: 'zahra44', name: 'Zahra Ali', role: 'student'},
        {id: 12, username: 'Ibrahim', password: 'ibrahim66', name: 'Ibrahim Mohamed', role: 'student'},
        {id: 13, username: 'Layla', password: 'layla55', name: 'Layla Hassan', role: 'student'},
        {id: 14, username: 'Abdirahman', password: 'abdirahman22', name: 'Abdirahman Yusuf', role: 'student'},
        {id: 15, username: 'Sahra', password: 'sahra11', name: 'Sahra Aden', role: 'student'},
        {id: 16, username: 'Mohamed', password: 'mohamed33', name: 'Mohamed Farah', role: 'student'}
        
    ]
};

const initialGrades = [
    { id: 1, studentId: 1, studentName: 'Student Cusmaan', teacherId: 1, subject: 'Mathematics', grade: 85, date: currentDate },
    { id: 2, studentId: 2, studentName: 'Cali Maxamed', teacherId: 1, subject: 'Mathematics', grade: 72, date: currentDate },
    { id: 3, studentId: 3, studentName: 'Safiya Cusmaan', teacherId: 1, subject: 'Mathematics', grade: 90, date: currentDate },
    { id: 4, studentId: 4, studentName: 'faarax Xaashi', teacherId: 1, subject: 'Mathematics', grade: 65, date: currentDate },
    { id: 5, studentId: 5, studentName: 'Aamina Cabdi', teacherId: 1, subject: 'Mathematics', grade: 78, date: currentDate },
    { id: 6, studentId: 6, studentName: 'Jamaal Xasan', teacherId: 1, subject: 'Mathematics', grade: 88, date: currentDate },
    { id: 7, studentId: 7, studentName: 'Hodan Cali', teacherId: 1, subject: 'Mathematics', grade: 95, date: currentDate },
    { id: 8, studentId: 8, studentName: 'Khadar Maxamed', teacherId: 1, subject: 'Mathematics', grade: 55, date: currentDate },
    { id: 9, studentId: 9, studentName: 'Nasteexo Warsame', teacherId: 1, subject: 'Mathematics', grade: 82, date: currentDate },
    { id: 10, studentId: 10, studentName: 'Yusuf Cabdi', teacherId: 1, subject: 'Mathematics', grade: 70, date: currentDate },
    { id: 11, studentId: 11, studentName: 'Zahra Ali', teacherId: 1, subject: 'Mathematics', grade: 60, date: currentDate },
    { id: 12, studentId: 12, studentName: 'Ibrahim Mohamed', teacherId: 1, subject: 'Mathematics', grade: 77, date: currentDate },
    { id: 13, studentId: 13, studentName: 'Layla Hassan', teacherId: 1, subject: 'Mathematics', grade: 83, date: currentDate },
    { id: 14, studentId: 14, studentName: 'Abdirahman Yusuf', teacherId: 1, subject: 'Mathematics', grade: 69, date: currentDate },
    { id: 15, studentId: 15, studentName: 'Sahra Aden', teacherId: 1, subject: 'Mathematics', grade: 91, date: currentDate },
    { id: 16, studentId: 16, studentName: 'Mohamed Farah', teacherId: 1, subject: 'Mathematics', grade: 74, date: currentDate }
];

// Funksiyada keydinta xogta
const dataStorage = {
    // Hagaaji xogta asalka ah
    initializeData: function() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }
        if (!localStorage.getItem('grades')) {
            // Isticmaal taariikhda hadda jooga (currentDate) marka la hagaajinayo xogta
            const gradesWithDate = initialGrades.map(grade => ({
                ...grade,
                date: currentDate
            }));
            localStorage.setItem('grades', JSON.stringify(gradesWithDate));
        }
        
        // Keydi fagaaraha taariikhda
        if (!localStorage.getItem('dateConfig')) {
            localStorage.setItem('dateConfig', JSON.stringify({
                currentDate: currentDate,
                lastUpdated: new Date().toISOString()
            }));
        }
    },
    
    // Hel fagaaraha taariikhda
    getDateConfig: function() {
        const config = JSON.parse(localStorage.getItem('dateConfig'));
        return config || { currentDate: currentDate };
    },
    
    // Cusbooneysii taariikhda
    updateDateConfig: function(newDate) {
        const config = {
            currentDate: newDate,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('dateConfig', JSON.stringify(config));
        return config;
    },
    
    // Hel taariikhda hadda
    getCurrentDate: function() {
        const config = this.getDateConfig();
        return config.currentDate || currentDate;
    },
    
    // Hel xogta isticmaalayaasha
    getUsers: function() {
        return JSON.parse(localStorage.getItem('users')) || initialUsers;
    },
    
    // Hel isticmaale gooni
    findUser: function(username, password) {
        const users = this.getUsers();
        for (let role in users) {
            const user = users[role].find(u => u.username === username && u.password === password);
            if (user) return { ...user, role: role };
        }
        return null;
    },
    
    // Ku dar arday cusub
    addStudent: function(student) {
        const users = this.getUsers();
        const lastId = users.student.length > 0 ? Math.max(...users.student.map(s => s.id)) : 0;
        student.id = lastId + 1;
        student.role = 'student';
        users.student.push(student);
        localStorage.setItem('users', JSON.stringify(users));
        return student;
    },
    
    // Tirtir arday
    deleteStudent: function(id) {
        const users = this.getUsers();
        users.student = users.student.filter(s => s.id !== id);
        
        const grades = this.getGrades();
        const updatedGrades = grades.filter(g => g.studentId !== id);
        localStorage.setItem('grades', JSON.stringify(updatedGrades));
        
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    },
    
    // Hel ardayda oo dhan
    getAllStudents: function() {
        return this.getUsers().student || [];
    },
    
    // Hel qiimaynada oo dhan
    getGrades: function() {
        return JSON.parse(localStorage.getItem('grades')) || [];
    },
    
    // Ku dar qiimaynta cusub
    addGrade: function(grade) {
        const grades = this.getGrades();
        const lastId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) : 0;
        grade.id = lastId + 1;
        // Isticmaal taariikhda fagaaraha hadda
        grade.date = this.getCurrentDate();
        grades.push(grade);
        localStorage.setItem('grades', JSON.stringify(grades));
        return grade;
    },
    
    // Cusbooneysii dhammaan qiimaynada taariikhda cusub
    updateAllGradesDate: function(newDate) {
        const grades = this.getGrades();
        const updatedGrades = grades.map(grade => ({
            ...grade,
            date: newDate
        }));
        localStorage.setItem('grades', JSON.stringify(updatedGrades));
        this.updateDateConfig(newDate);
        return updatedGrades;
    },
    
    // Hel qiimaynada arday gooni
    getStudentGrades: function(studentId) {
        return this.getGrades().filter(g => g.studentId == studentId);
    },
    
    // Hel qiimaynada macallin gooni
    getTeacherGrades: function(teacherId) {
        return this.getGrades().filter(g => g.teacherId == teacherId);
    },
    
    // Xisaabi tirakoobka qiimaynada
    calculateGradeStats: function(grades) {
        if (grades.length === 0) return { count: 0, average: 0, highest: 0, lowest: 0 };
        const gradeValues = grades.map(g => g.grade);
        const total = gradeValues.reduce((sum, grade) => sum + grade, 0);
        return {
            count: grades.length,
            average: (total / grades.length).toFixed(1),
            highest: Math.max(...gradeValues),
            lowest: Math.min(...gradeValues)
        };
    }
};

// Bilow keydinta xogta asalka ah
dataStorage.initializeData();
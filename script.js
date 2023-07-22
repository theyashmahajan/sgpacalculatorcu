// Global variables to store semester data
let selectedSemester = 2;
const semestersData = {
  2: [
    { subject: 'Object Oriented Programming Using C++', credits: 4 },
    { subject: 'Independent Project', credits: 1 },
    { subject: 'Disruptive Technologies-2', credits: 2 },
    { subject: 'Basic Electrical and Electronics Engineering', credits: 3 },
    { subject: 'General Proficiency-2', credits: 1 },
    { subject: 'Computer Graphics using CAD Lab', credits: 2 },
    { subject: 'Mathematics – II', credits: 4 },
    { subject: 'Physics for Engineers', credits: 4 },
    { subject: 'Aptitude - 1', credits: 2 },
    { subject: 'Academic Writing Skills and IPR', credits: 1 },
  ],
  4: [
    // Semester 4 subjects data
    { subject: 'Computer Networks', credits: 4 },
    { subject: 'Programming in Python Lab', credits: 2 },
    { subject: 'Project-I', credits: 2 },
    { subject: 'Software Engineering', credits: 3 },
    { subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', credits: 3 },
    { subject: 'General Proficiency-4', credits: 1 },
    { subject: 'Probability and Statistics (Through SWAYAM)', credits: 4 },
    { subject: 'Soft Skills', credits: 1 },
    { subject: 'Ethics and Gender Equality', credits: 1 },
  ],
  // Add data for other semesters as needed
};

// Grading scale and points
const gradingScale = {
  'A+': 10,
  'A': 9,
  'B+': 8,
  'B': 7,
  'C+': 6,
  'C': 5,
  'D+': 4,
  'D': 3,
  'F': 0,
};

// Function to redirect to the selected semester page
function goToSemester(semester) {
  selectedSemester = semester;
  window.location.href = `semester.html?semester=${selectedSemester}`;
}

// Function to dynamically fill the subject and credits form fields
function fillGradeForm() {
  const form = document.getElementById('gradeForm');
  const semesterNumber = document.getElementById('semesterNumber');
  semesterNumber.textContent = selectedSemester;

  if (semestersData[selectedSemester]) {
    const semesterData = semestersData[selectedSemester];
    semesterData.forEach(({ subject, credits }) => {
      const subjectLabel = document.createElement('label');
      subjectLabel.textContent = subject;

      const gradeSelect = document.createElement('select');
      gradeSelect.name = subject;
      for (const grade in gradingScale) {
        const option = document.createElement('option');
        option.value = gradingScale[grade];
        option.textContent = grade; // Show only the letter grades without points
        gradeSelect.appendChild(option);
      }

      form.appendChild(subjectLabel);
      form.appendChild(gradeSelect);
    });
  }
}

// Function to calculate SGPA
function calculateSGPA() {
  const semesterData = semestersData[selectedSemester];
  let totalCredits = 0;
  let totalGradePoints = 0;

  semesterData.forEach(({ subject, credits }) => {
    const gradeSelect = document.querySelector(`select[name="${subject}"]`);
    const gradeValue = parseFloat(gradeSelect.value);
    totalCredits += credits;
    totalGradePoints += gradeValue * credits;
  });

  const sgpa = totalGradePoints / totalCredits;
  alert(`Your SGPA for Semester ${selectedSemester} is: ${sgpa.toFixed(2)}`);
  
}

// ... (The rest of the code remains unchanged)

// Check if we are on the semester page and fill the form accordingly
if (window.location.pathname.includes('semester.html')) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const semesterParam = parseInt(urlParams.get('semester'));

  if (semestersData[semesterParam]) {
    selectedSemester = semesterParam;
    const semesterNumber = document.getElementById('semesterNumber');
    semesterNumber.textContent = selectedSemester;
    fillGradeForm(); // Fill the form dynamically based on the URL parameter
  } else {
    // Handle the case where the selected semester is not valid or not found in semestersData
    // You can display an error message or redirect to another page, depending on your preference.
  }
}

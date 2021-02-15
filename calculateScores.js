const fs = require('fs');


//Read advisors.csv
const rows1 = fs.readFileSync('Advisor.csv').toString().split("\n");
var advisors = [];
for(i = 0; i < rows1.length; i++){
    advisors[i] = rows1[i].split(",");
}

//Read students.csv
const rows2 = fs.readFileSync('Student.csv').toString().split("\n");
var students = [];
for(i = 0; i < rows2.length; i++){
    students[i] = rows2[i].split(",");
}

//Assume students is multidimensional array, with each row representing a student
//Assume advisors is multidimensional array, with each row representing an advisors

class Student {
  departments;
  needs;
  isInternationalStudent;
}

class Advisor {
  department;
  strengths;
  internationalStudentInterest;
}

var num_students = students.length - 1;
var num_advisors = advisors.length - 1;

var student_array = [];
var advisor_array = [];

var col_student_departments = 3;
var col_student_needs = 4;
var col_student_international = 2;

var col_advisor_capacity;
var col_advisor_department = 3;
var col_advisor_strengths = 4;
var col_advisor_international = 2;

for (var i = 1; i < num_students+1; i++) {
  var student = new Student();
  student.departments = students[i][col_student_departments];
  //Student needs
  student.needs = students[i][col_student_needs].split(";");
  
  for (var j = 0; j < student.needs.length; j++) {
    if (student.needs[j].replace('"', '') == 'choosing and planning classes') {
      student.needs[j] = "A";
    }
    if (student.needs[j].replace('"', '') == 'picking a major/discovering interests') {
      student.needs[j] = "B";
    }
    if (student.needs[j].replace('"', '') == 'adjusting to the difficulty of college level academic courses') {
      student.needs[j] = "C";
    }
    if (student.needs[j].replace('"', '') == 'helping manage non-academic stress and problems') {
      student.needs[j] = "D";
    }
  }
  student.isInternationalStudent = students[j][col_student_international];
  student_array.push(student);
}



for (i = 1; i < num_advisors+1; i++) {
  //for (var j = 0; j < advisors[i][col_advisor_capacity]; j ++) {
  var advisor = new Advisor();
  advisor.department = advisors[i][col_advisor_department];
  //Advisor strengths
  advisor.strengths = advisors[i][col_advisor_strengths].split(";");
  for (j = 0; j < advisor.strengths.length; j++) {
    if (advisor.strengths[j].replace('"', '') == "helping a student plan classes") {
      advisor.strengths[j] = "A";
    }
    if (advisor.strengths[j].replace('"', '') == "helping a student decide a major and develop their interests") {
      advisor.strengths[j] = "B";
    }
    if (advisor.strengths[j].replace('"', '') == "helping students with academic skills") {
      advisor.strengths[j] = "C";
    }
    if (advisor.strengths[j].replace('"', '') == "helping a student manage non-academic stress and being a source of general support") {
      advisor.strengths[j] = "D";
    }
  }
  advisor.internationalStudentInterest = advisors[i][col_advisor_international];
  advisor_array.push(advisor);
  //}
}


function calculate_score(student, advisor) {
  var score = 0;
  //Student needs/advisor strengths
  for (i = 0; i < student.needs.length; i++) {
    for (j = 0; j < advisor.strengths.length; j++) {
      if (student.needs[i] == advisor.strengths[j]) {
        score += 5;
      }
    }
  }
  //International student
  if (student.isInternationalStudent == "Yes" && advisor.internationalStudentInterest == "International") {
    score += 5;
  }
  //Department
  if (student.departments == advisor.department) {
    score += 5;
  }
  return score;
}

cost_matrix = [];
for (j in advisor_array) {
  var cost_matrix_row = [];
  for (i in student_array) {
    var score = calculate_score(student_array[i], advisor_array[j]);
    cost_matrix_row.push(score);
  }
  cost_matrix.push(cost_matrix_row);
}

console.log(cost_matrix);


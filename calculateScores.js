const fs = require('fs');

//Read advisors.csv
const rows1 = fs.readFileSync('advisors.csv').toString().split("\n");
var advisors = [];
for(i = 0; i < rows.length; i++){
    advisors[i] = rows1[i].replace(/ /g, "").split(",");
}

//Read students.csv
const rows2 = fs.readFileSync('advisors.csv').toString().split("\n");
var students = [];
for(i = 0; i < rows.length; i++){
    students[i] = rows1[i].replace(/ /g, "").split(",");
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

var num_students = students.length;
var num_advisors = advisors.length;

var student_array = [];
var advisor_array = [];

var col_student_departments = 3;
var col_student_needs = 4;
var col_student_international = 2;

var col_advisor_capacity;
var col_advisor_department = 3;
var col_advisor_strengths = 4;
var col_advisor_international = 2;

for (var i = 0; i < num_students; i++) {
  var student = new Student();
  student.departments = students[i][col_student_departments];
  //Student needs
  student.needs = students[i][col_student_needs].split(";");
  for (var j = 0; j < student.needs.length; j++) {
    if (student.needs[j] == "choosing and planning classes") {
      student.needs[j] = "A";
    }
    if (student.needs[j] == "picking a major/discovering interests") {
      student.needs[j] = "B";
    }
    if (student.needs[j] == "adjusting to the difficulty of college level academic courses") {
      student.needs[j] = "C";
    }
    if (student.needs[j] == "helping manage non-academic stress and problems") {
      student.needs[j] = "D";
    }
  }
  student.isInternationalStudent = students[j][col_student_international];
  student_array.push(student);
}

for (i = 0; i < num_advisors; i++) {
  //for (var j = 0; j < advisors[i][col_advisor_capacity]; j ++) {
  var advisor = new Advisor();
  advisor.department = advisors[i][col_advisor_department];
  //Advisor strengths
  advisor.strengths = advisors[i][col_advisor_strengths].split(";");
  for (j = 0; j < advisor_strengths.length; j++) {
    if (advisor.strengths[j] == "helping a student plan classes") {
      advisor.strengths[j] = "A";
    }
    if (advisor.strengths[j] == "helping a student decide a major and develop their interests") {
      advisor.strengths[j] = "B";
    }
    if (advisor.strengths[j] == "helping students with academic skills") {
      advisor.strengths[j] = "C";
    }
    else {
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
    for (j= 0; i < advisor.strengths.length; j++) {
      if (student.needs[i] == advisor.needs[j]) {
        score += 5;
      }
    }
  }
  //International student
  if (student.isInternationalStudent == advisor.internationalStudentInterest) {
    score += 5;
  }
  //Department
  if (student.departments.includes(advisor.department)) {
    score += 5;
  }
  return score;
}

cost_matrix = [];
for (j = 0; j < num_advisors; j++) {
  cost_matrix_row = [];
  for (i = 0; i < num_students; i++) {
    score = calculate_score(advisor_array[j], student_array[i]);
    cost_matrix_row.push(score);
  }
  cost_matrix.push(cost_matrix_row);
}

//After this, cost matrix should be cost array of arrays of scores, rows represent students, columns represent advisors
const db = require("../data/dbConfig");

module.exports = {
  getStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getTasks,
};

//returns an array of all students in the database
function getStudents() {
  return db("students");
}

//adds a student to the database
async function addStudent(student) {
  return db("students").insert(student);
}

//updates a student with the given id
async function editStudent(studentId, student) {
  return db("students")
    .where({ id: studentId })
    .update(student)
    .then((count) => {
      return count;
    });
}

//deletes student with given id
async function deleteStudent(studentId) {
  return db("students").where({ id: studentId }).del();
}

//returns an array of tasks the student is assigned
async function getTasks(studentId) {
  return null;
}
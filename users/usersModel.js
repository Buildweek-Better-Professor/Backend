const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  addUser,
  addClassUserList,
  addStudentUserList,
  editUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getStudents,
  getClasses,
};

//returns an array of all users in database
function getUsers() {
  return db("users");
}

//adds a user to the database and returns the user's username
async function addUser(user) {
  if (user.class_id) {
    return db("users")
      .insert(user, "id")
      .then(async (id) => {
        await db("users_classes").insert({
          user_id: id,
          class_id: user.class_id,
        });
        return db("users").where({ id }).select("users.username").first();
      });
  } else {
    return db("users")
      .insert(user, "id")
      .then((id) => {
        return db("users").where({ id }).select("users.username").first();
      });
  }
}

//adds a class to the user's class list
async function addClassUserList(userId, classId) {
  return db("users_classes").insert({ user_id: userId, class_id: classId });
}

//adds a student to the user's student list
async function addStudentUserList(userId, studentId) {
  return db("professor_students").insert({
    user_id: userId,
    student_id: studentId,
  });
}

//updates user with given id
async function editUser(userId, user) {
  return db("users")
    .where({ id: userId })
    .update(user)
    .then((count) => {
      return count;
    });
}

//deletes user with given id
async function deleteUser(userId) {
  return db("users").where({ id: userId }).del();
}

//gets a user by a given id
async function getUserById(userId) {
  return db("users").where({ id: userId }).first();
}

//gets user by username
async function getUserByUsername(name) {
  return db("users").where({ username: name }).first();
}

//gets a list of students for a given user
async function getStudents(userId) {
  return db("students as s")
    .join("users as u", "s.class_id", "u.class_id")
    .select("s.name")
    .orderBy("s.id");
}

//gets a list of classes for a given user
async function getClasses(userId) {
  return db("classes as c")
    .join("users_classes as uc", "uc.class_id", "c.id")
    .join("users as u", "uc.user_id", "u.id")
    .select("c.name")
    .orderBy("c.id");
}

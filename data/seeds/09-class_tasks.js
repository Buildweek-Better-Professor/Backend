exports.seed = function (knex) {
  return knex("class_tasks").insert([{ class_id: 1, task_id: 2 }]);
};

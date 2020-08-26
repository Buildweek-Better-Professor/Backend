exports.up = function (knex) {
  return knex.schema.createTable("class_tasks", (tbl) => {
    tbl.increments("id");
    tbl
      .integer("class_id")
      .unsigned()
      .references("classes.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("task_id")
      .unsigned()
      .references("tasks.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {};

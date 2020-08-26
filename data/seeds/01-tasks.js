exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      id: 1,
      name: "Determine a thesis",
      description: "Pick a topic to research",
      due_date: "Sep 1, 2020",
      completed: 0,
    },
    {
      id: 2,
      name: "Meet with Students",
      description: "Discuss semester goals with students",
      due_date: "Sep 10, 2020",
      completed: 0,
    },
  ]);
};

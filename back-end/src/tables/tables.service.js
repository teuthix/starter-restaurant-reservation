const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").sortBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

module.exports = {
  list,
  create,
};

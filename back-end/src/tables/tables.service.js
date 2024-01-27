const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

async function update(tableUpdate) {
  await knex("tables")
    .select("*")
    .where({ table_id: tableUpdate.table_id })
    .update(tableUpdate, "*")
    .then((updatedTables) => updatedTables[0]);
}

async function destroy(table_id) {
  return knex("tables").where({ table_id }).del();
}

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};

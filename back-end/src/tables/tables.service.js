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

function read(reservationId) {
  return knex("tables as t")
    .join("reservations as r", "t.reservation_id", "r.reservation_id")
    .select("t.*", "r.people")
    .where({ reservation_id: reservationId })
    .first();
}

async function update(tableUpdate) {
  await knex("tables as t")
    .where({ reservation_id: tableUpdate.reservation_id })
    .update(tableUpdate);

  return await knex("tables as t")
    .join("reservations as r", "t.reservation_id", "r.reservation_id")
    .select(
      "r.reservation_id",
      "t.table_id",
      "t.table_name",
      "t.capacity",
      "r.people"
    )
    .where({ "t.reservation_id": tableUpdate.reservation_id })
    .first();
}

module.exports = {
  list,
  create,
  read,
  update,
};

const knex = require("../db/connection");

function list(date) {
  let query = knex("reservations").select("*").orderBy("reservation_time");

  if (date) {
    query = query.where({ reservation_date: date });
  }
  query = query.whereNot({ status: "finished" });
  return query;
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function update(updateReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updateReservation.reservation_id })
    .update(updateReservation, "*")
    .then((updatedStatus) => updatedStatus[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
};

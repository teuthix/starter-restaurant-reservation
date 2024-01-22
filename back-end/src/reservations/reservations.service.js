const knex = require("../db/connection");

function list(date) {
  let query = knex("reservations").select("*").orderBy("reservation_time");

  if (date) {
    query = query.where({ reservation_date: date });
  }

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

module.exports = {
  list,
  create,
  read,
};

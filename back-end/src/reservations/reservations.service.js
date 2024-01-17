const knex = require("../db/connection");

function list(date) {
  let query = knex("reservations").select("*").orderBy("reservation_time");

  if (date) {
    query = query.where({ reservation_date: date });
  }
  console.log(date, "in service");
  return query;
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = {
  list,
  create,
};

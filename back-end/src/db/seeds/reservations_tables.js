const generateReservationsTablesJoins = (reservationIds, tableIds) => {
  return reservationIds
    .map(({ reservation_id: reservationId }) => {
      return tableIds.map(({ table_id: tableId }) => {
        return {
          tableIid: tableId,
          reservation_id: reservationId,
        };
      });
    })
    .reduce((a, b) => a.concat(b), []);
};

exports.seed = async function (knex) {
  const reservationIds = await knex("reservations").select("reservation_id");
  const tableIds = await knex("tables").select("table_id");

  const joins = generateReservationsTablesJoins(reservationIds, tableIds);
  return knex("reservations_tables").insert(joins);
};

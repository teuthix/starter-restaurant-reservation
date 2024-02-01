const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

// const VALID_PROPERTIES = ["table_name", "capacity"];

// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length) {
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   }
//   next();
// }

// CREATE
function isValidTableName(req, res, next) {
  const { table_name } = req.body.data;

  if (!table_name || table_name.length == 1) {
    return next({
      status: 400,
      message: `table_name issue`,
    });
  }
  next();
}

// CREATE
function isValidCapacity(req, res, next) {
  const { capacity } = req.body.data;

  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity issue",
    });
  }
  next();
}

const seatRequiredProperties = hasProperties("reservation_id");

// UPDATE DELETE
async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 400, message: `table ${req.params.table_id} does not exist` });
}

// used in update
async function reservationIdExists(req, res, next) {
  const reservation = await reservationsService.read(
    req.body.data.reservation_id
  );
  if (reservation && reservation.isSeated == false) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation Id ${req.body.data.reservation_id} does not exist`,
  });
}

// DELETE
async function tableIdExists(req, res, next) {
  const tableId = await tablesService.read(req.params.table_id);
  if (tableId) {
    res.locals.table_id = tableId;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.table_id} does not exist in database`,
  });
}

function enoughCapacity(req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if (capacity < people) {
    return next({
      status: 400,
      message: "not enough capacity",
    });
  }
  next();
}

// for update
function isTableOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next({
      status: 400,
      message: "table is already occupied",
    });
  }
  next();
}

// for PUT status change
async function seatReservation(req, res, next) {
  const reservation = await reservationsService.read(
    req.body.data.reservation_id
  );
  if (reservation.status == "seated") {
    return next({
      status: 400,
      message: "reservation already seated",
    });
  } else {
    reservationsService.update({ ...reservation, status: "seated" });
  }
  next();
}

// DELETE ::  if table is not occupied, return 404 message, if its already occupied, next
function isTableIdOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "table is not occupied",
    });
  }
  next();
}

// DELETE changes status in reservations
async function changeReserveStatusToFinished(req, res, next) {
  const reservation = await reservationsService.read(
    res.locals.table.reservation_id
  );
  reservationsService.update({ ...reservation, status: "finished" });
  next();
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  // console.log(data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedSeat = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await tablesService.update(updatedSeat);
  res.status(200).json({ data });
}

async function destroy(req, res, next) {
  tablesService
    .delete(res.locals.table.table_id)
    .then(() => res.status(200).json({ success: true }))
    .catch(next);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    // hasOnlyValidProperties,
    isValidTableName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    seatRequiredProperties,
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(tableExists),
    enoughCapacity,
    isTableOccupied,
    // asyncErrorBoundary(seatReservation),
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(tableExists),
    isTableIdOccupied,
    asyncErrorBoundary(changeReserveStatusToFinished),
    destroy,
  ],
};

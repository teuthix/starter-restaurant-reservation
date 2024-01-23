const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// used in create
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

// used in create
function isValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  //   console.log(capacity, typeof capacity, isNaN(capacity));

  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity issue",
    });
  }
  next();
}

// removed capacity for now
const seatRequiredProperties = hasProperties("reservation_id");

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    next();
  }
  next({ status: 400, message: "table does not exist" });
}

// used in update
function reservationIdExists(req, res, next) {
  console.log(req.body.data);
  if (req.body.data.reservation_id) {
    next();
  }
  next({
    status: 404,
    message: `reservation Id ${req.body.data.reservation_id} does not exist`,
  });
}

async function enoughCapacity(req, res, next) {
  // if people > capacity, 400
  console.log(res.locals.table);
  next();
}

async function list(req, res) {
  //   console.log("in list");
  const data = await tablesService.list();
  //   console.log(data, "data");
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  //   const { reservation_id } = req.body.data;
  //   const data = await tablesService.read(reservation_id);
  //   console.log({ data });
  //   res.status(200).json({ data });
  const updatedSeat = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await tablesService.update(updatedSeat);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    isValidTableName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    seatRequiredProperties,
    asyncErrorBoundary(tableExists),
    reservationIdExists,
    asyncErrorBoundary(enoughCapacity),
    asyncErrorBoundary(update),
  ],
};

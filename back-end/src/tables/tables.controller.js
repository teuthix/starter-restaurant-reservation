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

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    isValidTableName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
};

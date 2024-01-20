/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

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

function isValidDate(req, res, next) {
  const { reservation_date } = req.body.data;

  // Check if reservation_date is a valid date in the format YYYY-MM-DD
  if (!isValidDateFormat(reservation_date)) {
    return next({
      status: 400,
      message: `Invalid reservation_date format. Use YYYY-MM-DD.`,
    });
  }

  next();
}

function isValidDateFormat(dateString) {
  // RegExp to match the format YYYY-MM-DD
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the string matches the expected format
  if (!dateFormatRegex.test(dateString)) {
    return false;
  }

  // Check if the date is a valid date according to the Date object
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime());
}

function isValidTime(req, res, next) {
  const { reservation_time } = req.body.data;

  if (!isValidTimeFormat(reservation_time)) {
    return next({
      status: 400,
      message: `Invalid reservation_time format`,
    });
  }
  next();
}

function isValidTimeFormat(timeString) {
  const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeFormatRegex.test(timeString);
}

function isValidPeople(req, res, next) {
  const { people } = req.body.data;
  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: `Invalid number of people`,
      error: "Invalid number of people",
    });
  }

  next();
}

// if route has date query, then return reservations for that date
// else, return all reservation order by reservation time;
function hasDate(req, res, next) {
  const dateParam = req.query.date;
  if (dateParam) {
    res.locals.date = dateParam;
  }

  next();
}

function isDateInPast(reservedDate) {
  // const { reservation_date } = req.body.data;
  // Create a new Date object for today
  const today = new Date();
  // const reservedDate = new Date(reservation_date);

  // console.log(reservation_date, reservedDate);
  if (today > reservedDate) {
    return true;
  } else {
    return false;
  }
}

function isDateTuesday(reservedDate) {
  // const { reservation_date } = req.body.data;

  // const reservedDate = new Date(reservation_date);
  console.log(reservedDate, reservedDate.getDay());
  if (reservedDate.getUTCDay() == 2) {
    return true;
  } else {
    return false;
  }
}

function nonPastNonTues(req, res, next) {
  const { reservation_date } = req.body.data;
  const reservedDate = new Date(reservation_date);

  if (isDateInPast(reservedDate) && isDateTuesday(reservedDate)) {
    return next({
      status: 400,
      message: `Reservation is not in future and is on a closed Tuesday`,
    });
  } else if (isDateInPast(reservedDate)) {
    return next({
      status: 400,
      message: `Reservation is not in the future`,
    });
  } else if (isDateTuesday(reservedDate)) {
    return next({
      status: 400,
      message: `Reservation is on a closed day`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await reservationsService.list(res.locals.date);
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [hasDate, asyncErrorBoundary(list)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    isValidPeople,
    // isDateInPast,
    // isDateTuesday,
    nonPastNonTues,
    asyncErrorBoundary(create),
  ],
};

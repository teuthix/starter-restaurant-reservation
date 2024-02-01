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

// used in CREATE / POST
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

// used in CREATE / POST
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

// used in CREATE / POST
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

// used in CREATE / POST
function isValidTimeFormat(timeString) {
  const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeFormatRegex.test(timeString);
}

// used in CREATE / POST
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

// used in LIST / GET
// if route has date query, then return reservations for that date
// else, return all reservation order by reservation time;
function hasDate(req, res, next) {
  const dateParam = req.query.date;
  if (dateParam) {
    res.locals.date = dateParam;
  }

  next();
}

// used in CREATE / POST
function nonPastNonTues(req, res, next) {
  const { reservation_date } = req.body.data;
  const reservedDate = new Date(reservation_date);
  const today = new Date();
  const errors = [];

  if (reservedDate.getUTCDay() == 2) {
    errors.push("Restaurant is closed on Tuesdays");
  }
  if (today > reservedDate) {
    errors.push("Reservation must be made for a future date");
  }

  if (errors.length > 0) {
    return next({
      status: 400,
      message: errors.join("; "),
    });
  }

  next();
}

// used in CREATE / POST
function nonPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const reservation = new Date(`${reservation_date} EST`).setHours(
    reservation_time.substring(0, 2),
    reservation_time.substring(3)
  );
  const now = Date.now();
  if (reservation > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Reservation must not be in past",
    });
  }
}

// used in CREATE / POST
function duringOpenHours(req, res, next) {
  const { reservation_time } = req.body.data;
  const reservation =
    reservation_time.substring(0, 2) + reservation_time.substring(3);
  if (reservation > 1030 && reservation < 2130) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Outside of opening hours",
    });
  }
}

// CREATE
function status(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: `Status is ${status}`,
    });
  }
  next();
}

// used in UPDATE / PUT
function statusIsKnown(req, res, next) {
  const { status } = req.body.data;
  if (status !== "booked" && status !== "seated" && status !== "finished") {
    return next({
      status: 400,
      message: `Status ${status}`,
    });
  }
  next();
}

async function isStatusCurrentlyFinished(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation.status == "finished") {
    return next({
      status: 400,
      message: "reservation already finished",
    });
  }
  next();
}

// used in used in READ / GET and UPDATE / PUT
async function idExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.reservation_id} does not exist in database`,
  });
}

function searchNumber(req, res, next) {
  const mobileNumberParam = req.query.mobile_number;
  if (mobileNumberParam) {
    res.locals.mobile_number = mobileNumberParam;
    // console.log(res.locals.mobile_number, "00000000000");
  }
  next();
}

async function read(req, res) {
  const { reservation: data } = res.locals;
  res.status(200).json({ data });
}

async function list(req, res) {
  if (res.locals.mobile_number) {
    const data = await reservationsService.search(res.locals.mobile_number);
    res.json({ data });
  } else {
    const data = await reservationsService.list(res.locals.date);
    res.json({ data });
  }
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updateReservation = {
    ...req.body.data,
    reservation_id: req.params.reservation_id,
  };
  const data = await reservationsService.update(updateReservation);
  res.status(200).json({ data });
}

module.exports = {
  list: [hasDate, searchNumber, asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    isValidPeople,
    nonPastNonTues,
    nonPast,
    duringOpenHours,
    status,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(idExists), read],
  update: [
    asyncErrorBoundary(idExists),
    statusIsKnown,
    asyncErrorBoundary(isStatusCurrentlyFinished),
    asyncErrorBoundary(update),
  ],
};

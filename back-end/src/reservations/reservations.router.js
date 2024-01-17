/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const notFound = require("../errors/notFound");

router.route("/").get(controller.list).post(controller.create);

// router.route("/new").post(controller.create).all(notFound);

module.exports = router;

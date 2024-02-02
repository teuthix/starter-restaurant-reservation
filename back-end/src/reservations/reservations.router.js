/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const notFound = require("../errors/notFound");

router.route("/").get(controller.list).post(controller.create);
router.route("/:reservation_id").get(controller.read).put(controller.edit);
router.route("/:reservation_id/status").put(controller.cancel);

module.exports = router;

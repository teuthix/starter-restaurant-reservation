const router = require("express").Router();
const controller = require("./tables.controller");
const notFound = require("../errors/notFound");

router.route("/").get(controller.list).post(controller.create);
router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.destroy);

module.exports = router;

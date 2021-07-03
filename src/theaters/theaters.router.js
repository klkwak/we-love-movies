const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// list route: GET /theaters
// GET /movies/:movieId/theaters

router
  .route("/")
  .get(controller.list)
  // .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;

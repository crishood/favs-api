const router = require("express").Router();
const listController = require("../controllers/list.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, listController.list);
router.route("/:listId").get(auth, listController.show);
router.route("/").post(auth, listController.create);
router.route("/:listId").delete(auth, listController.destroy);

module.exports = router;

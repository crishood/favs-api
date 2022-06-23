const router = require("express").Router();
const favController = require("../controllers/fav.controller");
const { auth } = require("../utils/auth");

router.route("/:listId").post(auth, favController.create);
router.route("/:favId").get(auth, favController.show);
router.route("/:favId").delete(auth, favController.destroy);

module.exports = router;

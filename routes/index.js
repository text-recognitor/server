const router = require("express").Router()
const PictureController = require("../controllers/pictureController")

router.post("/pictures", PictureController)

module.exports = router
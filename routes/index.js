'use strict'
const express = require('express')
const router = express.Router()
const images = require('../helpers/images')
const PictureController = require("../controllers/pictureController")

router.get('/', (req, res) => {
    res.status(200).json({msg : 'hello, connected!'})
})
router.post("/pictures", images.multer.single('image'), images.sendUploadToGCS, PictureController.uploadFile)
router.post('/analyze', PictureController.analyze)

module.exports = router
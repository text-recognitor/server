const axios = require("axios")

class PictureController {

static uploadFile(req, res) {
    res.status(200).json({
        link: req.file.cloudStoragePublicUrl
    })

    }

}

module.exports = PictureController
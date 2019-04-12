const axios = require("axios")
const analyzeImage = require('../helpers/imageAnalyzer')
const Picture = require("../models/picture")

class PictureController {

    static uploadFile(req, res) {
        Picture.create({
            imgURL: req.file.cloudStoragePublicUrl
        })
        .then(createdPicture => {
            res.status(200).json(createdPicture)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    }

    static analyze(req, res) {
        analyzeImage(function(err, data) {
            if(err)
            {
                res.status(500).json({error: err})
            }
            else {
                console.log(data);
                res.status(200).json({data: data})
            }
        })
    }
}
module.exports = PictureController
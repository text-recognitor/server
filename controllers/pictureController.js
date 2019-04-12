const axios = require("axios")
const analyzeImage = require('../helpers/imageAnalyzer')
const Picture = require("../models/picture")

class PictureController {

   static fetchAllImages(req, res) {
      Picture.find({})
      .limit(3)
      .then(pictures => {
          res.status(200).json(pictures)
      })
      .catch(err => {
        console.log(err, 'bagian fetch image')
        res.status(400).json(err)
      })
  }

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
      analyzeImage(req.body.imgURL, function(err, data) {

        if(err)
        {
            res.status(500).json(err)
        }
        else {
          data = data.join("\n")

            res.status(200).json({
              imgURL: req.body.imgURL,
              imgText: data
            })
        }
      })
    }

    static addImgTextToPicture(req, res) {
      console.log("UPDATING");
      console.log(req.body);
      Picture.findOneAndUpdate({
        imgURL: req.body.imgURL
      }, {
        $set: {
          imgText: req.body.imgText
        }
      }, { new: true })
      .then(updatedPiture => {
        res.status(200).json(updatedPiture)
      })
      .catch(err => {
        console.log(err);
      })
    }
}
module.exports = PictureController
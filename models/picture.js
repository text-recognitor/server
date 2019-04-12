const mongoose = require("mongoose")
const { Schema } = mongoose

const pictureSchema = new Schema({
  imgURL: String,
  imgText: String
})

const Picture = mongoose.model("Picture", pictureSchema)

module.exports = Picture
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    type: { type: String }
});

module.exports = mongoose.model("Image", imageSchema);
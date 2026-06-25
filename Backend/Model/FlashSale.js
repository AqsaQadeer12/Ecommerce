const mongoose = require("mongoose")

const flashsaleSchema = new mongoose.Schema({
    title: String,
    price: Number,
    url: String
});

module.exports = mongoose.model("FlashSale", flashsaleSchema);
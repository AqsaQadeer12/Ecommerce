const mongoose = require("mongoose");

const SellerproductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model("SellerProduct", SellerproductSchema);
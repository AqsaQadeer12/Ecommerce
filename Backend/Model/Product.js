const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },

        title: { type: String, required: true },

        price: { type: Number, required: true },

        oldPrice: { type: Number, default: 0 },

        discount: { type: Number, default: 0 },

        description: { type: String, default: "" },

        stock: { type: Number, default: 10 },

        rating: { type: Number, default: 0 },

        reviews: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
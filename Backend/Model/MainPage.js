const mongoose = require("mongoose");

const MainPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("MainPage", MainPageSchema);
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Daraz");
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("DB Connection Error:", err);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = connectDB;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const connectDB = require("./DB-Connection/Db");
const Product = require("./Model/Product");

// Imports
const categoryRoutes = require("./Controllers/CategoryRoutes");
const flashSaleRoutes = require("./Controllers/FlashSaleRoutes");
const imageRoutes = require("./Controllers/ImageRoutes");
const mainpageRoutes = require("./Controllers/MainpageRoutes");
const productRoutes = require("./Controllers/ProductRoutes");

const app = express();

// Uploads folder automatic check/create
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "uploads"));
}

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Route for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
connectDB();

// Multer Disk Storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Direct Product Add Route
app.post("/api/product/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Product image upload karna zaroori hai!" });
        }

        const { title, price, oldPrice, discount, description, stock } = req.body;
        const fileUrl = `/uploads/${req.file.filename}`;

        const newProduct = new Product({
            image: fileUrl,
            title: title,
            price: Number(price),
            oldPrice: Number(oldPrice) || Number(price),
            discount: Number(discount) || 0,
            rating: 0,
            reviews: 0,
            description: description || "",
            stock: Number(stock) || 10
        });

        const savedProduct = await newProduct.save();
        return res.status(201).json({
            message: "Product Saved Successfully! 🎉",
            product: savedProduct
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error!", error: error.message });
    }
});

// 🚀 ADDED: Seller Authentication Routes Placeholder 
// (If you have a separate file for this later, move it out to Controllers)
app.post("/api/auth/seller/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Log incoming data to check it works
        console.log("Seller Registration Attempt:", email);

        // Your Database Save logic for Seller should go here...

        return res.status(201).json({
            success: true,
            message: "Seller registered successfully placeholder! 🎉"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error!", error: error.message });
    }
});

// Base API Routes
app.use("/api/images", imageRoutes);
app.use("/api/flash-sale", flashSaleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/mainpages", mainpageRoutes);
app.use("/api/product", productRoutes);
app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is working perfectly!");
});

// Global 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
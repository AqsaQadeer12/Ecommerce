const express = require("express");
const router = express.Router();
const Product = require("../Model/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const data = await Product.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
    try {
        const saved = await Product.create(req.body);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// ==========================================
// 🔑 AUTHENTICATION ENDPOINTS (Temporary Integration)
// ==========================================

// 🚀 REGISTER ROUTE (Dono Customer aur Seller ke liye)
router.post("/auth/register", async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;

        console.log(`Registration Request Recieved! Role: ${role}, Email: ${email}`);

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // Yahan aapka database mein user save karne ka logic aayega agar Schema ready ho.
        // Filhal testing ke liye hum successful response bhej rahe hain:
        return res.status(201).json({
            message: `${role === "seller" ? "Seller" : "Customer"} account successfully created! 🎉`,
            token: "mock-jwt-token-xyz123"
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 🚀 LOGIN ROUTE
router.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        return res.status(200).json({
            message: "Login successful! Welcome back.",
            token: "mock-jwt-token-xyz123"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ==========================================
// 🔑 AUTHENTICATION ENDPOINTS (Integrated)
// ==========================================

// 🚀 REGISTER ENDPOINT
router.post("/auth/register", async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;
        console.log(`Registration Request Received! Role: ${role}, Email: ${email}`);

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Mandatory fields are missing!" });
        }

        return res.status(201).json({
            message: `${role === "seller" ? "Seller" : "Customer"} account created successfully! 🎉`,
            token: "mock-jwt-token-xyz123"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 🚀 LOGIN ENDPOINT (Matches Register Logic)
router.post("/auth/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(`Login Request Received! Role: ${role}, Email: ${email}`);

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required fields." });
        }

        // --- Simulated Database Check ---
        // In production, verify the email, password, and matching role here.

        return res.status(200).json({
            message: `Authentication successful! Welcome back to your ${role} portal.`,
            token: "mock-jwt-token-xyz123" // Sends token back to browser memory
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
module.exports = router;
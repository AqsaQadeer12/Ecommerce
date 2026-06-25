const express = require("express");
const router = express.Router();
const MainPage = require("../Model/MainPage");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const data = await MainPage.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const data = await MainPage.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE PRODUCTS
router.post("/", async (req, res) => {
    try {
        const saved = await MainPage.create(req.body);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
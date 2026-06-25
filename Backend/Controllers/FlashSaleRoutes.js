const express = require("express");
const router = express.Router();
const FlashSale = require("../Model/FlashSale");

// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
    try {
        const data = await FlashSale.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message, });
    }
});
// ================= GET SINGLE PRODUCT =================
router.get("/:id", async (req, res) => {
    try {
        const data = await FlashSale.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Product not found", });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});
// ================= POST PRODUCTS =================
router.post("/", async (req, res) => {
    try {
        const saved = await FlashSale.insertMany(req.body);
        res.json(saved);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router;
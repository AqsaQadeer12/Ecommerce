const express = require("express");
const router = express.Router();
const Image = require("../Model/Image");

router.get("/", async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const saved = await Image.insertMany(req.body);
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Category = require("../Model/Category")


router.get('/', async (req, res) => {
    try {
        const data = await Category.find();
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const saved = await Category.insertMany(data)
        res.json(saved)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;
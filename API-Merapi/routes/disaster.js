const express = require('express');
const { getAllDisasters, addDisaster, updateDisaster, deleteDisaster } = require('../models/disasterModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all disasters
router.get('/', async (req, res) => {
    const { data, error } = await getAllDisasters();
    if (error) return res.status(500).json({ error });

    res.status(200).json({ message: 'Data bencana berhasil diambil.', data });
});

// Add a new disaster
router.post('/', authMiddleware, async (req, res) => {
    const { status, affected_areas, hazard_zone_km, activity_description } = req.body;

    const { data, error } = await addDisaster({
        status,
        affected_areas,
        hazard_zone_km,
        activity_description,
    });

    if (error) return res.status(400).json({ error });

    res.status(201).json({ message: 'Bencana berhasil ditambahkan.', data });
});

// Update a disaster
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await updateDisaster(id, updates);
    if (error) return res.status(400).json({ error });

    res.status(200).json({ message: 'Bencana berhasil diperbarui.', data });
});

// Delete a disaster
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const { data, error } = await deleteDisaster(id);
    if (error) return res.status(400).json({ error });

    res.status(200).json({ message: 'Bencana berhasil dihapus.', data });
});

module.exports = router;

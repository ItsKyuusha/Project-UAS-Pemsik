const express = require('express');
const { getAllReports, addReport, updateReport, deleteReport } = require('../models/reportModels');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all reports
router.get('/', async (req, res) => {
    const { data, error } = await getAllReports();

    if (error) return res.status(500).json({ error });
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Tidak ada laporan yang ditemukan.' });
    }

    res.status(200).json({ message: 'Data laporan berhasil diambil.', data });
});

// Add a new report
router.post('/', authMiddleware, async (req, res) => {
    const { reporter, description, location, date_report } = req.body;

    const { data, error } = await addReport({
        reporter,
        description,
        location,
        date_report,
    });

    if (error) return res.status(400).json({ error });

    res.status(201).json({ message: 'Laporan berhasil ditambahkan.', data });
});

// Update a report
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await updateReport(id, updates);
    if (error) return res.status(400).json({ error });

    res.status(200).json({ message: 'Laporan berhasil diperbarui.', data });
});

// Delete a report
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const { message, error } = await deleteReport(id);
    if (error) return res.status(400).json({ error });

    res.status(200).json({ message });
});

module.exports = router;

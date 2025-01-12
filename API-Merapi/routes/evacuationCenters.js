const express = require('express');
const {
    getAllEvacuationCenters,
    addEvacuationCenter,
    updateEvacuationCenter,
    deleteEvacuationCenter
} = require('../models/evacuationModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all evacuation centers
router.get('/', async (req, res) => {
    console.log('Fetching all evacuation centers...');
    const { data, error } = await getAllEvacuationCenters();

    if (error) {
        console.error('Error fetching evacuation centers:', error.message);
        return res.status(500).json({
            error: 'Failed to fetch evacuation centers',
            details: error.message
        });
    }

    console.log('Successfully fetched evacuation centers:', data);
    res.json({ message: 'Evacuation centers fetched successfully', data });
});

// Add a new evacuation center
router.post('/', authMiddleware, async (req, res) => {
    console.log('Received request to add a new evacuation center:', req.body);

    const { name, location, capacity, current_occupants, status } = req.body;

    // Validate input
    if (!name || !location || !capacity || !current_occupants || !status) {
        console.warn('Validation failed: Missing required fields');
        return res.status(400).json({
            error: 'Missing required fields',
            requiredFields: ['name', 'location', 'capacity', 'current_occupants', 'status']
        });
    }

    // Add evacuation center to the database
    const { message, data, error } = await addEvacuationCenter({ name, location, capacity, current_occupants, status });
    if (error) {
        console.error('Error adding evacuation center:', error.message);
        return res.status(400).json({
            error: 'Failed to add evacuation center',
            details: error.message
        });
    }

    console.log('Evacuation center added successfully');
    res.status(201).json({ message, data });
});

// Update an evacuation center
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    console.log(`Received request to update evacuation center with ID: ${id}`, updates);

    // Validate input
    if (Object.keys(updates).length === 0) {
        console.warn('Validation failed: No update fields provided');
        return res.status(400).json({ error: 'No update fields provided' });
    }

    // Update evacuation center in the database
    const { message, data, error } = await updateEvacuationCenter(id, updates);
    if (error) {
        console.error(`Error updating evacuation center with ID ${id}:`, error.message);
        return res.status(400).json({
            error: 'Failed to update evacuation center',
            details: error.message
        });
    }

    console.log(`Evacuation center with ID ${id} updated successfully`);
    res.json({ message, data });
});

// Delete an evacuation center
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    console.log(`Received request to delete evacuation center with ID: ${id}`);

    const { message, error } = await deleteEvacuationCenter(id);
    if (error) {
        console.error(`Error deleting evacuation center with ID ${id}:`, error.message);
        return res.status(400).json({
            error: 'Failed to delete evacuation center',
            details: error.message
        });
    }

    console.log(`Evacuation center with ID ${id} deleted successfully`);
    res.json({ message });
});

module.exports = router;

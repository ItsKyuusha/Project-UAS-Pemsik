const supabase = require('../config/supabase');

// Get All Evacuation Centers
const getAllEvacuationCenters = async () => {
    try {
        console.log('Fetching all evacuation centers...');
        const { data, error } = await supabase.from('evacuation_centers').select('*');

        if (error) {
            console.error('Error fetching evacuation centers:', error.message);
            return { error: error.message };
        }

        console.log('Successfully fetched evacuation centers:', data);
        return { data };
    } catch (err) {
        console.error('Unexpected error fetching evacuation centers:', err);
        return { error: 'Unexpected error occurred while fetching evacuation centers.' };
    }
};

// Add Evacuation Center
const addEvacuationCenter = async (center) => {
    console.log('Attempting to add new evacuation center:', center);

    // Validasi input (opsional)
    if (!center.name || !center.location) {
        console.log('Validation error: name or location is missing');
        return { error: 'name and location are required fields' };
    }

    try {
        const { data, error } = await supabase
            .from('evacuation_centers')
            .insert(center)
            .select('*'); // Memastikan data yang dimasukkan dikembalikan

        if (error) {
            console.error('Error adding evacuation center:', error.message);
            return { error: error.message };
        }

        console.log('Evacuation center added successfully:', data);
        return { message: 'Evacuation center added successfully', data: data[0] }; // Mengembalikan data yang pertama
    } catch (err) {
        console.error('Unexpected error adding evacuation center:', err);
        return { error: 'Unexpected error occurred while adding evacuation center.' };
    }
};

// Update Evacuation Center
const updateEvacuationCenter = async (id, updates) => {
    console.log(`Attempting to update evacuation center with ID: ${id}`);
    console.log('Updates:', updates);

    // Validasi jika tidak ada data untuk diperbarui
    if (Object.keys(updates).length === 0) {
        console.warn('Validation failed: No update fields provided');
        return { error: 'No update fields provided' };
    }

    try {
        const { data, error } = await supabase
            .from('evacuation_centers')
            .update(updates)
            .eq('id', id)
            .select('*'); // Memastikan data yang diperbarui dikembalikan

        if (error) {
            console.error('Error updating evacuation center:', error.message);
            return { error: error.message };
        }

        // Jika tidak ada data yang diupdate (data null)
        if (!data || data.length === 0) {
            console.log('No evacuation center found with the given ID.');
            return { error: 'No evacuation center found with the given ID.' };
        }

        console.log('Evacuation center updated successfully:', data);
        return { message: 'Evacuation center updated successfully', data: data[0] }; // Mengembalikan data yang pertama
    } catch (err) {
        console.error('Unexpected error updating evacuation center:', err);
        return { error: 'Unexpected error occurred while updating evacuation center.' };
    }
};

// Delete Evacuation Center
const deleteEvacuationCenter = async (id) => {
    console.log(`Attempting to delete evacuation center with ID: ${id}`);

    try {
        const { error } = await supabase.from('evacuation_centers').delete().eq('id', id);

        if (error) {
            console.error('Error deleting evacuation center:', error.message);
            return { error: error.message };
        }

        console.log('Evacuation center deleted successfully');
        return { message: 'Evacuation center deleted successfully' };
    } catch (err) {
        console.error('Unexpected error deleting evacuation center:', err);
        return { error: 'Unexpected error occurred while deleting evacuation center.' };
    }
};

module.exports = {
    getAllEvacuationCenters,
    addEvacuationCenter,
    updateEvacuationCenter,
    deleteEvacuationCenter,
};

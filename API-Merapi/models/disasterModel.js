const supabase = require('../config/supabase');

// Get All Disasters
const getAllDisasters = async () => {
    try {
        console.log('Fetching all disasters...');
        const { data, error } = await supabase.from('disasters').select('*');

        if (error) {
            console.error('Error fetching disasters:', error.message);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            console.log('No disasters found in the database.');
            return { data: [], message: 'Tidak ada data bencana yang ditemukan.' };
        }

        console.log('Successfully fetched disasters:', data);
        return { data, message: 'Data bencana berhasil diambil.' };
    } catch (err) {
        console.error('Unexpected error fetching disasters:', err);
        return { error: 'Unexpected error occurred while fetching disasters.' };
    }
};

// Add Disaster
const addDisaster = async (disaster) => {
    console.log('Attempting to add new disaster:', disaster);

    if (!disaster.affected_areas) {
        console.log('Validation error: affected_areas is missing');
        return { error: 'affected_areas is required' };
    }

    try {
        const { data, error } = await supabase
            .from('disasters')
            .insert(disaster)
            .select('*'); // Mengembalikan data yang ditambahkan

        if (error) {
            console.error('Error adding disaster:', error.message);
            return { error: error.message };
        }

        console.log('Disaster added successfully:', data);
        return { data, message: 'Bencana berhasil ditambahkan.' };
    } catch (err) {
        console.error('Unexpected error adding disaster:', err);
        return { error: 'Unexpected error occurred while adding disaster.' };
    }
};

// Update Disaster
const updateDisaster = async (id, updates) => {
    console.log(`Attempting to update disaster with ID: ${id}`);
    console.log('Updates:', updates);

    try {
        const { data, error } = await supabase
            .from('disasters')
            .update(updates)
            .eq('id', id)
            .select('*'); // Mengembalikan data yang diperbarui

        if (error) {
            console.error('Error updating disaster:', error.message);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            console.log(`No disaster found with ID: ${id}`);
            return { error: `Data bencana dengan ID ${id} tidak ditemukan.` };
        }

        console.log('Disaster updated successfully:', data);
        return { data, message: 'Bencana berhasil diperbarui.' };
    } catch (err) {
        console.error('Unexpected error updating disaster:', err);
        return { error: 'Unexpected error occurred while updating disaster.' };
    }
};

const deleteDisaster = async (id) => {
    console.log(`Attempting to delete disaster with ID: ${id}`);

    try {
        const { error, count } = await supabase
            .from('disasters')
            .delete()
            .eq('id', id)
            .select('*', { count: 'exact' }); // Menggunakan count untuk validasi

        if (error) {
            console.error('Error deleting disaster:', error.message);
            return { error: 'Gagal menghapus data bencana.' };
        }

        // Jika tidak ada data yang dihapus
        if (count === 0) {
            console.log(`No disaster found with ID: ${id}`);
            return { error: `Data bencana dengan ID ${id} tidak ditemukan.` };
        }

        console.log(`Disaster with ID ${id} deleted successfully.`);
        return { message: 'Bencana berhasil dihapus.' };
    } catch (err) {
        console.error('Unexpected error deleting disaster:', err);
        return { error: 'Terjadi kesalahan tak terduga saat menghapus data.' };
    }
};


module.exports = { getAllDisasters, addDisaster, updateDisaster, deleteDisaster };

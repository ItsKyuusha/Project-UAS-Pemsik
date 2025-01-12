const supabase = require('../config/supabase');

// Get All Reports
const getAllReports = async () => {
    try {
        console.log('Fetching all reports...');
        const { data, error } = await supabase.from('reports').select('*'); // Memastikan memilih semua data yang diperlukan

        if (error) {
            console.error('Error fetching reports:', error.message);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            console.log('No reports found in the database.');
            return { error: 'Tidak ada laporan yang ditemukan.' };
        }

        console.log('Successfully fetched reports:', data);
        return { data };  // Mengembalikan data saja
    } catch (err) {
        console.error('Unexpected error fetching reports:', err);
        return { error: 'Unexpected error occurred while fetching reports.' };
    }
};

// Add Report
const addReport = async (report) => {
    console.log('Attempting to add new report:', report);

    if (!report.reporter || !report.description || !report.location || !report.date_report) {
        console.log('Validation error: report, description, location, or date_report is missing');
        return { error: 'reporter, description, location, and date_report are required' };
    }

    try {
        const { data, error } = await supabase
            .from('reports')
            .insert(report)
            .select('*'); // Mengembalikan data yang ditambahkan

        if (error) {
            console.error('Error adding report:', error.message);
            return { error: error.message };
        }

        console.log('Report added successfully:', data);
        return { data };  // Mengembalikan data yang baru ditambahkan
    } catch (err) {
        console.error('Unexpected error adding report:', err);
        return { error: 'Unexpected error occurred while adding report.' };
    }
};

// Update Report
const updateReport = async (id, updates) => {
    console.log(`Attempting to update report with ID: ${id}`);
    console.log('Updates:', updates);

    try {
        const { data, error } = await supabase
            .from('reports')
            .update(updates)
            .eq('id', id)
            .select('*'); // Mengembalikan data yang diperbarui

        if (error) {
            console.error('Error updating report:', error.message);
            return { error: error.message };
        }

        if (!data || data.length === 0) {
            console.log(`No report found with ID: ${id}`);
            return { error: `Laporan dengan ID ${id} tidak ditemukan.` };
        }

        console.log('Report updated successfully:', data);
        return { data };  // Mengembalikan data yang diperbarui
    } catch (err) {
        console.error('Unexpected error updating report:', err);
        return { error: 'Unexpected error occurred while updating report.' };
    }
};

// Delete Report
const deleteReport = async (id) => {
    console.log(`Attempting to delete report with ID: ${id}`);

    try {
        const { error, count } = await supabase
            .from('reports')
            .delete()
            .eq('id', id)
            .select('*', { count: 'exact' }); // Menggunakan count untuk validasi

        if (error) {
            console.error('Error deleting report:', error.message);
            return { error: 'Gagal menghapus laporan.' };
        }

        // Jika tidak ada data yang dihapus
        if (count === 0) {
            console.log(`No report found with ID: ${id}`);
            return { error: `Laporan dengan ID ${id} tidak ditemukan.` };
        }

        console.log(`Report with ID ${id} deleted successfully.`);
        return { message: 'Laporan berhasil dihapus.' };
    } catch (err) {
        console.error('Unexpected error deleting report:', err);
        return { error: 'Terjadi kesalahan tak terduga saat menghapus laporan.' };
    }
};

module.exports = { getAllReports, addReport, updateReport, deleteReport };

// config/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Pastikan dotenv di-load agar .env bisa diakses

// Mengambil variabel dari .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Pastikan variabel ini ada
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key must be set in .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const disasterRoutes = require('./routes/disaster');
const evacuationRoutes = require('./routes/evacuationCenters');
const reportRoutes = require('./routes/reports');

// Memuat variabel lingkungan dari .env
dotenv.config();

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rute Health Check
app.get('/', (req, res) => {
    console.log('Health check accessed');
    res.send({ message: 'Welcome to Gunung Merapi Disaster Management API' });
});

// Menambahkan rute ke aplikasi
app.use('/api/auth', authRoutes); // Rute otentikasi
app.use('/api/disaster', disasterRoutes); // Rute manajemen bencana
app.use('/api/evacuations', evacuationRoutes); // Rute pusat evakuasi
app.use('/api/reports', reportRoutes); // Rute laporan

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaMountain } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/disaster')
      .then(response => {
        console.log("Struktur Respons API:", response);
        console.log("Status Respons API:", response.status);

        if (Array.isArray(response.data)) {
          setDisasters(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setDisasters(response.data.data);
        } else {
          setError('Data yang diterima tidak valid');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError('Terjadi kesalahan saat mengambil data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const latestDisaster = disasters[0];

  const years = ['2020', '2021', '2022', '2023', '2024'];
  const disasterCounts = [5, 7, 4, 10, 8];

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Jumlah Bencana Alam per Tahun',
        data: disasterCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistik Bencana Alam per Tahun',
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal':
        return 'text-green-500';
      case 'Waspada':
        return 'text-yellow-500';
      case 'Siaga':
        return 'text-orange-500';
      case 'Awas':
        return 'text-red-500'; 
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {latestDisaster && (
        <div className="p-6 border rounded-lg shadow-lg bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Aktivitas Terbaru: {latestDisaster.activity_description}</h3>
          <p className="text-lg mb-2">
            <strong>Status:</strong> {latestDisaster.status}{' '}
            <FaMountain className={`inline ml-2 ${getStatusColor(latestDisaster.status)}`} size={20} />
          </p>
          <p className="text-lg mb-2"><strong>Wilayah Terkena Dampak:</strong> {latestDisaster.affected_areas}</p>
          <p className="text-lg mb-2"><strong>Zona Bahaya:</strong> {latestDisaster.hazard_zone_km} km dari puncak Gunung Merapi</p>
          <p className="text-lg mb-4"><strong>Terakhir Diperbarui:</strong> {new Date(latestDisaster.updated_at).toLocaleString()}</p>
          
          <p className="text-sm text-gray-500">Data ini adalah informasi bencana terbaru yang tercatat.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

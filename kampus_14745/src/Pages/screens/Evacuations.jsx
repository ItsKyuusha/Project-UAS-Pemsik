import React, { useEffect, useState } from "react";
import axios from "axios";

const Evacuations = () => {
  const [evacuationCenters, setEvacuationCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvacuationCenters = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/evacuations");

      console.log("Struktur Respons API:", response.data);
      console.log("Status Respons API:", response.status);

      setEvacuationCenters(response.data.data);
    } catch (err) {
      console.error("Error fetching evacuation centers:", err);
      setError("Gagal memuat data pengungsian.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvacuationCenters();
  }, []);

  if (loading) {
    return <p>Memuat data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!evacuationCenters || evacuationCenters.length === 0) {
    return <p>Data pengungsian tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Evacuation Centers</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Capacity</th>
            <th className="border p-2">Current Occupants</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {evacuationCenters.map((center, index) => (
            <tr key={center.id} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{center.name}</td>
              <td className="border p-2">{center.location}</td>
              <td className="border p-2">{center.capacity}</td>
              <td className="border p-2">{center.current_occupants}</td>
              <td className="border p-2">{center.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Evacuations;

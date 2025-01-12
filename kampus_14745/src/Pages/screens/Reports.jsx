import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [newReport, setNewReport] = useState({ reporter: "", location: "", description: "", date_report: "" });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.data)) {
          setReports(response.data.data);
        } else {
          console.error("Data reports tidak dalam bentuk array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    if (token) {
      fetchReports();
    } else {
      console.log("No token available");
    }
  }, [token]);

  const handleAddReport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reports",
        newReport,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports([...reports, response.data]);
      setNewReport({ reporter: "", location: "", description: "", date_report: "" });
      Swal.fire("Success", "Report added successfully!", "success");
    } catch (error) {
      console.error("Error adding report:", error);
      Swal.fire("Error", "Failed to add report.", "error");
    }
  };

  const handleEditReport = (report) => {
    Swal.fire({
      title: "Edit Report",
      html: `
        <div class="swal2-input-container">
          <input id="reporter" class="swal2-input" placeholder="Reporter" value="${report.reporter}" />
        </div>
        <div class="swal2-input-container">
          <input id="location" class="swal2-input" placeholder="Location" value="${report.location}" />
        </div>
        <div class="swal2-input-container">
          <textarea id="description" class="swal2-textarea" placeholder="Description">${report.description}</textarea>
        </div>
        <div class="swal2-input-container">
          <input id="date_report" class="swal2-input" placeholder="Date Report (YYYY-MM-DD)" value="${report.date_report}" />
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const updatedReport = {
          ...report,
          reporter: document.getElementById("reporter").value,
          location: document.getElementById("location").value,
          description: document.getElementById("description").value,
          date_report: document.getElementById("date_report").value,
        };
        return updatedReport;
      },
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedReport = result.value;
        axios
          .put(`http://localhost:5000/api/reports/${report.id}`, updatedReport, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setReports((prevReports) =>
              prevReports.map((r) => (r.id === report.id ? updatedReport : r))
            );
            Swal.fire("Success", "Report updated successfully!", "success");
          })
          .catch((error) => {
            console.error("Error editing report:", error);
            Swal.fire("Error", "Failed to edit report.", "error");
          });
      }
    });
  };

  const handleDeleteReport = (reportId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/reports/${reportId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setReports(reports.filter((report) => report.id !== reportId));
            Swal.fire("Deleted!", "Report has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting report:", error);
            Swal.fire("Error", "Failed to delete report.", "error");
          });
      }
    });
  };

  const showAddReportPopup = () => {
    Swal.fire({
      title: "Add New Report",
      html: `
        <div class="swal2-input-container">
          <input id="reporter" class="swal2-input" placeholder="Reporter" value="${newReport.reporter}" />
        </div>
        <div class="swal2-input-container">
          <input id="location" class="swal2-input" placeholder="Location" value="${newReport.location}" />
        </div>
        <div class="swal2-input-container">
          <textarea id="description" class="swal2-textarea" placeholder="Description">${newReport.description}</textarea>
        </div>
        <div class="swal2-input-container">
          <input id="date_report" class="swal2-input" placeholder="Date Report (YYYY-MM-DD)" value="${newReport.date_report}" />
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        setNewReport({
          reporter: document.getElementById("reporter").value,
          location: document.getElementById("location").value,
          description: document.getElementById("description").value,
          date_report: document.getElementById("date_report").value,
        });
        return true;
      },
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Add Report",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddReport();
      }
    });
  };
  
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={showAddReportPopup}
          className="p-2 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 transition duration-300"
        >
          Add Report
        </button>
      </div>

      {Array.isArray(reports) && reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            >
              <p className="mb-2">
                <span className="font-semibold">Reporter:</span> {report.reporter}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span> {report.description}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {report.location || "Unknown Location"}
              </p>
              <p>
                <span className="font-semibold">Date Report:</span> {report.date_report}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleEditReport(report)}
                  className="p-2 bg-yellow-500 text-white rounded mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
};

export default Reports;

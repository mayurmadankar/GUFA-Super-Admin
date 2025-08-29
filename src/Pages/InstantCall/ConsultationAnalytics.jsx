import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import axios from "axios";

const ConsultationAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Add search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAnalytics, setFilteredAnalytics] = useState([]);

  // Fetch analytics data from backend API
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");
      // Uncomment below when API is ready
      // const response = await axios.get(
      //   `${import.meta.env.VITE_BASEURL}/super_admin/consultation_analytics`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` }
      //   }
      // );
      // if (response.data.status === "success") {
      //   setAnalytics(response.data.data.details || []);
      // } else {
      //   throw new Error(response.data.message || "Failed to fetch data");
      // }

      // Dummy data for UI testing
      setAnalytics([
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        },
        {
          date: "2025-06-01",
          total_consultations: 67,
          unique_patients: 50,
          repeat_patients: 17,
          avg_duration: 5.2,
          top_specialties: "General, Derm, Ortho",
          most_prescribed_drugs: "Paracetamol, Amox"
        },
        {
          date: "2025-06-02",
          total_consultations: 72,
          unique_patients: 55,
          repeat_patients: 17,
          avg_duration: 5.5,
          top_specialties: "General, Gynae",
          most_prescribed_drugs: "Cetrizine, Ranitidine"
        }
      ]);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Filter analytics based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAnalytics(analytics);
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = analytics.filter((item) => {
        return (
          // Search in date
          (item.date || "").toLowerCase().includes(searchLower) ||
          // Search in numeric values (convert to string)
          String(item.total_consultations || "").includes(searchLower) ||
          String(item.unique_patients || "").includes(searchLower) ||
          String(item.repeat_patients || "").includes(searchLower) ||
          String(item.avg_duration || "").includes(searchLower) ||
          // Search in specialties
          (item.top_specialties || "").toLowerCase().includes(searchLower) ||
          // Search in prescribed drugs
          (item.most_prescribed_drugs || "").toLowerCase().includes(searchLower)
        );
      });
      setFilteredAnalytics(filtered);
    }
  }, [analytics, searchTerm]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
    }
  };

  // Calculate pagination for filtered data
  const totalFilteredPages = Math.ceil(filteredAnalytics.length / perPage);
  const paginatedAnalytics = filteredAnalytics.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div>
      {/* <h2 className="my-3">Consultation Analytics</h2> */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={fetchAnalytics}>
            Retry
          </Button>
        </Alert>
      ) : (
        <>
          {/* Search input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Date, Consultations Count, Specialties, Prescribed Drugs, etc."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr No.</th>
                  <th>Date</th>
                  <th>Total Consultations</th>
                  <th>Unique Patients</th>
                  <th>Repeat Patients</th>
                  <th>Avg. Duration</th>
                  <th>Top Specialties</th>
                  <th>Most Prescribed Drugs</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedAnalytics.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-muted">
                      {searchTerm
                        ? "No analytics data found matching your search."
                        : "No analytics data found."}
                    </td>
                  </tr>
                ) : (
                  paginatedAnalytics.map((row, i) => (
                    <tr key={`${row.date}-${i}`}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{row.date}</td>
                      <td>{row.total_consultations}</td>
                      <td>{row.unique_patients}</td>
                      <td>{row.repeat_patients}</td>
                      <td>{row.avg_duration}</td>
                      <td>{row.top_specialties}</td>
                      <td>{row.most_prescribed_drugs}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          {/* Pagination */}
          {totalFilteredPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination size="sm">
                <Pagination.First
                  disabled={page === 1}
                  onClick={() => handlePageChange(1)}
                />
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                />
                {/* Show limited page numbers */}
                {(() => {
                  const maxVisiblePages = 5;
                  let startPage = Math.max(
                    1,
                    page - Math.floor(maxVisiblePages / 2)
                  );
                  let endPage = Math.min(
                    totalFilteredPages,
                    startPage + maxVisiblePages - 1
                  );

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  const pages = [];

                  // Show first page if not in range
                  if (startPage > 1) {
                    pages.push(
                      <Pagination.Item
                        key={1}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </Pagination.Item>
                    );
                    if (startPage > 2) {
                      pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
                    }
                  }

                  // Show visible pages
                  for (let p = startPage; p <= endPage; p++) {
                    pages.push(
                      <Pagination.Item
                        key={p}
                        active={p === page}
                        onClick={() => handlePageChange(p)}
                      >
                        {p}
                      </Pagination.Item>
                    );
                  }

                  // Show last page if not in range
                  if (endPage < totalFilteredPages) {
                    if (endPage < totalFilteredPages - 1) {
                      pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
                    }
                    pages.push(
                      <Pagination.Item
                        key={totalFilteredPages}
                        onClick={() => handlePageChange(totalFilteredPages)}
                      >
                        {totalFilteredPages}
                      </Pagination.Item>
                    );
                  }

                  return pages;
                })()}
                <Pagination.Next
                  disabled={page === totalFilteredPages}
                  onClick={() => handlePageChange(page + 1)}
                />
                <Pagination.Last
                  disabled={page === totalFilteredPages}
                  onClick={() => handlePageChange(totalFilteredPages)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultationAnalytics;

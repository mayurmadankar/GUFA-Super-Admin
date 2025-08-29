import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const RequiredDoctor = () => {
  const [specialitiesCount, setSpecialityCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Add search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecialities, setFilteredSpecialities] = useState([]);

  // Calculate pagination for filtered data
  const totalFilteredPages = Math.ceil(filteredSpecialities.length / perPage);
  const paginatedSpecialities = filteredSpecialities.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const specialityMap = {
    1: "General Physician",
    2: "Gynecologist",
    3: "Dermatologist",
    4: "Sexologist",
    5: "Psychiatrist",
    6: "Gastroenterologist",
    7: "Pediatrician",
    8: "ENT Specialist",
    9: "Urologist",
    10: "Orthopedist",
    11: "Neurologist",
    12: "Cardiologist",
    13: "Nutritionist/Dietitian",
    14: "Diabetology",
    15: "Eye & Vision",
    16: "Dentist",
    17: "Pulmonologist",
    18: "Ayurveda",
    19: "Homeopathy",
    20: "Cancer",
    21: "Physiotherapist",
    22: "Nephrologist",
    23: "Trichologist"
  };

  const fetchSpecialityCounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");

      //   const response = await axios.get(
      //     `${
      //       import.meta.env.VITE_BASEURL
      //     }/super_admin/required_speciality_counts`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     }
      //   );

      //   if (response.data.status === "success") {
      //     setSpecialityCounts(response.data.data.details || []);
      //   } else {
      //     throw new Error(response.data.message || "Failed to fetch data");
      //   }

      // Enhanced dummy data for better search testing
      const specialitiesCountData = [
        { speciality: 1, not_available_count: 15 },
        { speciality: 2, not_available_count: 8 },
        { speciality: 3, not_available_count: 12 },
        { speciality: 4, not_available_count: 3 },
        { speciality: 5, not_available_count: 6 },
        { speciality: 6, not_available_count: 9 },
        { speciality: 7, not_available_count: 11 },
        { speciality: 8, not_available_count: 7 },
        { speciality: 9, not_available_count: 4 },
        { speciality: 10, not_available_count: 13 },
        { speciality: 11, not_available_count: 5 },
        { speciality: 12, not_available_count: 18 },
        { speciality: 13, not_available_count: 2 },
        { speciality: 14, not_available_count: 10 },
        { speciality: 15, not_available_count: 14 },
        { speciality: 16, not_available_count: 16 },
        { speciality: 17, not_available_count: 1 },
        { speciality: 18, not_available_count: 20 },
        { speciality: 19, not_available_count: 17 },
        { speciality: 20, not_available_count: 22 },
        { speciality: 21, not_available_count: 19 },
        { speciality: 22, not_available_count: 21 },
        { speciality: 23, not_available_count: 23 }
      ];
      setSpecialityCounts(specialitiesCountData);
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

  // Filter specialities based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSpecialities(specialitiesCount);
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = specialitiesCount.filter((spec) => {
        const specialityName = specialityMap[spec.speciality] || "";

        return (
          // Search in speciality name
          specialityName.toLowerCase().includes(searchLower) ||
          // Search in not available count (exact match for numbers)
          String(spec.not_available_count || "").includes(searchLower) ||
          // Search in speciality ID
          String(spec.speciality || "").includes(searchLower)
        );
      });
      setFilteredSpecialities(filtered);
    }
  }, [specialitiesCount, searchTerm]);

  useEffect(() => {
    fetchSpecialityCounts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* <h2 className="my-3">Required Doctor Specialities</h2> */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={fetchSpecialityCounts}>
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
              placeholder="Search by Doctor Speciality, Count, etc."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr No.</th>
                  <th>Doctor Speciality</th>
                  <th>Not Available Count</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedSpecialities.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      {searchTerm
                        ? "No specialities found matching your search."
                        : "No speciality data found."}
                    </td>
                  </tr>
                ) : (
                  paginatedSpecialities.map((spec, i) => (
                    <tr key={spec.speciality}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{specialityMap[spec.speciality] || "Unknown"}</td>
                      <td>{spec.not_available_count}</td>
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

export default RequiredDoctor;

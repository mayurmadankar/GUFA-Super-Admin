import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import { useCallback } from "react";

const Attempted = () => {
  const [attemptedUsers, setAttemptedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  //Add search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchAttemptedUsers = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");
      // const response = await axios.get(
      //   `${import.meta.env.VITE_BASEURL}/super_admin/attempted_users`,
      //   {
      //     params: {
      //       page: currentPage,
      //       per_page: perPage
      //     },
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );
      // if (response.data.status === "success") {
      //   setAttemptedUsers(response.data.data.details || []);
      //   const total = response.data.data.total || 0;
      //   setTotalPages(Math.ceil(total / perPage));
      //   setPage(currentPage);
      // } else {
      //   throw new Error(response.data.message || "Failed to fetch data");
      // }

      // Your API call here (commented for now)
      const dummyUsers = [
        {
          user_id: "U001",
          name: "Amit Sharma",
          email: "amit@example.com",
          phone: "9876543210",
          medical_name: "City Hospital",
          location_name: "Mumbai",
          speciality: "Cardiology",
          mobile_no: "9876543210",
          age: "30",
          gender: "Male",
          attempted_at: "2025-07-25T10:30:00Z"
        },
        {
          user_id: "U002",
          name: "Priya Singh",
          email: "priya@example.com",
          phone: "9123456789",
          medical_name: "Metro Clinic",
          location_name: "Delhi",
          speciality: "Dermatology",
          mobile_no: "9123456789",
          age: "25",
          gender: "Female",
          attempted_at: "2025-07-25T11:00:00Z"
        },
        {
          user_id: "U003",
          name: "Rahul Kumar",
          email: "rahul@example.com",
          phone: "9988776655",
          medical_name: "Care Hospital",
          location_name: "Bangalore",
          speciality: "Orthopedics",
          mobile_no: "9988776655",
          age: "35",
          gender: "Male",
          attempted_at: "2025-07-25T12:00:00Z"
        }
      ];

      // Simulate pagination`
      setAttemptedUsers(dummyUsers);
      setTotalPages(1);
      setPage(currentPage);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
    // Dummy data array
  };

  // Search handler
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(attemptedUsers);
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = attemptedUsers.filter((user) => {
        const genderMatch = (user.gender || "").toLowerCase() === searchLower;
        const otherFieldsMatch =
          (user.name || "").toLowerCase().includes(searchLower) ||
          (user.medical_name || "").toLowerCase().includes(searchLower) ||
          (user.location_name || "").toLowerCase().includes(searchLower) ||
          (user.speciality || "").toLowerCase().includes(searchLower) ||
          (user.mobile_no || "").toLowerCase().includes(searchLower) ||
          (user.age || "").toLowerCase().includes(searchLower) ||
          (user.email || "").toLowerCase().includes(searchLower);

        return genderMatch || otherFieldsMatch;
      });
      setFilteredUsers(filtered);
    }
  }, [attemptedUsers, searchTerm]);

  // Pagination for filtered data
  const totalFilteredPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    fetchAttemptedUsers(page);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="container">
      {/* <h1 className="my-3">Attempted Users (Form started but not completed)</h1> */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={() => fetchAttemptedUsers(page)}>
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
              placeholder="Search by Patient Name, Medical Name, Location, Speciality, Mobile, etc."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {/* Table to display attempted users */}
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr No.</th>
                  <th>Date and Time</th>
                  <th>Medical Name</th>
                  <th>Medical Location</th>
                  <th>Speciality</th>
                  <th>Patient Name</th>
                  <th>Patient Mobile No.</th>
                  <th>Patient age</th>
                  <th>Patient gender</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-muted">
                      {searchTerm
                        ? "No attempted consultations found matching your search."
                        : "No attempted consultations found."}
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, i) => (
                    <tr key={user.user_id}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>
                        {user.attempted_at
                          ? new Date(user.attempted_at).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                dateStyle: "short",
                                timeStyle: "short"
                              }
                            )
                          : "-"}
                      </td>
                      <td>{user.medical_name || "N/A"}</td>
                      <td>{user.location_name || "N/A"}</td>
                      <td>{user.speciality || "N/A"}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.mobile_no || "N/A"}</td>
                      <td>{user.age || "N/A"}</td>
                      <td>{user.gender || "N/A"}</td>

                      {/* <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => alert(`Viewing user: ${user.user_id}`)}
                        >
                          View
                        </Button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          {/* Pagination below the table */}
          {totalFilteredPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              />
              {[...Array(totalFilteredPages).keys()].map((p) => (
                <Pagination.Item
                  key={p + 1}
                  active={p + 1 === page}
                  onClick={() => handlePageChange(p + 1)}
                >
                  {p + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={page === totalFilteredPages}
                onClick={() => handlePageChange(page + 1)}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Attempted;

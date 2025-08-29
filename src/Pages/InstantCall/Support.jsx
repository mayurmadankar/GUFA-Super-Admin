import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import { useCallback } from "react";

const Support = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [selectedPatients, setSelectedPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchSupportUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");
      //   const response = await axios.get(
      //     `${import.meta.env.VITE_BASEURL}/super_admin/support_users`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     }
      //   );
      //   if (response.data.status === "success") {
      //     setUsers(response.data.data.details || []);
      //   } else {
      //     throw new Error(
      //       response.data.message || "Failed to fetch support users"
      //     );
      //   }
      const usersData = [
        {
          user_id: "P001",
          name: "Amit Sharma",
          email: "amit@example.com",
          phone: "9876543210",
          medical_name: "City Hospital",
          medical_location: "Mumbai",
          doctor_speciality: "Cardiology",
          patient_name: "Amit Sharma",
          patient_phone: "9876543210",
          patient_age: "30",
          patient_gender: "Male",
          patient_paid: "Rs 500",
          patient_payment_status: "Paid",
          patient_support_status: "Pending",
          requested_at: "2025-07-25T10:30:00Z"
        },
        {
          user_id: "P002",
          name: "Priya Singh",
          email: "priya@example.com",
          phone: "9123456789",
          medical_name: "Metro Clinic",
          medical_location: "Delhi",
          doctor_speciality: "Dermatology",
          patient_name: "Priya Singh",
          patient_phone: "9123456789",
          patient_age: "25",
          patient_gender: "Female",
          patient_paid: "Rs 300",
          patient_payment_status: "Paid",
          patient_support_status: "Resolved",
          requested_at: "2025-07-25T11:00:00Z"
        },
        {
          user_id: "P003",
          name: "Rahul Verma",
          email: "rahul@example.com",
          phone: "9876543211",
          medical_name: "Care Hospital",
          medical_location: "Bangalore",
          doctor_speciality: "Orthopedics",
          patient_name: "Rahul Verma",
          patient_phone: "9876543211",
          patient_age: "35",
          patient_gender: "Male",
          patient_paid: "Rs 450",
          patient_payment_status: "Pending",
          patient_support_status: "In Progress",
          requested_at: "2025-07-25T12:00:00Z"
        },
        {
          user_id: "P004",
          name: "Sneha Patel",
          email: "sneha@example.com",
          phone: "9988776655",
          medical_name: "Apollo Clinic",
          medical_location: "Chennai",
          doctor_speciality: "Pediatrics",
          patient_name: "Sneha Patel",
          patient_phone: "9988776655",
          patient_age: "28",
          patient_gender: "Female",
          patient_paid: "Rs 600",
          patient_payment_status: "Paid",
          patient_support_status: "Resolved",
          requested_at: "2025-07-25T13:00:00Z"
        },
        {
          user_id: "P005",
          name: "Vikram Singh",
          email: "vikram@example.com",
          phone: "9876501234",
          medical_name: "Max Hospital",
          medical_location: "Gurgaon",
          doctor_speciality: "Neurology",
          patient_name: "Vikram Singh",
          patient_phone: "9876501234",
          patient_age: "42",
          patient_gender: "Male",
          patient_paid: "Rs 800",
          patient_payment_status: "Paid",
          patient_support_status: "Pending",
          requested_at: "2025-07-25T14:00:00Z"
        },
        {
          user_id: "P006",
          name: "Anita Sharma",
          email: "anita@example.com",
          phone: "9123450000",
          medical_name: "Fortis Hospital",
          medical_location: "Noida",
          doctor_speciality: "Gynecology",
          patient_name: "Anita Sharma",
          patient_phone: "9123450000",
          patient_age: "32",
          patient_gender: "Female",
          patient_paid: "Rs 400",
          patient_payment_status: "Pending",
          patient_support_status: "In Progress",
          requested_at: "2025-07-25T15:00:00Z"
        }
      ];
      setUsers(usersData);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        return (
          String(user.medical_name || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.medical_location || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.doctor_speciality || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_name || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_phone || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_age || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_gender || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_paid || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_payment_status || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(user.patient_support_status || "")
            .toLowerCase()
            .includes(searchLower)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const handleDownloadSelected = () => {
    const selectedData = filteredUsers.filter((user) =>
      selectedPatients.includes(user.user_id)
    );
    if (selectedData.length === 0) {
      alert("No patients selected for download.");
      return;
    }
    const headers = Object.keys(selectedData[0]);
    const csvContent = [
      headers.join(","),
      ...selectedData.map((row) =>
        headers.map((field) => JSON.stringify(row[field] || "")).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_support_patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    fetchSupportUsers();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* <h2 className="my-3">Support Section</h2> */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={fetchSupportUsers}>
            Retry
          </Button>
        </Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Button
              variant="primary"
              className="mt-2 mb-2"
              onClick={handleDownloadSelected}
            >
              Download Selected
            </Button>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Medical Name, Location, Speciality, Patient Name, Mobile, Payment Status, Support Status, etc."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Table striped bordered hover>
              <thead className="table-primary text-center">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        filteredUsers.length > 0 &&
                        filteredUsers.every((user) =>
                          selectedPatients.includes(user.user_id)
                        )
                      }
                      onChange={(e) =>
                        setSelectedPatients(
                          e.target.checked
                            ? filteredUsers.map((user) => user.user_id)
                            : []
                        )
                      }
                    />
                  </th>
                  <th>Sr No.</th>
                  <th>Date and Time</th>
                  <th>Medical Name</th>
                  <th>Medical location</th>
                  <th>Speciality</th>
                  {/* <th>Patient_id</th> */}
                  <th>Patient Name</th>
                  <th>Patient Mobile No.</th>
                  <th>Patient age</th>
                  <th>Patient gender</th>
                  <th>Paid</th>
                  <th>Payment status</th>
                  <th>Support status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      {searchTerm
                        ? "No support requests found matching your search."
                        : "No support requests found."}
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, i) => (
                    <tr key={user.user_id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(user.user_id)}
                          onChange={() => handleCheckboxChange(user.user_id)}
                        />
                      </td>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>
                        {user.requested_at
                          ? new Date(user.requested_at).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                dateStyle: "short",
                                timeStyle: "short"
                              }
                            )
                          : "-"}
                      </td>
                      {/* <td>{user.user_id}</td> */}
                      <td>{user.medical_name || "N/A"}</td>
                      <td>{user.medical_location || "N/A"}</td>
                      <td>{user.doctor_speciality || "N/A"}</td>
                      <td>{user.patient_name || "N/A"}</td>
                      {/* <td>{user.email || "-"}</td> */}
                      <td>{user.patient_phone || "N/A"}</td>
                      <td>{user.patient_age || "N/A"}</td>
                      <td>{user.patient_gender || "N/A"}</td>
                      <td>{user.patient_paid || "N/A"}</td>
                      <td>{user.patient_payment_status || "N/A"}</td>
                      <td>{user.patient_support_status || "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </>
      )}
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
                  <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
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
    </div>
  );
};

export default Support;

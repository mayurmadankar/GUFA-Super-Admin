import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const AttemptedCall = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  // const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCalls, setFilteredCalls] = useState([]);

  const [selectedPatients, setSelectedPatients] = useState([]);

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon,
            format: "json",
            "accept-language": "en",
            zoom: 18
          },
          headers: {
            "User-Agent":
              "BharatTeleClinicApp/1.0 (contact: admin@bharatteleclinic.co)"
          },
          timeout: 5000
        }
      );

      const address = response.data?.address;
      return (
        address?.suburb ||
        address?.locality ||
        address?.city ||
        address?.town ||
        "Unknown Location"
      );
    } catch (error) {
      console.error("Geocoding failed:", error.message);
      return "Unknown Location";
    }
  };

  const fetchAttemptedCalls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/super_admin/current_instant_consultations`,
        {
          params: {
            type: "attempted",
            page: 1,
            per_page: 1000
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.status === "success") {
        setCalls(response.data.data.details || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  }, []);

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
      setFilteredCalls(calls);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = calls.filter((call) => {
        return (
          String(call.medical_name || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.medical_location || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.speciality || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.patient_name || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.patient_number || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.patient_age || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.patient_gender || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.fees || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.payment_status || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.waiting || "")
            .toLowerCase()
            .includes(searchLower) ||
          String(call.session_id || "")
            .toLowerCase()
            .includes(searchLower)
        );
      });
      setFilteredCalls(filtered);
    }
  }, [calls, searchTerm]);

  const handleDownloadSelected = () => {
    const selectedData = filteredCalls.filter((call) =>
      selectedPatients.includes(call.patient_id)
    );
    if (selectedData.length === 0) {
      alert("Please select at least one patient to download.");
      return;
    }
    const headers = Object.keys(selectedData[0]);
    const csvRows = [
      headers.join(","),
      ...selectedData.map((p) =>
        headers.map((field) => `"${p[field]}"`).join(",")
      )
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_waiting_patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredPages = Math.ceil(filteredCalls.length / perPage);
  const paginatedCalls = filteredCalls.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    fetchAttemptedCalls(1);
  }, [fetchAttemptedCalls]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={() => fetchAttemptedCalls(page)}>
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
                placeholder="Search by Medical Name, Location, Speciality, Patient Name, Mobile, Payment Status, etc."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Table
              striped
              bordered
              hover
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              <thead className="table-primary text-center">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedPatients.length === filteredCalls.length &&
                        filteredCalls.length > 0
                      }
                      onChange={(e) => {
                        setSelectedPatients(
                          e.target.checked
                            ? filteredCalls.map((call) => call.patient_id)
                            : []
                        );
                      }}
                    />
                  </th>
                  <th>Sr No.</th>
                  {/* <th>Session ID</th> */}
                  <th>Date and Time</th>
                  <th>Medical Name</th>
                  <th>Medical Location</th>
                  <th>Speciality</th>
                  <th>Patient Name</th>
                  {/* <th>Patient_id</th> */}
                  {/* <th>Doctor_id</th> */}
                  <th>Patient Number</th>
                  {/* <th>Doctor</th> */}
                  <th>Patient age</th>
                  <th>Patient gender</th>
                  <th>Paid</th>
                  <th>Payment status</th>
                  <th>Waiting</th>
                  {/* <th>Location</th> */}
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedCalls.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      {searchTerm
                        ? "No waiting consultations found matching your search."
                        : "No waiting consultations found."}
                    </td>
                  </tr>
                ) : (
                  paginatedCalls.map((call, i) => (
                    <tr key={`${call.session_id}-${i}`}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(call.patient_id)}
                          onChange={() => handleCheckboxChange(call.patient_id)}
                        />
                      </td>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      {/* <td>{call.session_id}</td> */}
                      <td>
                        {call.time
                          ? new Date(call.time).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              dateStyle: "short",
                              timeStyle: "short"
                            })
                          : "N/A"}
                      </td>
                      <td>{call.medical_name || "N/A"}</td>
                      <td>{call.medical_location || "N/A"}</td>
                      <td>{call.speciality || "N/A"}</td>
                      {/* <td>{call.patient_id || "-"}</td> */}
                      <td>{call.patient_name || "N/A"}</td>
                      {/* <td>{call.doctor_id || "-"}</td> */}
                      <td>{call.patient_number || "N/A"}</td>
                      <td>{call.patient_age || "N/A"}</td>
                      {/* <td>{call.doctor_name || "N/A"}</td> */}
                      <td>{call.patient_gender || "N/A"}</td>
                      <td>{call.fees || "N/A"}</td>
                      <td>{call.payment_status || "N/A"}</td>
                      <td>{call.waiting || "N/A"}</td>

                      {/* <td>{call.location_name || "-"}</td> */}

                      {/* <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            alert(`Viewing session: ${call.session_id}`)
                          }
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

export default AttemptedCall;

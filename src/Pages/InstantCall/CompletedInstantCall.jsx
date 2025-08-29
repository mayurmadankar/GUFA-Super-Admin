import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const CompletedInstantCall = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // Fixed per page
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCalls, setFilteredCalls] = useState([]);

  // to convert the long and latti into location name
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

  const fetchAttemptedCalls = useCallback(async (currentPage = 1) => {
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
            type: "completed",
            page: 1,
            per_page: 1000
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(response,"response of attempted call")

      if (response.data.status === "success") {
        setCalls(response.data.data.details || []);
        // const total = response.data.data.total || 0;
        // setTotalPages(Math.ceil(total / perPage));
        // setPage(currentPage);
      } else {
        throw new Error(response.data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Filter calls based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCalls(calls);
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = calls.filter((call) => {
        // Exact match for gender (prevents "male" matching "female")
        const genderMatch =
          (call.patient_gender || "").toLowerCase() === searchLower ||
          (call.doctor_gender || "").toLowerCase() === searchLower;

        // Partial match for other fields
        const otherFieldsMatch = [
          call.medical_name,
          call.medical_location,
          call.doctor_speciality,
          call.patient_name,
          call.patient_number,
          call.patient_age,
          call.doctor_name,
          call.doctor_number,
          call.doctor_age,
          call.payment_status,
          call.prescription,
          call.prescribed_drugs,
          call.call_time,
          call.fees
        ].some((field) =>
          String(field || "")
            .toLowerCase()
            .includes(searchLower)
        );

        return genderMatch || otherFieldsMatch;
      });
      setFilteredCalls(filtered);
    }
  }, [calls, searchTerm]);

  useEffect(() => {
    fetchAttemptedCalls();
  }, [fetchAttemptedCalls]);

  // Calculate pagination for filtered data
  const totalFilteredPages = Math.ceil(filteredCalls.length / perPage);
  const paginatedCalls = filteredCalls.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
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
          {/* Search input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Medical Name, Location, Patient Name, Doctor Name, Mobile, Payment Status, Prescription, etc."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr No.</th>
                  {/* <th>Session ID</th> */}
                  <th>Date and time</th>
                  {/* <th>Patient_id</th> */}
                  {/* <th>Doctor_id</th> */}
                  <th>Medical name</th>
                  <th>Medical Location</th>
                  <th>Speciality</th>
                  <th>Patient name</th>
                  <th>Patient mobile No.</th>
                  <th>Patient age</th>
                  <th>Patient gender</th>
                  <th>Doctor name</th>
                  {/* <th>Doctor</th> */}
                  <th>Doctor mobile No.</th>
                  {/* <th>Speciality</th> */}
                  <th>Doctor age</th>
                  <th>Doctor gender</th>
                  <th>Paid</th>
                  <th>Payment status</th>
                  <th>Prescription</th>
                  <th>Prescribed drugs</th>
                  <th>Call time</th>
                  {/* <th>Location</th> */}
                  <th>Completed calls</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedCalls.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      {searchTerm
                        ? "No Completed consultations found matching your search."
                        : "No Completed consultations found."}
                    </td>
                  </tr>
                ) : (
                  paginatedCalls.map((call, i) => (
                    <tr key={call.session_id}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      {/* <td>{call.session_id}</td> */}
                      {/* <td>{call.patient_id || "-"}</td> */}
                      {/* <td>{call.doctor_id || "-"}</td> */}
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
                      <td>{call.doctor_speciality || "N/A"}</td>
                      <td>{call.patient_name || "N/A"}</td>
                      <td>{call.patient_number || "N/A"}</td>
                      <td>{call.patient_age || "N/A"}</td>
                      <td>{call.patient_gender || "N/A"}</td>
                      <td>{call.doctor_name || "N/A"}</td>
                      <td>{call.doctor_number || "N/A"}</td>
                      <td>{call.doctor_age || "N/A"}</td>
                      <td>{call.doctor_gender || "N/A"}</td>

                      {/* <td>{call.speciality || "-"}</td> */}
                      <td>{call.fees || "-"}</td>
                      {/* <td>{call.location_name || "-"}</td> */}
                      <td>{call.payment_status || "N/A"}</td>
                      <td>{call.prescription || "N/A"}</td>
                      <td>{call.prescribed_drugs || "N/A"}</td>
                      <td>{call.call_time || "N/A"}</td>
                      <td>{call.completed_call || "N/A"}</td>

                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            alert(`Viewing session: ${call.session_id}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
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

export default CompletedInstantCall;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const NotCompletedCall = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // Fixed per page
  const [totalPages, setTotalPages] = useState(1);

  // Add search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCalls, setFilteredCalls] = useState([]);

  const [selectedPatients, setSelectedPatients] = useState([]);

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
            type: "incompleted",
            page: 1,
            per_page: 1000
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // console.log(response, "response of incompleted call");

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

  const handleCheckboxChange = (session_id) => {
    setSelectedPatients((prevSelected) =>
      prevSelected.includes(session_id)
        ? prevSelected.filter((id) => id !== session_id)
        : [...prevSelected, session_id]
    );
  };

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);

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
          call.session_id,
          call.patient_id,
          call.doctor_id,
          call.medical_name,
          call.medical_location,
          call.speciality,
          call.speciality_available,
          call.patient_name,
          call.patient_number,
          call.medical_age,
          call.doctor_name,
          call.doctor_number,
          call.fees,
          call.payment_status,
          call.prescription,
          call.prescribed_drugs,
          call.call_time,
          call.reason
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

  const handleDownloadSelected = () => {
    const selectedData = filteredCalls.filter((call) =>
      selectedPatients.includes(call.session_id)
    );
    if (selectedData.length === 0) {
      alert("No patients selected for download.");
      return;
    }
    const headers = Object.keys(selectedData[0]);
    const csvRows = [
      headers.join(","),
      ...selectedData.map((call) =>
        headers.map((field) => `${call[field]}`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_incompleted_calls.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredPages = Math.ceil(filteredCalls.length / perPage);
  const paginatedCalls = filteredCalls.slice(
    (page - 1) * perPage,
    page * perPage
  );

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
                placeholder="Search by Session ID, Medical Name, Patient Name, Doctor Name, Mobile, Payment Status, Reason, etc."
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
                            ? filteredCalls.map((call) => call.session_id)
                            : []
                        );
                      }}
                    />
                  </th>
                  <th>Sr No.</th>
                  <th>Date and time</th>
                  <th>Session ID</th>
                  <th>Patient_id</th>
                  <th>Doctor_id</th>
                  <th>Medical name</th>
                  <th>Medical location</th>
                  <th>Speciality</th>
                  <th>Speciality available</th>
                  <th>Patient name</th>
                  <th>Patient Mobile NO.</th>
                  <th>Patient age</th>
                  <th>Patient gender</th>
                  <th>Doctor name</th>
                  <th>Doctor number</th>
                  <th>Doctor gender</th>
                  <th>Paid</th>
                  <th>Payment status</th>
                  <th>Prescription</th>
                  <th>Prescribed Drugs</th>
                  <th>Call time</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedCalls.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      {searchTerm
                        ? "No Incompleted consultations found matching your search."
                        : "No Incompleted consultations found."}
                    </td>
                  </tr>
                ) : (
                  paginatedCalls.map((call, i) => (
                    <tr key={call.session_id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(call.session_id)}
                          onChange={() => handleCheckboxChange(call.session_id)}
                        />
                      </td>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>
                        {call.time
                          ? new Date(call.time).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              dateStyle: "short",
                              timeStyle: "short"
                            })
                          : "N/A"}
                      </td>
                      <td>{call.session_id}</td>
                      <td>{call.patient_id || "-"}</td>
                      <td>{call.doctor_id || "-"}</td>
                      <td>{call.medical_name || "N/A"}</td>
                      <td>{call.medical_location || "N/A"}</td>
                      <td>{call.speciality || "N/A"}</td>
                      <td>{call.speciality_available || "N/A"}</td>
                      <td>{call.patient_name || "N/A"}</td>
                      <td>{call.patient_number || "N/A"}</td>
                      <td>{call.medical_age || "N/A"}</td>
                      <td>{call.patient_gender || "N/A"}</td>
                      <td>{call.doctor_name || "N/A"}</td>
                      <td>{call.doctor_number || "N/A"}</td>
                      <td>{call.doctor_gender || "N/A"}</td>
                      <td>{call.fees || "N/A"}</td>
                      <td>{call.payment_status || "N/A"}</td>
                      <td>{call.prescription || "N/A"}</td>
                      <td>{call.prescribed_drugs || "N/A"}</td>
                      <td>{call.call_time || "N/A"}</td>
                      <td>{call.reason || "N/A"}</td>
                      {/* <td>{call.location_name || "-"}</td> * */}
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

export default NotCompletedCall;

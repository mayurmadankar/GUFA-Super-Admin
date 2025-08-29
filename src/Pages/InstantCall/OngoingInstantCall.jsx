import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const OngoingInstantCall = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20); // Fixed per page
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchAttemptedCalls = useCallback(
    async (currentPage = 1) => {
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
              type: "ongoing",
              page: currentPage,
              per_page: perPage
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log(response,"response of attempted call")

        if (response.data.status === "success") {
          setCalls(response.data.data.details || []);
          const total = response.data.data.total || 0;
          setTotalPages(Math.ceil(total / perPage));
          setPage(currentPage);
        } else {
          throw new Error(response.data.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchAttemptedCalls(page);
  }, [fetchAttemptedCalls, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchAttemptedCalls(newPage);
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
            <Table
              striped
              bordered
              hover
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr No.</th>
                  <th>Session ID</th>
                  <th>Patient_id</th>
                  <th>Doctor_id</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Speciality</th>
                  <th>Fees</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {calls.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      No Ongoing call for now.
                    </td>
                  </tr>
                ) : (
                  calls.map((call, i) => (
                    <tr key={call.session_id}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{call.session_id}</td>
                      <td>{call.patient_id || "-"}</td>
                      <td>{call.doctor_id || "-"}</td>
                      <td>{call.patient_name || "N/A"}</td>
                      <td>{call.doctor_name || "N/A"}</td>
                      <td>{call.speciality || "-"}</td>
                      <td>{call.fees || "-"}</td>
                      <td>{call.location_name || "-"}</td>

                      <td>
                        {call.time
                          ? new Date(call.time).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              dateStyle: "short",
                              timeStyle: "short"
                            })
                          : "N/A"}
                      </td>
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
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              />
              {[...Array(totalPages).keys()].map((p) => (
                <Pagination.Item
                  key={p + 1}
                  active={p + 1 === page}
                  onClick={() => handlePageChange(p + 1)}
                >
                  {p + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default OngoingInstantCall;

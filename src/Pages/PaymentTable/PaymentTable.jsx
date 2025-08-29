import React, { useEffect, useState } from "react";
import "./PaymentTable.css";
import Button from "@mui/material/Button";
import { Pagination, Box } from "@mui/material";
import { fetchPaymentList } from "../../Components/Redux/authPatientList";
import { useDispatch, useSelector } from "react-redux";

const PaymentTable = () => {
  const { paymentList, loading, error } = useSelector(
    (state) => state.patientList
  );
  console.log(paymentList, "payment data");
  // Check if token exists
  const token = localStorage.getItem("admin_token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchPaymentList());
    } else {
      console.error("No admin token found - user may need to login again");
    }
  }, [dispatch, token]);

  const [selectedPayments, setSelectedPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // You can make this configurable

  const handleCheckboxChange = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDownloadSelected = () => {
    const selectedData =
      paymentList?.data?.filter((p) =>
        selectedPayments.includes(p.payment_id)
      ) || [];

    if (selectedData.length === 0) {
      alert("No rows selected.");
      return;
    }

    // Extract CSV headers
    const headers = Object.keys(selectedData[0]);

    // Create CSV rows
    const rows = selectedData.map((payment) =>
      headers
        .map((header) => {
          const value = payment[header];
          // Sanitize values to escape commas and quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");
    // Create and trigger a download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_payments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAllSelected =
    paymentList?.data?.length > 0 &&
    selectedPayments.length === paymentList?.data?.length;

  // Pagination logic
  const sortedData = paymentList?.data
    ? [...paymentList.data].sort(
        (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
      )
    : [];
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`container-fluid payment_table_container`}>
      <h4>Payments</h4>

      {!token && (
        <div className="alert alert-warning" role="alert">
          <strong>Warning:</strong> No authentication token found. You may need
          to log in again.
          <button
            onClick={() => (window.location.href = "/login")}
            className="btn btn-link p-0 ms-2"
            style={{ textDecoration: "underline" }}
          >
            Go to Login
          </button>
        </div>
      )}

      <div
        className="table-responsive"
        style={{ overflowX: "auto", width: "100%", maxWidth: "100vw" }}
      >
        <Button
          style={{ position: "sticky", top: "0", zIndex: "1" }}
          variant="contained"
          color="primary"
          className="mb-2"
          onClick={handleDownloadSelected}
        >
          Download Selected
        </Button>
        <table
          className="table text-start"
          style={{
            whiteSpace: "nowrap",
            minWidth: "1800px",
            width: "1800px",
            tableLayout: "fixed"
          }}
        >
          <thead
            className="thead-light"
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#f8f9fa",
              zIndex: "2"
            }}
          >
            <tr>
              <th style={{ minWidth: "60px", width: "60px" }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) =>
                    setSelectedPayments(
                      e.target.checked
                        ? paymentList?.data?.map((p) => p.payment_id) || []
                        : []
                    )
                  }
                />
              </th>
              <th style={{ minWidth: "80px", width: "80px" }}>Sr. No.</th>
              <th style={{ minWidth: "120px", width: "120px" }}>Payment ID</th>
              <th style={{ minWidth: "120px", width: "120px" }}>Patient ID</th>
              <th style={{ minWidth: "120px", width: "120px" }}>Doctor ID</th>
              <th style={{ minWidth: "150px", width: "150px" }}>
                Consultation ID
              </th>
              <th style={{ minWidth: "140px", width: "140px" }}>
                Payment Method
              </th>
              <th style={{ minWidth: "140px", width: "140px" }}>
                Payment Status
              </th>
              <th style={{ minWidth: "130px", width: "130px" }}>Amount Paid</th>
              <th style={{ minWidth: "170px", width: "170px" }}>
                Platform Commission
              </th>
              <th style={{ minWidth: "140px", width: "140px" }}>
                Doctor Payout
              </th>
              <th style={{ minWidth: "170px", width: "170px" }}>
                Pharmacist Payout
              </th>
              <th style={{ minWidth: "320px", width: "350px" }}>
                Transaction Date
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="text-center">
                  Loading payments...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="13" className="text-center">
                  {error.status === 401 ||
                  error.message?.includes("Unauthorized") ? (
                    <div>
                      <p>Unauthorized - Your session may have expired.</p>
                      <button
                        onClick={() => {
                          localStorage.removeItem("admin_token");
                          window.location.href = "/login";
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        Go to Login
                      </button>
                    </div>
                  ) : (
                    `Error loading payments: ${
                      error.message || "Unknown error"
                    }`
                  )}
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.payment_id || index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPayments.includes(item.payment_id)}
                      onChange={() => handleCheckboxChange(item.payment_id)}
                    />
                  </td>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.payment_id}</td>
                  <td>{item.patient_id}</td>
                  <td>{item.doctor_id}</td>
                  <td>{item.consultation_id}</td>
                  <td>{item.payment_method}</td>
                  <td>{item.payment_status}</td>
                  <td>₹ {item.amount_paid}</td>
                  <td>₹ {item.platform_commission}</td>
                  <td>₹ {item.doctor_payout}</td>
                  <td>₹ {item.pharmacist_payout}</td>
                  <td
                    style={{
                      width: "220px",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {new Date(item.transaction_date).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  No payment data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedData.length > itemsPerPage && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Display pagination info */}
      {sortedData.length > 0 && (
        <Box display="flex" justifyContent="center" pt={2} pb={4}>
          <small className="text-muted">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)}{" "}
            of {sortedData.length} entries
          </small>
        </Box>
      )}
    </div>
  );
};

export default PaymentTable;

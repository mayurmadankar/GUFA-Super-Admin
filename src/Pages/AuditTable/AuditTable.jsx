// import React from 'react'
// import "./AuditTable.css"
// const AuditTable = () => {
//   return (
//     <div className='audit_table_container'>
//       audit
//     </div>
//   )
// }

// export default AuditTable

import React, { useState } from "react";
import "./AuditTable.css";
import Button from "@mui/material/Button";
import { Pagination } from "react-bootstrap";

const AuditTable = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const logList = [
    {
      log_id: "LOG001",
      user_id: "USER001",
      action_type: "Login",
      target_entity: "Dashboard",
      ip_address: "192.168.1.1",
      device_info: "Chrome on Windows",
      timestamp: "2025-05-27T10:30:00"
    },
    {
      log_id: "LOG002",
      user_id: "USER002",
      action_type: "Viewed Report",
      target_entity: "Patient Report",
      ip_address: "192.168.1.2",
      device_info: "Safari on iPhone",
      timestamp: "2025-05-27T11:00:00"
    },
    {
      log_id: "LOG003",
      user_id: "USER003",
      action_type: "Updated Profile",
      target_entity: "User Settings",
      ip_address: "192.168.1.3",
      device_info: "Firefox on Linux",
      timestamp: "2025-05-27T11:30:00"
    },
    {
      log_id: "LOG004",
      user_id: "USER004",
      action_type: "Logged Out",
      target_entity: "System",
      ip_address: "192.168.1.4",
      device_info: "Edge on Windows",
      timestamp: "2025-05-27T12:00:00"
    },
    {
      log_id: "LOG005",
      user_id: "USER005",
      action_type: "Downloaded Data",
      target_entity: "Feedback Export",
      ip_address: "192.168.1.5",
      device_info: "Chrome on Mac",
      timestamp: "2025-05-27T12:30:00"
    }
  ];

  const [selectedLogs, setSelectedLogs] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedLogs((prev) =>
      prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
    );
  };

  // const handleDownloadSelected = () => {
  //   const selectedData = logList.filter((log) =>
  //     selectedLogs.includes(log.log_id)
  //   );
  //   console.log("Selected Logs to Download:", selectedData);
  //   // Add logic to export selectedData as CSV/PDF if needed
  // };

  const handleDownloadSelected = () => {
    const selectedData = logList.filter((log) =>
      selectedLogs.includes(log.log_id)
    );

    if (selectedData.length === 0) {
      alert("No rows selected!");
      return;
    }

    // CSV headers (column names)
    const headers = Object.keys(selectedData[0]).join(",");

    // CSV rows with values escaped properly (quotes inside values are doubled)
    const rows = selectedData.map((log) =>
      Object.values(log)
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    // Create Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAllSelected = selectedLogs.length === logList.length;

  //pagination logic
  const totalFilteredPages = Math.ceil(logList.length / perPage);
  const paginatedLogs = logList.slice((page - 1) * perPage, page * perPage);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container-fluid feedback_table_container">
      <h4>Audit Report</h4>
      <div className="table-responsive">
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
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <thead className="thead-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) =>
                    setSelectedLogs(
                      e.target.checked ? paginatedLogs.map((l) => l.log_id) : []
                    )
                  }
                />
              </th>
              <th>Log ID</th>
              <th>User ID</th>
              <th>Action Type</th>
              <th>Target Entity</th>
              <th>IP Address</th>
              <th>Device Info</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLogs.includes(log.log_id)}
                    onChange={() => handleCheckboxChange(log.log_id)}
                  />
                </td>
                <td>{log.log_id}</td>
                <td>{log.user_id}</td>
                <td>{log.action_type}</td>
                <td>{log.target_entity}</td>
                <td>{log.ip_address}</td>
                <td>{log.device_info}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AuditTable;

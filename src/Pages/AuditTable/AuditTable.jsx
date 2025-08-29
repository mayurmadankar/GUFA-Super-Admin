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

const AuditTable = () => {
  const logList = [
    {
      log_id: "LOG001",
      user_id: "USER001",
      action_type: "Login",
      target_entity: "Dashboard",
      ip_address: "192.168.1.1",
      device_info: "Chrome on Windows",
      timestamp: "2025-05-27T10:30:00",
    },
    {
      log_id: "LOG002",
      user_id: "USER002",
      action_type: "Viewed Report",
      target_entity: "Patient Report",
      ip_address: "192.168.1.2",
      device_info: "Safari on iPhone",
      timestamp: "2025-05-27T11:00:00",
    },
    {
      log_id: "LOG003",
      user_id: "USER003",
      action_type: "Updated Profile",
      target_entity: "User Settings",
      ip_address: "192.168.1.3",
      device_info: "Firefox on Linux",
      timestamp: "2025-05-27T11:30:00",
    },
    {
      log_id: "LOG004",
      user_id: "USER004",
      action_type: "Logged Out",
      target_entity: "System",
      ip_address: "192.168.1.4",
      device_info: "Edge on Windows",
      timestamp: "2025-05-27T12:00:00",
    },
    {
      log_id: "LOG005",
      user_id: "USER005",
      action_type: "Downloaded Data",
      target_entity: "Feedback Export",
      ip_address: "192.168.1.5",
      device_info: "Chrome on Mac",
      timestamp: "2025-05-27T12:30:00",
    },
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
  const rows = selectedData.map(log =>
    Object.values(log)
      .map(value => `"${String(value ?? "").replace(/"/g, '""')}"`)
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
                      e.target.checked ? logList.map((l) => l.log_id) : []
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
            {logList.map((log, index) => (
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
    </div>
  );
};

export default AuditTable;


import React, { useState } from "react";
import "./FeedbackTable.css";
import Button from "@mui/material/Button";

const FeedbackTable = () => {
const complaintList = [
  {
    complaint_id: "COMP001",
    raised_by_user_id: "USER001",
    against_doctor_id: "DOC101",
    consultation_id: "CONS501",
    complaint_type: "Rude Behavior",
    complaint_text: "The doctor was unprofessional during the consultation.",
    status: "Pending",
    resolution_notes: "",
    created_at: "2025-05-27T10:30:00",
    resolved_at: null,
  },
  {
    complaint_id: "COMP002",
    raised_by_user_id: "USER002",
    against_doctor_id: "DOC102",
    consultation_id: "CONS502",
    complaint_type: "Incorrect Prescription",
    complaint_text: "The prescribed medicine caused an allergic reaction.",
    status: "Resolved",
    resolution_notes: "Doctor issued a new prescription and apologized.",
    created_at: "2025-05-26T14:15:00",
    resolved_at: "2025-05-27T09:00:00",
  },
  {
    complaint_id: "COMP003",
    raised_by_user_id: "USER003",
    against_doctor_id: "DOC103",
    consultation_id: "CONS503",
    complaint_type: "Late Appointment",
    complaint_text: "The doctor joined the consultation 20 minutes late.",
    status: "Pending",
    resolution_notes: "",
    created_at: "2025-05-25T11:00:00",
    resolved_at: null,
  },
  {
    complaint_id: "COMP004",
    raised_by_user_id: "USER004",
    against_doctor_id: "DOC104",
    consultation_id: "CONS504",
    complaint_type: "Misdiagnosis",
    complaint_text: "Diagnosis was inaccurate, confirmed by another doctor.",
    status: "Resolved",
    resolution_notes: "Refund issued and follow-up arranged.",
    created_at: "2025-05-24T15:20:00",
    resolved_at: "2025-05-25T08:00:00",
  },
  {
    complaint_id: "COMP005",
    raised_by_user_id: "USER005",
    against_doctor_id: "DOC105",
    consultation_id: "CONS505",
    complaint_type: "Technical Issues",
    complaint_text: "Call disconnected multiple times during consultation.",
    status: "Pending",
    resolution_notes: "",
    created_at: "2025-05-23T13:45:00",
    resolved_at: null,
  },
  {
    complaint_id: "COMP006",
    raised_by_user_id: "USER006",
    against_doctor_id: "DOC106",
    consultation_id: "CONS506",
    complaint_type: "Unresponsive",
    complaint_text: "Doctor did not respond to queries post consultation.",
    status: "Resolved",
    resolution_notes: "Doctor contacted patient for clarification.",
    created_at: "2025-05-22T16:00:00",
    resolved_at: "2025-05-23T10:30:00",
  },
  {
    complaint_id: "COMP007",
    raised_by_user_id: "USER007",
    against_doctor_id: "DOC107",
    consultation_id: "CONS507",
    complaint_type: "Inappropriate Comments",
    complaint_text: "Doctor made uncomfortable remarks during consultation.",
    status: "Pending",
    resolution_notes: "",
    created_at: "2025-05-21T12:30:00",
    resolved_at: null,
  },
  {
    complaint_id: "COMP008",
    raised_by_user_id: "USER008",
    against_doctor_id: "DOC108",
    consultation_id: "CONS508",
    complaint_type: "No Show",
    complaint_text: "Doctor did not join the scheduled consultation.",
    status: "Resolved",
    resolution_notes: "Consultation rescheduled, no charge applied.",
    created_at: "2025-05-20T14:10:00",
    resolved_at: "2025-05-21T09:00:00",
  },
  {
    complaint_id: "COMP009",
    raised_by_user_id: "USER009",
    against_doctor_id: "DOC109",
    consultation_id: "CONS509",
    complaint_type: "Rude Behavior",
    complaint_text: "Doctor refused to answer all the patient’s concerns.",
    status: "Pending",
    resolution_notes: "",
    created_at: "2025-05-19T10:00:00",
    resolved_at: null,
  },
  {
    complaint_id: "COMP010",
    raised_by_user_id: "USER010",
    against_doctor_id: "DOC110",
    consultation_id: "CONS510",
    complaint_type: "Overcharged",
    complaint_text: "The consultation fee was more than shown on booking.",
    status: "Resolved",
    resolution_notes: "Partial refund issued.",
    created_at: "2025-05-18T17:00:00",
    resolved_at: "2025-05-19T10:45:00",
  },
];
  const [selectedPayments, setSelectedPayments] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // const handleDownloadSelected = () => {
  //   const selectedData = complaintList.filter((p) =>
  //     selectedPayments.includes(p.complaint_id)
  //   );
  //   console.log("Selected Payments to Download:", selectedData);
  //   // Add logic to export selectedData as CSV/PDF if needed
  // };

  const handleDownloadSelected = () => {
  const selectedData = complaintList.filter((p) =>
    selectedPayments.includes(p.complaint_id)
  );

  if (selectedData.length === 0) {
    alert("No rows selected!");
    return;
  }

  // Convert to CSV string
  const headers = Object.keys(selectedData[0]).join(",");
  const rows = selectedData.map(obj =>
    Object.values(obj).map(value => `"${value ?? ''}"`).join(",")
  );
  const csvContent = [headers, ...rows].join("\n");

  // Trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "selected_complaints.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const isAllSelected = selectedPayments.length === complaintList.length;

  return (
    <div className={`container-fluid feedback_table_container`}>
      <h4>Feedback</h4>
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
          className="table text-start "
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <thead className="thead-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) =>
                    setSelectedPayments(
                      e.target.checked
                        ? complaintList.map((p) => p.complaint_id)
                        : []
                    )
                  }
                />
              </th>
              <th>Complaint ID</th>
              <th>Raised By (User ID)</th>
              <th>Against Doctor (ID)</th>
              <th>Consultation ID</th>
              <th>Complaint Type</th>
              <th>Complaint Text</th>
              <th>Status</th>
              <th>Resolution Notes</th>
              <th>Created At</th>
              <th>Resolved At</th>
            </tr>
          </thead>

          <tbody>
            {complaintList.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(item.complaint_id)}
                    onChange={() => handleCheckboxChange(item.complaint_id)}
                  />
                </td>
                <td>{item.complaint_id}</td>
                <td>{item.raised_by_user_id}</td>
                <td>{item.against_doctor_id}</td>
                <td>{item.consultation_id}</td>
                <td>{item.complaint_type}</td>
                <td>{item.complaint_text}</td>
                <td>{item.status}</td>
                <td>{item.resolution_notes}</td>
                <td>{item.created_at}</td>
                <td>{item.resolved_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;

import React, { useState } from "react";
import "./PrescriptionTable.css";
import Button from '@mui/material/Button';

const PrescriptionTable = () => {

      const prescriptionList = [
    {
      prescription_id: "RX001",
      consultation_id: "CONS001",
      patient_id: "PAT001",
      doctor_id: "DOC001",
      prescribed_medicines: ["Paracetamol", "Vitamin C"],
      advice_notes: "Stay hydrated and rest well",
      follow_up_days: 7,
      prescription_pdf_url: "https://example.com/prescription1.pdf",
      issued_date: "2025-05-25T10:00:00",
      registration_number: "REG001"
    },
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
    ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }

      ,
    {
      prescription_id: "RX002",
      consultation_id: "CONS002",
      patient_id: "PAT002",
      doctor_id: "DOC002",
      prescribed_medicines: ["Ibuprofen"],
      advice_notes: "Take medicine after meals",
      follow_up_days: 5,
      prescription_pdf_url: "https://example.com/prescription2.pdf",
      issued_date: "2025-05-26T14:30:00",
      registration_number: "REG002"
    }
  ];

   const [selectedPriscriptions, setSelectedPriscriptions] = useState([]);

   const handleCheckboxChange = (id) => {
      setSelectedPriscriptions(prev =>
        prev.includes(id)
          ? prev.filter(pid => pid !== id)
          : [...prev, id]
      );
    };
  
    //   const handleDownloadSelected = () => {
    //   const selectedData = prescriptionList.filter(p => selectedPriscriptions.includes(p.payment_id));
    //   console.log("Selected Payments to Download:", selectedData);
    //   // Add logic to export selectedData as CSV/PDF if needed
    // };

    const handleDownloadSelected = () => {
  const selectedData = prescriptionList.filter(p =>
    selectedPriscriptions.includes(p.prescription_id)
  );

  if (selectedData.length === 0) {
    alert("No prescriptions selected!");
    return;
  }

  const headers = [
    "Prescription ID",
    "Consultation ID",
    "Patient ID",
    "Doctor ID",
    "Prescribed Medicines",
    "Advice Notes",
    "Follow-Up Days",
    "Prescription PDF URL",
    "Issued Date",
    "Registration Number"
  ];

  const rows = selectedData.map(item => [
    item.prescription_id,
    item.consultation_id,
    item.patient_id,
    item.doctor_id,
    item.prescribed_medicines.join(", "),
    item.advice_notes,
    item.follow_up_days,
    item.prescription_pdf_url,
    new Date(item.issued_date).toLocaleDateString(),
    item.registration_number
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "prescriptions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  
    const isAllSelected = selectedPriscriptions.length === prescriptionList.length;

  return (
  <div className={`container-fluid payment_table_container`}>
      <h4>Prescriptions</h4>
      <div className="table-responsive">
          <Button   style={{position:"sticky", top: "0",zIndex: "1"}} variant="contained" color="primary" className="mb-2" onClick={handleDownloadSelected} >
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
                    setSelectedPriscriptions(
                      e.target.checked ? prescriptionList.map(p => p.prescription_id) : []
                    )
                  }
                />
              </th>
              <th>Prescription ID</th>
              <th>Consultation ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Prescribed Medicines</th>
              <th>Advice Notes</th>
              <th>Follow-Up Days</th>
              <th>Prescription PDF</th>
              <th>Issued Date</th>
              <th>Dr. Reg. Number</th>
            </tr>
          </thead>

          <tbody>
            {prescriptionList.map((item, index) => (
              <tr key={index}>
                  <td>
                  <input
                    type="checkbox"
                    checked={selectedPriscriptions.includes(item.prescription_id)}
                    onChange={() => handleCheckboxChange(item.prescription_id)}
                  />
                </td>
                <td>{item.prescription_id}</td>
                <td>{item.consultation_id}</td>
                <td>{item.patient_id}</td>
                <td>{item.doctor_id}</td>
                <td>{item.prescribed_medicines.join(", ")}</td>
                <td>{item.advice_notes}</td>
                <td>{item.follow_up_days}</td>
                <td>
                  <a
                    href={item.prescription_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </td>
                <td>{new Date(item.issued_date).toLocaleDateString()}</td>
                <td>{item.registration_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  
  );
};

export default PrescriptionTable;

import React, { useCallback, useEffect, useState } from "react";
import css from "./Patient.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { fetchPatientList } from "../../Components/Redux/authPatientList";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { Pagination } from "react-bootstrap";

const Patient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientList, loading, error } = useSelector(
    (state) => state.patientList
  );
  // console.log(patientList?.patients,"patient list ")

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const patientsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPatientList());
  }, [dispatch]);

  // const handleViewPatient = () => {
  //   navigate("/patient/patient_detail");
  // };

  const handleCheckboxChange = (id) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Handle search input change
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filter doctors based on search term

  const filteredPatients =
    patientList?.patients?.filter((patient) => {
      const searchLower = searchTerm.toLowerCase();
      const fullName = `${patient.name || ""}`.toLowerCase();
      const email = `${patient.email || ""}`.toLowerCase();
      const contact = `${patient.contact || ""}`.toLowerCase();

      return (
        patient?.id?.toString().includes(searchLower) ||
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        contact.includes(searchLower)
      );
    }) || [];

  const handleDownloadSelected = () => {
    const selectedData = filteredPatients.filter((p) =>
      selectedPatients.includes(p.id)
    );

    if (selectedData.length === 0) {
      alert("No patients selected.");
      return;
    }

    const headers = Object.keys(selectedData[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...selectedData.map((p) =>
        headers.map((field) => `"${p[field]}"`).join(",")
      )
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination for filtered data
  const totalFilteredPages = Math.ceil(
    filteredPatients.length / patientsPerPage
  );
  const paginatedPatients = filteredPatients.slice(
    (page - 1) * patientsPerPage,
    page * patientsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalFilteredPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`${css.patient_container}`}>
      <h4>Patients</h4>
      <div className="table-responsive">
        <Button
          variant="contained"
          color="primary"
          className="mt-2 mb-2"
          onClick={handleDownloadSelected}
        >
          Download Selected
        </Button>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, Name, Email or Contact"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table
          className="table text-start"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <thead className="thead-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedPatients(
                      e.target.checked
                        ? paginatedPatients?.map((p) => p.id)
                        : []
                    )
                  }
                  checked={selectedPatients.length === paginatedPatients.length}
                />
              </th>
              <th>Patient Id</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Email</th>
              <th>City</th>
              <th>Pincode</th>
              <th>State</th>
              <th>Registration Date</th>
              <th>Registration Time</th>
              <th>Last Login Date</th>
              <th>Last Login Time</th>
              <th>Consent Status</th>
              <th>Profile Status</th>
              {/* <th>View Priscription</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="13" className="text-center">
                  Error: {error.message}
                </td>
              </tr>
            ) : paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <tr key={patient.id} style={{ cursor: "pointer" }}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => handleCheckboxChange(patient.id)}
                    />
                  </td>
                  <td>{patient.id || "-"}</td>
                  <td>{patient.name || "-"}</td>
                  <td>{patient.gender || "-"}</td>
                  <td>{patient.dob || "-"}</td>
                  <td>{patient.contact || "-"}</td>
                  <td>{patient.email || "-"}</td>
                  <td>{patient.city || "-"}</td>
                  <td>{patient.pincode || "-"}</td>
                  <td>{patient.state || "-"}</td>
                  <td>{patient.registration_date || "-"}</td>
                  <td>{patient.registration_time || "-"}</td>
                  <td>{patient.last_login_date || "-"}</td>
                  <td>{patient.last_login_time || "-"}</td>
                  <td>{patient.consent || "-"}</td>
                  <td>{patient.profile_status || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  Not found any patient data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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

export default Patient;

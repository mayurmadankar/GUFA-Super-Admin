import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./Doctor.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchApprovedDoctors } from '../../Components/Redux/authDoctorOnboard';
import { useCallback } from "react";
import { deactivateDoctor } from "../../Components/Redux/authDoctorOnboard";
import Button from "@mui/material/Button";
import { Pagination } from "react-bootstrap";

// Speciality ID to Name mapping
const specialityMap = {
  1: "General Physician",
  2: "Gynecologist",
  3: "Dermatologist",
  4: "Sexologist",
  5: "Psychiatrist",
  6: "Gastroenterologist",
  7: "Pediatrician",
  8: "ENT Specialist",
  9: "Urologist",
  10: "Orthopedist",
  11: "Neurologist",
  12: "Cardiologist",
  13: "Nutritionist/Dietitian",
  14: "Diabetology",
  15: "Eye & Vision",
  16: "Dentist",
  17: "Pulmonologist",
  18: "Ayurveda",
  19: "Homeopathy",
  20: "Cancer",
  21: "Physiotherapist",
  22: "Nephrologist",
  23: "Trichologist"
};

const ApprovedDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { approvedDoctors, loading, error } = useSelector(
    (state) => state.doctorUser
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  //pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  // console.log(approvedDoctors,"list")

  const handleViewDoctor = (doctor_id) => {
    navigate(`/doctor/doctor_detail/${doctor_id}`, {
      state: { showApproveButton: false }
    });
  };

  const handleEditDoctor = useCallback(
    (doctor_id) => {
      navigate(`/doctor/edit/${doctor_id}`);
    },
    [navigate]
  );

  const handleDeactivateDoctor = useCallback(
    (doctor_id) => {
      if (window.confirm("Are you sure you want to deactivate this doctor?")) {
        dispatch(deactivateDoctor(doctor_id));
      }
    },
    [dispatch]
  );

  // Handle search input change
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1); //reset to first page on search
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedDoctors((prev) =>
      prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]
    );
  };

  // Filter doctors based on search term
  const filteredDoctors =
    approvedDoctors?.doctors?.filter((doctor) => {
      const searchLower = searchTerm.toLowerCase();
      const fullName = `${doctor.first_name} ${doctor.last_name}`.toLowerCase();
      const qualification = `${doctor.qualification}`.toLowerCase();
      const specialityName =
        specialityMap[doctor.speciality]?.toLowerCase() || "";
      return (
        doctor.doctor_id.toString().includes(searchLower) ||
        fullName.includes(searchLower) ||
        qualification.includes(searchLower) ||
        specialityName.includes(searchLower) ||
        doctor.email.toLowerCase().includes(searchLower) ||
        doctor.contact_number?.toLowerCase().includes(searchLower) ||
        doctor.experience.toString().includes(searchLower)
      );
    }) || [];

  //pagiantion logic
  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const handlePageChange = (newPage) => setPage(newPage);
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleDownloadSelected = () => {
    const selectedData = filteredDoctors.filter((d) =>
      selectedDoctors.includes(d.doctor_id)
    );

    if (selectedData.length === 0) {
      alert("No doctors selected.");
      return;
    }

    const headers = [
      "Doctor ID",
      "Doctor Name",
      "Gender",
      "Specialization",
      "Qualifications",
      "Registration Number",
      "Council Name",
      "License Verification",
      "Consultation Fee",
      "Availability Status",
      "Language Spoken",
      "Profile Status",
      "Total Consultations",
      "Registration Date",
      "Email",
      "Phone",
      "Experience"
    ];

    const rows = selectedData.map((d) => [
      d.doctor_id,
      `${d.first_name} ${d.last_name}`,
      d.gender || "-",
      specialityMap[d.speciality] || "Unknown",
      d.qualification,
      d.license || "-",
      d.council_name || "-",
      "Verified",
      d.consultation_fee || "99",
      "Online/Offline/Busy", // Replace with actual availability if dynamic
      d.language || "Hindi/English",
      "Active/Suspended", // Replace with actual profile status if dynamic
      d.total_consultation || "-",
      new Date(d.date_joined).toLocaleDateString(),
      d.email,
      d.contact_number,
      d.experience
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_doctors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-responsive">
      <Button
        style={{ position: "sticky", top: "0", zIndex: "1" }}
        variant="contained"
        color="primary"
        className="mb-1"
        onClick={handleDownloadSelected}
      >
        Download Selected
      </Button>
      <div className="mb-1">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID, Name, Speciality, Qualifications, Email, or Phone"
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
                  setSelectedDoctors(
                    e.target.checked
                      ? filteredDoctors?.map((p) => p.doctor_id)
                      : []
                  )
                }
                checked={selectedDoctors.length === filteredDoctors.length}
              />
            </th>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Gender</th>
            <th>Specialization</th>
            <th>Qualifications</th>
            <th>Registration Number</th>
            <th>Council Name</th>
            <th>License Verification</th>
            <th>Consultation Fee</th>
            <th>Availability Status</th>
            <th>Language Spoken</th>
            <th>Profile Status</th>
            <th>Total Consultations</th>
            <th>Registration Date</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th className={css.stickyColumn}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="10" className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="10" className="text-center">
                Error: {error.message}
              </td>
            </tr>
          ) : paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((doctor) => (
              <tr key={doctor.doctor_id} style={{ cursor: "pointer" }}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDoctors.includes(doctor.doctor_id)}
                    onChange={() => handleCheckboxChange(doctor.doctor_id)}
                  />
                </td>
                <td>{doctor.doctor_id}</td>
                <td>
                  {doctor.first_name} {doctor.last_name}
                </td>
                <td>{doctor?.gender || "-"}</td>
                <td>{specialityMap[doctor.speciality] || "Unknown"}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor?.license || "-"}</td>
                <td>{doctor?.council_name || "-"}</td>
                <td>Verified </td>

                {/* <td> <div className="btn-group" role="group">
                    <button
                      className="btn btn-success btn-sm mx-1"
                      // onClick={() => handleViewDoctor(doctor.doctor_id)}
                    >
                      Verified 
                    </button>
                  </div>
                  </td> */}
                <td>{doctor.consultation_fee.join(",") || "₹ 99"}</td>
                <td>{"Online/Offline/Busy"}</td>
                {/* <td> <div className="btn-group" role="group">
                    <button
                      className="btn btn-success btn-sm mx-1"
                      // onClick={() => handleViewDoctor(doctor.doctor_id)}
                    >
                      Online 
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      // onClick={() => handleEditDoctor(doctor.doctor_id)}
                    >
                      Offline
                    </button>
                       <button
                      className="btn btn-warning btn-sm mx-1"
                      // onClick={() => handleEditDoctor(doctor.doctor_id)}
                    >
                      Busy
                    </button>
                  
                  </div>
                  </td> */}
                <td>{doctor.language || "Hindi/English"}</td>
                <td>{"Active/Suspended"}</td>
                {/* <td><div className="btn-group" role="group">
                    <button
                      className="btn btn-success btn-sm mx-1"
                      // onClick={() => handleViewDoctor(doctor.doctor_id)}
                    >
                      Active  
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      // onClick={() => handleEditDoctor(doctor.doctor_id)}
                    >
                      Suspended
                    </button>
                  </div></td> */}
                <td>{doctor.total_consultation || "-"}</td>
                <td>{new Date(doctor.date_joined).toLocaleDateString()}</td>
                <td>{doctor.email}</td>
                <td>{doctor.contact_number}</td>
                <td>{doctor.experience}</td>

                <td className={css.stickyColumn}>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleViewDoctor(doctor.doctor_id)}
                    >
                      View
                    </button>
                    {/* <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEditDoctor(doctor.doctor_id)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDeactivateDoctor(doctor.doctor_id)}
                    >
                      Deactivate
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                {searchTerm
                  ? "No doctors match your search"
                  : "No approved doctors found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      {totalPages > 1 && (
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
                totalPages,
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
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
                }
                pages.push(
                  <Pagination.Item
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Pagination.Item>
                );
              }

              return pages;
            })()}
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            />
            <Pagination.Last
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};
export default ApprovedDoctors;
// export default React.memo(ApprovedDoctors);

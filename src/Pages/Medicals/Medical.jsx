import React, { useCallback, useEffect, useState } from "react";
import css from "./Medical.module.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
// import {fetchListOfOnbordedMedical} from "../../Components/Redux/authMedicalOnboard"
import { fetchPatientList } from "../../Components/Redux/authPatientList";
import { fetchListOfOnbordedMedical } from "../../Components/Redux/authMedicalOnboard";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const Medical = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const {patientList,loading,error}=useSelector((state)=>state.patientList);
  const { onbordedMedicalList, loading, error } = useSelector(
    (state) => state.medicalUser
  );
  // console.log(onbordedMedicalList,"medical list")

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  const navigate = useNavigate();
  const handleViewDoctor = (id) => {
    navigate(`/medical/medical_detail/${id}`);
  };

  useEffect(() => {
    const fromViewMedicalPage = location?.state?.fromViewMedicalPage === true;
    if (!fromViewMedicalPage) {
      dispatch(fetchListOfOnbordedMedical());
    }
  }, [dispatch, location.state]);

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

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // Filter doctors based on search term
  const filteredMedicals =
    onbordedMedicalList?.data
      ?.slice()
      .reverse()
      .filter((medical) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          medical?.enterprises_id?.toString().includes(searchTerm) ||
          (medical?.enterprise_name || "")
            .toLowerCase()
            .includes(searchLower) ||
          (medical?.owner_email || "").toLowerCase().includes(searchLower) ||
          (medical?.owner_mobile || "").toLowerCase().includes(searchLower)
        );
      }) || [];

  const handleDownloadSelected = () => {
    const selectedData = filteredMedicals.filter((p) =>
      selectedPatients.includes(p.enterprises_id)
    );

    if (selectedData.length === 0) {
      alert("No medical selected.");
      return;
    }

    const headers = [
      "Medical Store ID",
      "Store Name",
      "City",
      "Pincode",
      "State",
      "Owner Name",
      "Owner Contact",
      "Owner Email",
      "Pharmacist Name",
      "Pharmacist Contact"
    ];

    const rows = selectedData.map((medical) => [
      medical.enterprises_id || "-",
      medical.enterprise_name || "-",
      medical.city || "-",
      medical.pincode || "-",
      medical.state || "-",
      `${medical.owner_fname || ""} ${medical.owner_lname || ""}`.trim() || "-",
      medical.owner_mobile || "-",
      medical.owner_email || "-",
      `${medical.pharmacist_fname || ""} ${
        medical.pharmacist_lname || ""
      }`.trim() || "-",
      medical.pharmacist_mobile || "-"
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected_medicals.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //pagination logic
  const totalPages = Math.ceil(filteredMedicals.length / perPage);
  const handlePageChange = (newPage) => setPage(newPage);
  const paginatedMedicals = filteredMedicals.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className={`container ${css.hospital_container}`}>
      <div className="d-flex justify-content-between">
        <h4>Medicals</h4>
        <Button
          variant="contained"
          size="small"
          sx={{
            marginBottom: "10px",
            padding: "8px 10px", // Adjust padding (vertical & horizontal)
            fontSize: "12px", // Adjust text size
            height: "30px" // Set button height
          }}
        >
          <a
            href="https://bharatteleclinic.co/registration/medical"
            target="_blank"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add New Medical
          </a>{" "}
        </Button>
      </div>

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
                        ? filteredMedicals?.map((p) => p.enterprises_id)
                        : []
                    )
                  }
                  checked={
                    filteredMedicals.length > 0 &&
                    selectedPatients.length === filteredMedicals.length
                  }
                />
              </th>
              <th>Medical_Store_Id</th>
              <th>Store Name</th>
              <th>City</th>
              <th>Pincode</th>
              <th>State</th>
              <th>Store Owner Name</th>
              <th>Owner Contact</th>
              <th>Owner Email</th>
              <th>Pharamciest Name</th>
              <th>Pharamciest Contact</th>
              <th className={css.stickyColumn}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="12" className="text-center">
                  Error: {error.message}
                </td>
              </tr>
            ) : paginatedMedicals.length > 0 ? (
              paginatedMedicals?.map((medical) => (
                <tr key={medical.enterprises_id} style={{ cursor: "pointer" }}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(
                        medical.enterprises_id
                      )}
                      onChange={() =>
                        handleCheckboxChange(medical.enterprises_id)
                      }
                    />
                  </td>
                  <td>{medical.enterprises_id || "-"}</td>
                  <td>{medical.enterprise_name || "-"}</td>
                  <td>{medical.city || "-"}</td>
                  <td>{medical.pincode || "-"}</td>
                  <td>{medical.state || "-"}</td>
                  <td>
                    {medical.owner_fname} {medical.owner_lname || "-"}
                  </td>
                  <td>{medical.owner_mobile || "-"}</td>
                  <td>{medical.owner_email || "-"}</td>
                  <td>
                    {medical.pharmacist_fname} {medical.pharmacist_lname || "-"}
                  </td>
                  <td>{medical.pharmacist_mobile || "-"}</td>
                  <td className={css.stickyColumn}>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-primary btn-sm mx-1"
                        onClick={() => handleViewDoctor(medical.enterprises_id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning btn-sm mx-1"
                        // onClick={() => handleEditDoctor(doctor.doctor_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        // onClick={() => handleDeactivateDoctor(doctor.doctor_id)}
                      >
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No medical data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
                    <Pagination.Item
                      key={1}
                      onClick={() => handlePageChange(1)}
                    >
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
    </div>
  );
};

export default Medical;

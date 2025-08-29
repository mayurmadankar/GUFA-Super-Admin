import React, { useCallback, useEffect, useState } from 'react';
import css from "./Patient.module.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {fetchPatientList} from "../../Components/Redux/authPatientList"
import { useDispatch, useSelector } from 'react-redux';

const Patient = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {patientList,loading,error}=useSelector((state)=>state.patientList);
  // console.log(patientList?.patients,"patient list ")

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(()=>{
    dispatch(fetchPatientList());
  },[dispatch])

  // const handleViewPatient = () => {
  //   navigate("/patient/patient_detail");
  // };

  const handleCheckboxChange = (id) => {
    setSelectedPatients(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
  };


    // Handle search input change
    const handleSearch = useCallback((e) => {
      setSearchTerm(e.target.value);
    }, []);


    // Filter doctors based on search term

    const filteredPatients = patientList?.patients?.filter((patient) => {
  const searchLower = searchTerm.toLowerCase();
  const fullName = `${patient.name || ''}`.toLowerCase();
  const email = `${patient.email || ''}`.toLowerCase();
  const contact = `${patient.contact || ''}`.toLowerCase();

  return (
    patient?.id?.toString().includes(searchLower) ||
    fullName.includes(searchLower) ||
    email.includes(searchLower) ||
    contact.includes(searchLower)
  );
}) || [];



  const handleDownloadSelected = () => {
  const selectedData = filteredPatients.filter(p => selectedPatients.includes(p.id));

  if (selectedData.length === 0) {
    alert("No patients selected.");
    return;
  }

  const headers = Object.keys(selectedData[0]);
  const csvRows = [
    headers.join(','), // Header row
    ...selectedData.map(p => headers.map(field => `"${p[field]}"`).join(','))
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "selected_patients.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div className={`${css.patient_container}`}>
         <h4>Patients</h4>
      <div className="table-responsive" >
        <Button   variant="contained" color="primary" className="mt-2 mb-2" onClick={handleDownloadSelected} >
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
        <table className="table text-start" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <thead className="thead-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedPatients(
                      e.target.checked ? filteredPatients?.map(p => p.id) : []
                    )
                  }
                  checked={selectedPatients.length === filteredPatients.length}
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
            {
              loading? (
                <tr>
                  <td colSpan="13"  className="text-center">Loading...</td>
                </tr>
              ):error?(
                <tr>
                  <td colSpan="13"  className="text-center">Error: {error.message}</td>
                </tr>
              ): filteredPatients.length>0 ? (
                filteredPatients?.map((patient) => (
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

              ):(
                <tr>
                  <td colSpan="13"  className="text-center">Not found any patient data</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patient;

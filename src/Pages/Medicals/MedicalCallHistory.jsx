import React, { useEffect, useState } from "react";
import css from "./Medical.module.css";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import { Pagination } from "react-bootstrap";

// for Search
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddedDevice,
  fetchHowManyDevicesAreAdded
} from "../../Components/Redux/authPatientList";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";

const MedicalCallHistory = ({ medicalId }) => {
  // console.log(medicalId, "medicalId in MedicalCallHistory");
  const [open, setOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const {medical_id}=useParams();

  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Change as needed

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);

  const handleOpen = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handlePrescriptionOpen = (patient) => {
    setSelectedPatient(patient);
    setPrescriptionOpen(true);
  };
  const handlePrescriptionClose = () => setPrescriptionOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2
  };
  //--------------------------------------------------------------------
  // Dummy data for testing purposes

  const patientData = [
    {
      id: 1567,
      name: "John Doe",
      dateTime: "2025-03-24 10:30 AM",
      duration: "10 Min",
      status: "Completed",
      payment: "Rs 200",
      vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" },
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    },
    {
      id: 157,
      name: "Chand Doe",
      dateTime: "2025-03-24 10:30 AM",
      duration: "10 Min",
      status: "Completed",
      payment: "Rs 200",
      vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" },
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    },
    {
      id: 1590,
      name: "Vijay Doe",
      dateTime: "2025-03-24 10:30 AM",
      duration: "10 Min",
      status: "Completed",
      payment: "Rs 200",
      vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" },
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    },
    {
      id: 1591,
      name: "Anil Doe",
      dateTime: "2025-03-24 10:30 AM",
      duration: "10 Min",
      status: "Completed",
      payment: "Rs 200",
      vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" },
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    },
    {
      id: 1592,
      name: "Ramesh Doe",
      dateTime: "2025-03-24 10:30 AM",
      duration: "10 Min",
      status: "Completed",
      payment: "Rs 200",
      vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" },
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    }
  ];

  //dummy device data
  const dummyDeviceData = [
    // Device Serial 1
    {
      device_serial: "1",
      date_time: "2025-08-06 09:30 AM",
      medical_name: "DermaCo Pharmacy",
      medical_location: "kopar khairane, Navi Mumbai",
      speciality: "Dentist Physician",
      patient_name: "John Doe",
      patient_mobile: "9876543210",
      patient_age: "32",
      patient_gender: "Male",
      doctor_name: "Dr. Smith",
      doctor_number: "9123456789",
      doctor_age: "45",
      doctor_gender: "Male",
      paid: "Rs 300",
      payment_status: "Paid",
      prescribed_drugs: "Ibuprofen",
      call_duration: "15 Min",
      prescription: "Take Ibuprofen 400mg twice a day for 5 days."
    },
    {
      device_serial: "1",
      date_time: "2025-08-06 10:00 AM",
      medical_name: "Zeelab Pharmacy",
      medical_location: "Suman Tower, Kalyan",
      speciality: "General Physician",
      patient_name: "Alice Smith",
      patient_mobile: "9876500000",
      patient_age: "29",
      patient_gender: "Female",
      doctor_name: "Dr. Gupta",
      doctor_number: "9988776655",
      doctor_age: "38",
      doctor_gender: "Female",
      paid: "Rs 350",
      payment_status: "Paid",
      prescribed_drugs: "Paracetamol",
      call_duration: "12 Min",
      prescription: "Take Paracetamol 500mg twice a day for 3 days."
    },
    {
      device_serial: "1",
      date_time: "2025-08-06 11:00 AM",
      medical_name: "Solution Pharmacy",
      medical_location: "Kalyan West",
      speciality: "Orthopedic",
      patient_name: "Bob Lee",
      patient_mobile: "9876511111",
      patient_age: "40",
      patient_gender: "Male",
      doctor_name: "Dr. Lee",
      doctor_number: "9112233445",
      doctor_age: "50",
      doctor_gender: "Male",
      paid: "Rs 400",
      payment_status: "Paid",
      prescribed_drugs: "Amoxicillin",
      call_duration: "18 Min",
      prescription: "Take Amoxicillin 250mg three times a day for 7 days."
    },

    // Device Serial 2
    {
      device_serial: "2",
      date_time: "2025-08-05 11:00 AM",
      medical_name: "Zeelab Pharmacy",
      medical_location: "Suman Tower, Kalyan",
      speciality: "Dermatologist",
      patient_name: "Jane Roe",
      patient_mobile: "9123456780",
      patient_age: "28",
      patient_gender: "Female",
      doctor_name: "Dr. Patel",
      doctor_number: "9001122334",
      doctor_age: "42",
      doctor_gender: "Male",
      paid: "Rs 250",
      payment_status: "Paid",
      prescribed_drugs: "Paracetamol",
      call_duration: "10 Min",
      prescription: "Take Paracetamol 500mg thrice a day for 3 days."
    },
    {
      device_serial: "2",
      date_time: "2025-08-05 12:00 PM",
      medical_name: "DermaCo Pharmacy",
      medical_location: "Suman Tower, Kalyan",
      speciality: "Dermatologist",
      patient_name: "Charlie Brown",
      patient_mobile: "9123456799",
      patient_age: "35",
      patient_gender: "Male",
      doctor_name: "Dr. Mehta",
      doctor_number: "9001122444",
      doctor_age: "39",
      doctor_gender: "Female",
      paid: "Rs 300",
      payment_status: "Paid",
      prescribed_drugs: "Cetirizine",
      call_duration: "8 Min",
      prescription: "Take Cetirizine 10mg once a day for 5 days."
    },

    // Device Serial 3
    {
      device_serial: "3",
      date_time: "2025-08-04 02:15 PM",
      medical_name: "Zeelab Pharmacy",
      medical_location: "Suman Tower, Kalyan",
      speciality: "Cardiologist",
      patient_name: "Sam Patel",
      patient_mobile: "9001122334",
      patient_age: "40",
      patient_gender: "Male",
      doctor_name: "Dr. Fernandes",
      doctor_number: "9112233445",
      doctor_age: "50",
      doctor_gender: "Male",
      paid: "Rs 400",
      payment_status: "Paid",
      prescribed_drugs: "Amoxicillin",
      call_duration: "20 Min",
      prescription: "Take Amoxicillin 250mg three times a day for 7 days."
    },
    {
      device_serial: "3",
      date_time: "2025-08-04 03:00 PM",
      medical_name: "DermaCo Pharmacy",
      medical_location: "Suman Tower, Kalyan",
      speciality: "Cardiologist",
      patient_name: "Priya Singh",
      patient_mobile: "9001122444",
      patient_age: "36",
      patient_gender: "Female",
      doctor_name: "Dr. Gupta",
      doctor_number: "9988776655",
      doctor_age: "38",
      doctor_gender: "Female",
      paid: "Rs 420",
      payment_status: "Paid",
      prescribed_drugs: "Aspirin",
      call_duration: "15 Min",
      prescription: "Take Aspirin 75mg once a day for 10 days."
    }
  ];
  // Dummy data ends here
  //--------------------------------------------------------------------

  const { getAddedDevice, howManyDevicesAdded } = useSelector(
    (state) => state.patientList
  );
  // console.log(howManyDevicesAdded, "uiuii");
  const [activeKey, setActiveKey] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHowManyDevicesAreAdded(medicalId));
  }, [dispatch, medicalId]);

  // fetch device data based on device_serial and medical_id
  const [deviceData, setDeviceData] = useState(dummyDeviceData);

  //--------------------------------------------------------------------
  // Dummy data for testing purposes
  const dummyDevices = [
    { device_serial: "1", imei: "111111111111111", price: 1000 },
    { device_serial: "2", imei: "222222222222222", price: 2000 },
    { device_serial: "3", imei: "333333333333333", price: 3000 }
  ];

  // For testing: force devices to always have 3 items
  const howManyDevicesAddedManual = {
    ...howManyDevicesAdded,
    devices: dummyDevices
  };

  //dummy data ends here
  //--------------------------------------------------------------------

  // useEffect(() => {
  //   //  console.log("useEffect called", activeKey, medicalId);
  //   if (activeKey && medicalId) {
  //     const fetchData = async () => {
  //       try {
  //         const token = localStorage.getItem("admin_token");
  //         const response = await fetch(
  //           `${
  //             import.meta.env.VITE_BASEURL
  //           }/super_admin/consultations/device/${activeKey}?enterprise_id=${medicalId}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` }
  //           }
  //         );
  //         const data = await response.json();
  //         console.log(data, "response data");
  //         setDeviceData(data.consultations); // or adjust based on your response
  //       } catch (error) {
  //         console.error("Error fetching consultation data:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [activeKey, medicalId]);

  // useEffect for default tab at initial render - actual data
  // useEffect(() => {
  //   if (howManyDevicesAdded?.devices?.length > 0 && !activeKey) {
  //     setActiveKey(howManyDevicesAdded.devices[0].device_serial);
  //   }
  // }, [howManyDevicesAdded, activeKey]);

  //for dummy data only
  useEffect(() => {
    if (howManyDevicesAddedManual?.devices?.length > 0 && !activeKey) {
      setActiveKey(howManyDevicesAddedManual.devices[0].device_serial);
    }
  }, [howManyDevicesAddedManual, activeKey]);

  return (
    <div className="table-responsive">
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          {selectedPatient && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Vitals ({selectedPatient.name})
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Date and Time: {selectedPatient.dateTime}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Oxygen: {selectedPatient.vitals.oxygen}
                </Typography>
                <Typography variant="body1">
                  Pulse: {selectedPatient.vitals.pulse}
                </Typography>
                <Typography variant="body1">
                  Temperature: {selectedPatient.vitals.temp}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={prescriptionOpen}
        onClose={handlePrescriptionClose}
        aria-labelledby="prescription-modal-title"
      >
        <Box sx={modalStyle}>
          {selectedPatient && (
            <>
              <Typography
                id="prescription-modal-title"
                variant="h6"
                component="h2"
              >
                Prescription ({selectedPatient.name})
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedPatient.prescription}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Search input */}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Patient, Doctor, Medical, Speciality, Drugs, etc."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {howManyDevicesAddedManual?.devices?.length > 0 ? (
        <Tab.Container
          activeKey={activeKey}
          onSelect={(k) => {
            setActiveKey(k);
            setPage(1);
          }}
          defaultActiveKey={
            howManyDevicesAddedManual?.devices?.[0]?.device_serial
          }
        >
          <Nav variant="tabs">
            {howManyDevicesAddedManual?.devices?.map((device, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  eventKey={device.device_serial}
                  className="text-black"
                >
                  {`Serial No.${device.device_serial}`}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content className="mt-3">
            {howManyDevicesAddedManual?.devices?.map((device, index) => {
              // Per-tab filtering and pagination
              const deviceSerialData = dummyDeviceData.filter(
                (row) => row.device_serial === device.device_serial
              );
              const filteredDeviceData = deviceSerialData.filter((row) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                  (row.patient_name || "")
                    .toLowerCase()
                    .includes(searchLower) ||
                  (row.doctor_name || "").toLowerCase().includes(searchLower) ||
                  (row.medical_name || "")
                    .toLowerCase()
                    .includes(searchLower) ||
                  (row.speciality || "").toLowerCase().includes(searchLower) ||
                  (row.patient_mobile || "")
                    .toLowerCase()
                    .includes(searchLower) ||
                  (row.doctor_number || "")
                    .toLowerCase()
                    .includes(searchLower) ||
                  (row.date_time || "").toLowerCase().includes(searchLower) ||
                  (row.prescribed_drugs || "")
                    .toLowerCase()
                    .includes(searchLower) ||
                  (row.prescription || "").toLowerCase().includes(searchLower)
                );
              });
              const pageCount = Math.ceil(
                filteredDeviceData.length / rowsPerPage
              );
              const paginatedData = filteredDeviceData.slice(
                (page - 1) * rowsPerPage,
                page * rowsPerPage
              );
              return (
                <Tab.Pane key={index} eventKey={device.device_serial}>
                  <h6>
                    Device Serial No: {device.device_serial}&nbsp;&nbsp;&nbsp;
                    IMEI: {device.imei || "N/A"}&nbsp;&nbsp;&nbsp; Price: ₹
                    {device.price || "-"}
                  </h6>

                  {/* Your table can be added here — or a reusable component */}
                  <div className="table-responsive">
                    <Table
                      hover
                      className="text-start"
                      style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                    >
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Date and time</th>
                          <th>Medical name</th>
                          <th>Medical location</th>
                          <th>Speciality</th>
                          <th>Patient name</th>
                          <th>Patient mobile NO.</th>
                          <th>Patient age</th>
                          <th>Patient gender</th>
                          <th>Doctor name</th>
                          <th>Doctor number</th>
                          <th>Doctor Age</th>
                          <th>Doctor gender</th>
                          <th>Paid</th>
                          <th>Payment status</th>
                          <th>Prescribed drugs</th>
                          <th>Call Duration</th>
                          <th>Prescription</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData?.length > 0 ? (
                          paginatedData?.map((row, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{row.date_time || "N/A"}</td>
                              <td>{row.medical_name || "N/A"}</td>
                              <td>{row.medical_location || "N/A"}</td>
                              <td>{row.speciality || "N/A"}</td>
                              <td>{row.patient_name || "N/A"}</td>
                              <td>{row.patient_mobile || "N/A"}</td>
                              <td>{row.patient_age || "N/A"}</td>
                              <td>{row.patient_gender || "N/A"}</td>
                              <td>{row.doctor_name || "N/A"}</td>
                              <td>{row.doctor_number || "N/A"}</td>
                              <td>{row.doctor_age || "N/A"}</td>
                              <td>{row.doctor_gender || "N/A"}</td>
                              <td>{row.paid || "N/A"}</td>
                              <td>{row.payment_status || "N/A"}</td>
                              {/* <td>{row.prescription || "N/A"}</td> */}
                              <td>{row.prescribed_drugs || "N/A"}</td>
                              <td>{row.call_duration || "N/A"}</td>
                              <td>
                                <Button variant="contained" size="small">
                                  View
                                </Button>
                              </td>
                              {/* <td>
                            <Button variant="contained" size="small">
                              View
                            </Button>
                          </td> */}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={18} className="text-center">
                              0 Consultation with this device serial...
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  {pageCount > 1 && (
                    <div className="d-flex justify-content-center mt-2">
                      <Pagination>
                        <Pagination.First
                          onClick={() => setPage(1)}
                          disabled={page === 1}
                        />
                        <Pagination.Prev
                          onClick={() => setPage(page - 1)}
                          disabled={page === 1}
                        />
                        {[...Array(pageCount)].map((_, idx) => (
                          <Pagination.Item
                            key={idx + 1}
                            active={page === idx + 1}
                            onClick={() => setPage(idx + 1)}
                          >
                            {idx + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => setPage(page + 1)}
                          disabled={page === pageCount}
                        />
                        <Pagination.Last
                          onClick={() => setPage(pageCount)}
                          disabled={page === pageCount}
                        />
                      </Pagination>
                    </div>
                  )}
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      ) : (
        <div className="text-center my-4 text-muted">
          No devices found for this medical store.
        </div>
      )}
    </div>
  );
};

export default MedicalCallHistory;

import React, { useState } from 'react';
import css from "./Doctor.module.css"
import { Table } from "react-bootstrap";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// for Search
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const DInstantCallDetail = () => {
    const [open, setOpen] = useState(false);
    const [prescriptionOpen, setPrescriptionOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
    };

    const patientData = [
        { id: 1567, name: "John Doe",  dateTime: "2025-03-24 10:30 AM", duration: "10 Min", status: "Completed", payment: "Rs 200", vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" }, prescription: "Take Paracetamol 500mg twice a day for 3 days." },
        { id: 157, name: "Chand Doe",  dateTime: "2025-03-24 10:30 AM", duration: "10 Min", status: "Completed", payment: "Rs 200", vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" }, prescription: "Take Paracetamol 500mg twice a day for 3 days." },
        { id: 1590, name: "Vijay Doe",  dateTime: "2025-03-24 10:30 AM", duration: "10 Min", status: "Completed", payment: "Rs 200", vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" }, prescription: "Take Paracetamol 500mg twice a day for 3 days." },
        { id: 1591, name: "Anil Doe",  dateTime: "2025-03-24 10:30 AM", duration: "10 Min", status: "Completed", payment: "Rs 200", vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" }, prescription: "Take Paracetamol 500mg twice a day for 3 days." },
        { id: 1592, name: "Ramesh Doe",  dateTime: "2025-03-24 10:30 AM", duration: "10 Min", status: "Completed", payment: "Rs 200", vitals: { oxygen: "98%", pulse: "72 bpm", temp: "98.6°F" }, prescription: "Take Paracetamol 500mg twice a day for 3 days." }

    ];

    const filteredPatients = patientData.filter((patient) =>
        patient.id.toString().includes(searchQuery) ||
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
                        <Typography variant="body1">Oxygen: {selectedPatient.vitals.oxygen}</Typography>
                        <Typography variant="body1">Pulse: {selectedPatient.vitals.pulse}</Typography>
                        <Typography variant="body1">Temperature: {selectedPatient.vitals.temp}</Typography>
                    </Box>
                </>
            )}
        </Box>
    </Modal>

    <Modal open={prescriptionOpen} onClose={handlePrescriptionClose} aria-labelledby="prescription-modal-title">
        <Box sx={modalStyle}>
            {selectedPatient && (
                <>
                    <Typography id="prescription-modal-title" variant="h6" component="h2">
                        Prescription ({selectedPatient.name})
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        {selectedPatient.prescription}
                    </Typography>
                </>
            )}
        </Box>
    </Modal>

    <div className='d-flex justify-content-end'>
        <Box sx={{ m: 1}}>
            <TextField
                id="outlined-required"
                label="Search by ID or Doctor Name.."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{width:"250px"}}
                InputLabelProps={{
                    sx: { 
                        fontSize: "15px" // Controls the input text font size
                    }
                }}
            />
        </Box>
    </div>

    <Table hover className="text-center" style={{ cursor: "pointer" }}>
        <thead>
            <tr>
                <th>Consultation ID</th>
                <th>Patient Name</th>
                <th>Call Date & Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Vitals</th>
                <th>Prescription</th>
            </tr>
        </thead>
        <tbody>
            {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.dateTime}</td>
                    <td>{patient.duration}</td>
                    <td>{patient.status}</td>
                    <td>{patient.payment}</td>
                    <td>
                        <Button variant="contained" size="small" onClick={() => handleOpen(patient)}>
                            View
                        </Button>
                    </td>
                    <td>
                        <Button variant="contained" size="small" onClick={() => handlePrescriptionOpen(patient)}>
                            View
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
</div>
  )
}

export default DInstantCallDetail

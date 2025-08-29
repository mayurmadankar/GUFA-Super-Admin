import React, { useEffect, useState } from 'react';
import css from "./Doctor.module.css";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import GeneralInfoTab from './GeneralInfoTab';
import DInstantCallDetail from './DInstantCallDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDoctor } from '../../Components/Redux/authDoctorOnboard';
import { useLocation } from 'react-router-dom';
// import { Modal, Box, Typography } from "@mui/material";



  const ViewDoctorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();
  const showApproveButton =location?.state?.showApproveButton ;


  const { doctor_id } = useParams();
  const { singleDoctor, loading, error } = useSelector((state) => state.doctorUser);

  useEffect(() => {
    if (doctor_id) {
      dispatch(fetchSingleDoctor(doctor_id));
    }
  }, [dispatch, doctor_id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error.message}</div>;
  if (!singleDoctor?.doctor) return <div className="text-center">No doctor data found</div>;

  const doctor = singleDoctor.doctor;
  // console.log(doctor,"doctor details")
const specialityText={
1:"General Physician",		
2:"Gynecologist",		
3:"Dermatologist"	,	
4:"Sexologist",		
5:"Psychiatrist",		
6:"Gastroenterologist",		
7:"Pediatrician",		
8:"ENT Specialist",		
9:"Urologist",		
10:"Orthopedist",		
11:"Neurologist",		
12:"Cardiologist",		
13:"Nutritionist/Dietitian",	
14:"Diabetology",		
15:"Eye & Vision",		
16:"Dentist",		
17:"Pulmonologist",	
18:"Ayurveda",		
19:"Homeopathy",		
20:"Cancer",		
21:"Physiotherapist",		
22:"Nephrologist",		
23:"Trichologist"
  }

  return (
    <Container className={`mt-4 ${css.view_doctor_container}`}>

  
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  <h6   onClick={() => {navigate("/doctor",{state:{fromViewPage:true}})}} style={{ color: "blue", cursor: "pointer" }}>
                    Back to Doctor List<span style={{ color: "grey", fontWeight: "500" }}>{` > ${doctor.doctor_id}`}</span>
                  </h6>
                  {doctor.docs?.profile_img ? (
                    <img
                      src={`${doctor?.docs?.profile_img}`}
                      alt="Profile"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "auto",
                      }} />
                  ) : (
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        margin: "auto",
                      }}
                    ></div>
                  )}
                  <h6 className="mt-2">Dr. {doctor.first_name} {doctor.last_name}</h6>
                </Col>
                <Col md={3}>
                  <p><strong style={{ fontSize: "15px" }}>Gender:</strong> {doctor.gender}</p>
                  <p><strong style={{ fontSize: "15px" }}>Date Of Birth:</strong> {doctor.dob || 'N/A'}</p>
                  <p><strong style={{ fontSize: "15px" }}>Location:</strong> {doctor.address?.city || 'N/A'}</p>
                </Col>
                <Col md={3}>
                  {/* <p><strong style={{ fontSize: "15px" }}>Speciality:</strong> {doctor.speciality || 'N/A'}</p> */}
                  <p><strong style={{ fontSize: "15px" }}>Speciality:</strong> {specialityText[Number(doctor?.speciality)] || 'N/A'}</p>

                  <p><strong style={{ fontSize: "15px" }}>Experience:</strong> {doctor.experience} yrs</p>
                  <p><strong style={{ fontSize: "15px" }}>License Number:</strong> {doctor.license}</p>
                </Col>
                <Col md={3}>
                <p><strong style={{ fontSize: "15px" }}>Mobile No.:</strong> {doctor.contact_number}</p>
                <p><strong style={{ fontSize: "15px" }}>Email:</strong> {doctor.email}</p>
                <p><strong style={{ fontSize: "15px" }}>Joining Date:</strong> {new Date(doctor.date_joined).toLocaleDateString()}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row><Tab.Container defaultActiveKey="general_info">
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="general_info" className='text-black'>General Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="instant-call" className='text-black'>Instant Call Details</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="general_info">
            <GeneralInfoTab doctor={doctor} showApproveButton={showApproveButton}/>
          </Tab.Pane>
          <Tab.Pane eventKey="instant-call">
            <DInstantCallDetail />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ViewDoctorPage;
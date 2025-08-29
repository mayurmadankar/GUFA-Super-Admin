import React, { useEffect } from 'react'
import css from "./Medical.module.css";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import MedicalGeneralInfo from './MedicalGeneralInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchIndivisualMedical} from '../../Components/Redux/authMedicalOnboard'
import MedicalCallHistory from './MedicalCallHistory';

const ViewMedicalPage = () => {
    const navigate=useNavigate();
    const {medical_id}=useParams();
    const dispatch=useDispatch();
    const{singleMedical,error,loading}=useSelector((state)=>state.medicalUser)
    const medical=singleMedical?.data;
// console.log(singleMedical,"indivisualMedical")

    useEffect(()=>{
      if(medical_id){
      dispatch(fetchIndivisualMedical(medical_id))
      }
    },[dispatch,medical_id])

  return (
     <Container className={`mt-4 ${css.view_medical_container}`}>
          {loading ? (
            <div className="text-center">
              <p>Loading medical details...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p>Error loading medical details: {error.message}</p>
            </div>
          ) : (
            <>
              <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={4} className="text-center">
                      <h6  onClick={() => {navigate("/Medical",{state:{fromViewMedicalPage:true}})}} style={{ color: "blue", cursor: "pointer" }}>
                        Back to Medical List<span style={{ color: "grey", fontWeight: "500" }}>{` > ${medical?.enterprise?.id}`}</span>
                      </h6>
      
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            backgroundColor: "#ccc",
                            margin: "auto",
                          }}
                        ></div>
            
                      <h6 className="mt-2"> {medical?.enterprise?.enterprise_name} {`(₹ X)`}</h6>
                    </Col>
                    <Col md={4}>
                      <p><strong style={{ fontSize: "15px" }}>Owner Name:</strong> {medical?.owner?.first_name || "--"} {medical?.owner?.last_name || "--"}</p>
                      <p><strong style={{ fontSize: "15px" }}>Owner No.:</strong> {medical?.owner?.mobile || "--"}</p>
                      <p><strong style={{ fontSize: "15px" }}>Owner License No.:</strong> {medical?.enterprise?.license_number || "-"}</p>
                    </Col>
                    <Col md={4}>
                      <p><strong style={{ fontSize: "15px" }}>Pharmacist Name:</strong> {medical?.pharmacists?.[0]?.first_name || "-"} {medical?.pharmacists?.[0]?.last_name || "-"}</p>
    
                      <p><strong style={{ fontSize: "15px" }}>Pharmacist No.:</strong> {medical?.pharmacists?.[0]?.mobile || "-"}</p>
                      <p><strong style={{ fontSize: "15px" }}>Pharmacist License No.:</strong> {medical?.pharmacists?.[0]?.license_number || "-"}</p>
                    </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Tab.Container defaultActiveKey="general_info">
            <Nav variant="tabs" className="mt-3">
              <Nav.Item>
                <Nav.Link eventKey="general_info" className='text-black'>General Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="instant_call" className='text-black'>Instant Call Details</Nav.Link>
              </Nav.Item>
            </Nav>
    
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="general_info">
                <MedicalGeneralInfo medicalId={medical_id}/>
              </Tab.Pane>
              <Tab.Pane eventKey="instant_call">
                <MedicalCallHistory medicalId={medical_id}/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
            </>
          )}
        </Container>
  )
}

export default ViewMedicalPage

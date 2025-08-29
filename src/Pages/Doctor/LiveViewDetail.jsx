import React from 'react'
import css from "./Doctor.module.css"
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import GeneralInfoTab from './GeneralInfoTab';
import DInstantCallDetail from './DInstantCallDetail';
import { useNavigate } from 'react-router-dom';

const LiveViewDetail = () => {
    const navigate=useNavigate();

  return (
    <Container className={`mt-4 ${css.view_doctor_container}`}>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col md={3} className="text-center">
              <h6 onClick={()=>navigate("/doctor")} style={{color:"blue",cursor:"pointer"}}>Back to Doctor List<span style={{color:"grey",fontWeight:"500"}}>{` > 123`}</span></h6>
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    margin: "auto",
                  }}
                ></div>
                <h6 className="mt-2">Dr. Sanauar Ansari</h6>
              </Col>
              <Col md={3}>
                <p><strong style={{fontSize:"15px"}}>Gender:</strong> Male</p>
                <p><strong style={{fontSize:"15px"}}>Date Of Birth:</strong> 01/07/1990</p>
                <p><strong style={{fontSize:"15px"}}>Location:</strong> Mumbai</p>
              </Col>
              <Col md={3}>
                <p><strong style={{fontSize:"15px"}}>Speciality:</strong> General Physician</p>
                <p><strong style={{fontSize:"15px"}}>Experience:</strong> 5yrs</p>
                <p><strong style={{fontSize:"15px"}}>License Number:</strong> ACF-5789</p>
              </Col>
              <Col md={3}>
                <p><strong style={{fontSize:"15px"}}>Mobile No.:</strong> 7303241398</p>
                <p><strong style={{fontSize:"15px"}}>Email:</strong> sanauar@gmail.com</p>
                <p><strong style={{fontSize:"15px"}}>Joining Date:</strong>2025/04/10</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>



     <div className='mt-4'>
        <div>
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">Doctor Personal Information</h5>
                {/* <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm">Edit</button>
                <button className="btn btn-primary btn-sm">Approve</button>
                </div> */}
           
        </div>
       
            <div className="row">
                <div className="col-md-6">
                    <p><span className={css.generalInfo_font}>First Name:</span> Dr. Kulsum</p>
                    <p><span className={css.generalInfo_font}>Last Name:</span> Khan</p>
                    <p><span className={css.generalInfo_font}>Gender:</span> Female</p>
                    <p><span className={css.generalInfo_font}>Date Of Birth:</span> 1 May 1996</p>
                    <p><span className={css.generalInfo_font}>Education:</span> BHMS</p>
                    <p><span className={css.generalInfo_font}>Speciality:</span> General Physician</p>
                    <p><span className={css.generalInfo_font}>Experience:</span> 3 Years</p>
                    <p><span className={css.generalInfo_font}>License Number:</span> ACF-5789</p>
                
                </div>
                {/* <div className="col-md-6">
                    <p><span className={css.generalInfo_font}>Education:</span> BHMS</p>
                    <p><span className={css.generalInfo_font}>Speciality:</span> General Physician</p>
                    <p><span className={css.generalInfo_font}>Experience:</span> 3 Years</p>
                    <p><span className={css.generalInfo_font}>License Number:</span> ACF-5789</p>
                </div> */}
            </div>
            
            <h5 className="fw-bold">Contact details</h5>
            <div className="row">
                <div className="col-md-6">
                    <p><span className={css.generalInfo_font}>Phone Number:</span> 8591103137</p>
                    <p><span className={css.generalInfo_font}>Email:</span>khandrkulsoom.960501@gmail.com</p>
                    <p><span className={css.generalInfo_font}>Address:</span> Mira Road</p>
                
                </div>
                <div className="col-md-6">
                <p><span className={css.generalInfo_font}>City:</span> Mira Road</p>
                    <p><span className={css.generalInfo_font}>Pincode:</span> 401107</p>
                    <p><span className={css.generalInfo_font}>State:</span> Maharashtra</p>
                </div>
            </div>
            
            <h5 className="fw-bold ">Uploaded Documents</h5>
            <div className="row mb-4">
    
                <div className="col-md-6">
                <h6>Signature</h6>
                <h6>Licence</h6>
                </div>
    
                <div className="col-md-6">
                <h6>Aadhar Card Front</h6>
                <h6>Aadhar Card Back</h6>
                </div>
         
            </div>
          
          
            {/* <p>Dr. Kulsum Khan is a competent general physician with a Bachelor of Homeopathic Medicine and Surgery (B.H.M.S.) degree. With three years of experience in the healthcare field, she has honed her skills in diagnosing and managing a variety of health conditions. Dr. Khan is dedicated to providing holistic and patient-focused care, leveraging her homeopathic expertise to promote overall wellness and effective treatment solutions. Her commitment to patient care ensures that each individual receives attentive and personalized medical support.</p> */}
        </div>
    </div>

    {/* <Tab.Container defaultActiveKey="general_info">
      <Nav variant="tabs" className="mt-3">
      <Nav.Item>
          <Nav.Link eventKey="general_info" className='text-black'>Doctor General Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="instant-call" className='text-black'>Instant Call Details</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content className="mt-3">
          <Tab.Pane eventKey="general_info">
             <GeneralInfoTab/>
          </Tab.Pane>

           <Tab.Pane eventKey="instant-call">
               <DInstantCallDetail />
           </Tab.Pane>
      </Tab.Content>
    </Tab.Container> */}
  </Container>
  )
}

export default LiveViewDetail

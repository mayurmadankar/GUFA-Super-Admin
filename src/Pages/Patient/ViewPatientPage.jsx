import React from 'react'
import css from "./Patient.module.css"
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import InstantCallDetails from './InstantCallDetails';

const ViewPatientPage = () => {

  return (
    <Container className={`mt-4 ${css.view_patient_container}`}>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col md={3} className="text-center">
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    margin: "auto",
                  }}
                ></div>
                <h5 className="mt-2">Sanauar Ansari</h5>
              </Col>
              <Col md={3}>
                <p><strong className={css.view_patient_top_font}>Gender:</strong> Male</p>
                <p><strong className={css.view_patient_top_font}>Date Of Birth:</strong > 01/07/1990</p>
                <p><strong className={css.view_patient_top_font}>Location:</strong> Mumbai</p>
              </Col>
              {/* <Col md={3}>
                <p><strong>Doctors Consulted Online:</strong></p>
                <ul>
                  <li>Dr. Sanauar Ansari</li>
                  <li>Dr. Abhishek S.K</li>
                </ul>
              </Col> */}
              <Col md={3}>
                <p><strong>Mobile No.:</strong> 7303241398</p>
                <p><strong>Email:</strong> manda@gmail.com</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Tab.Container defaultActiveKey="instant-call">
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="instant-call" className='text-black'>Instant Call</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="abha" className='text-black'>ABHA</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="instant-call">
            <Tab.Container defaultActiveKey="past">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="past" className='text-black'>Past</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ongoing" className='text-black'>Ongoing</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="past">
                  <InstantCallDetails />
                </Tab.Pane>

                <Tab.Pane eventKey="ongoing">
                  <p>Ongoing calls will be displayed here.</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Tab.Pane>

          <Tab.Pane eventKey="abha">
            <p>ABHA content goes here.</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

  </Container>
  )
}

export default ViewPatientPage

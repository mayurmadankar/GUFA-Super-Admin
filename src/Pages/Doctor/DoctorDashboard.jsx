import React, { useEffect, useState } from "react";
import css from "./Doctor.module.css";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import GeneralInfoTab from "./GeneralInfoTab";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import DInstantCallDetail from "./DInstantCallDetail";
// import Doctor from './Doctor';
import ApprovedDoctors from "./ApprovedDoctors";
import NewDoctors from "./NewDoctors";
// import LiveDoctors from './OnlineDoctorList';
import OnlineDoctorList from "./OnlineDoctorList";
import AppNotInstalled from "./AppNotInstalled";
import OfflineDoctorList from "./OfflineDoctorList";
import { useDispatch } from "react-redux";
import {
  fetchApprovedDoctors,
  fetchNewDoctorsList,
  fetchLiveDoctorsList
} from "../../Components/Redux/authDoctorOnboard";
// import OfflineDoctors from './OfflineDoctorList';

const DoctorDashboard = () => {
  const [activeKey, setActiveKey] = useState("approved_doctors");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fromViewPage = location.state?.fromViewPage === true;
    if (!fromViewPage) {
      dispatch(fetchApprovedDoctors());
      dispatch(fetchNewDoctorsList());
      dispatch(fetchLiveDoctorsList());
    }
  }, [dispatch, location.state]);

  return (
    <Container className={`${css.doctor_dashboard_container}`}>
      <div className="d-flex justify-content-between">
        <h4>Doctor Dashboard</h4>
        <Button variant="contained" size="small">
          <a
            href="https://bharatteleclinic.co/registration/doctor"
            target="_blank"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add New Doctor
          </a>{" "}
        </Button>
      </div>

      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="approved_doctors" className="text-black">
              Approved Doctors
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="new_doctors" className="text-black">
              New Doctors
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="live" className="text-black">
              🔴Live
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="approved_doctors">
            <ApprovedDoctors />
          </Tab.Pane>
          <Tab.Pane eventKey="new_doctors">
            <NewDoctors />
          </Tab.Pane>

          {/* ****************Sub tabs start here******************** */}
          <Tab.Pane eventKey="live">
            <Tab.Container defaultActiveKey="online">
              <Nav variant="tabs" className="mt-3">
                <Nav.Item>
                  <Nav.Link eventKey="online" className="text-black">
                    🟢Online
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="offline" className="text-black">
                    🔴Offline
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="app_not_installed" className="text-black">
                    App not installed
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="online">
                  <OnlineDoctorList />
                </Tab.Pane>
                <Tab.Pane eventKey="offline">
                  <OfflineDoctorList />
                </Tab.Pane>

                <Tab.Pane eventKey="app_not_installed">
                  <AppNotInstalled />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Tab.Pane>
          {/* ****************Sub tabs end here******************** */}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default DoctorDashboard;

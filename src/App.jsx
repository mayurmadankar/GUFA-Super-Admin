import "./App.css";
// updated on 07/07/2025 add device done
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar.jsx/Sidebar";
import Medical from "./Pages/Medicals/Medical";
import Admin from "./Pages/Admin/Admin";
// import Doctor from './Pages/Doctor/Doctor'
import Patient from "./Pages/Patient/Patient";
import Appointment from "./Pages/Appointments/Appointment";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Clinic from "./Pages/Clinic/Clinic";
import ViewPatientPage from "./Pages/Patient/ViewPatientPage";
import ViewDoctorPage from "./Pages/Doctor/ViewDoctorPage";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
import LiveViewDetail from "./Pages/Doctor/LiveViewDetail";
import InstantCall from "./Pages/InstantCall/InstantCall";
import PaymentTable from "./Pages/PaymentTable/PaymentTable";
import PrescriptionTable from "./Pages/PrescriptionTable/PrescriptionTable";
import FeedbackTable from "./Pages/FeedbackTable/FeedbackTable";
import AuditTable from "./Pages/AuditTable/AuditTable";
import ViewMedicalPage from "./Pages/Medicals/ViewMedicalPage";
import EditDoctorPage from "./Pages/Doctor/EditDoctorPage";
import OngoingInstantCall from "./Pages/InstantCall/OngoingInstantCall";
import EditMedical from "./Pages/Medicals/EditMedical";

function App() {
  const token = localStorage.getItem("admin_token");

  return (
    <>
      <BrowserRouter>
        {token ? <Header /> : ""}
        <div className="main d-flex">
          {token ? (
            <div className="sidebarWrapper">
              <Sidebar />
            </div>
          ) : (
            ""
          )}

          <div className="content">
            <Routes>
              {!token && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Login />} />
                </>
              )}
              <Route element={<ProtectedRoute />}>
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />

                <Route path="/" exact={true} element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Medical" element={<Medical />} />
                <Route
                  path="/medical/medical_detail/:medical_id"
                  element={<ViewMedicalPage />}
                />
                <Route
                  path="/medical/medical_edit/:medical_id"
                  element={<EditMedical />}
                />
                <Route path="/clinic" element={<Clinic />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route
                  path="/doctor/doctor_detail/:doctor_id"
                  element={<ViewDoctorPage />}
                />
                <Route
                  path="/edit_doctor_profile/:doctor_id"
                  element={<EditDoctorPage />}
                />
                <Route path="/patient" element={<Patient />} />
                <Route
                  path="/patient/patient_detail"
                  element={<ViewPatientPage />}
                />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/instant_call" element={<InstantCall />} />
                <Route path="/payment_table" element={<PaymentTable />} />
                <Route
                  path="/prescription_table"
                  element={<PrescriptionTable />}
                />
                <Route path="/feedback_table" element={<FeedbackTable />} />
                <Route path="/audit_table" element={<AuditTable />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

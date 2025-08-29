import React from "react";
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaHospital } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import { LiaFilePrescriptionSolid } from "react-icons/lia";
import { RiFeedbackFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { IoCall } from "react-icons/io5";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    if (!localStorage.getItem("admin_token")) {
      window.location.reload();
      navigate("/login");
    }
  };
  return (
    <div className="sidebar">
      <ul>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <MdDashboard />
            </span>
            Dashboard
          </Button>
        </NavLink>

        <NavLink
          to="/Medical"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <FaHospital />
            </span>
            Medicals
          </Button>
        </NavLink>

        <NavLink
          to="/clinic"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <FaClinicMedical />
            </span>
            Clinic
          </Button>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100 ">
            <span className="icon pr-2">
              <RiAdminFill />
            </span>
            <span id="lll"> Admin</span>
          </Button>
        </NavLink>

        <NavLink
          to="/doctor"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <FaUserDoctor />
            </span>
            Doctors
          </Button>
        </NavLink>

        <NavLink
          to="/patient"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <RiUserSearchFill />
            </span>
            Patients
          </Button>
        </NavLink>

        <NavLink
          to="/appointment"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <FaCalendarAlt />
            </span>
            Apponitments
          </Button>
        </NavLink>

        <NavLink
          to="/instant_call"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <IoCall />
            </span>
            Instant Call
          </Button>
        </NavLink>

        <NavLink
          to="/payment_table"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <MdPayments />
            </span>
            Payments
          </Button>
        </NavLink>

        <NavLink
          to="/prescription_table"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <LiaFilePrescriptionSolid />
            </span>
            Prescription
          </Button>
        </NavLink>

        <NavLink
          to="/feedback_table"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <RiFeedbackFill />
            </span>
            Feedback
          </Button>
        </NavLink>

        <NavLink
          to="/audit_table"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <BiSolidReport />
            </span>
            Audit Trail
          </Button>
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Button className="w-100">
            <span className="icon pr-2">
              <IoMdSettings />
            </span>
            Settings
          </Button>
        </NavLink>

        {/* <NavLink  to="/help" className={({ isActive }) => isActive ? 'active' : ''}>
            <Button className='w-100'>
                <span className='icon pr-2'><IoMdHelpCircle/></span>
              Help
            </Button>
        </NavLink> */}
      </ul>
      <br />
      <div className="logoutWrapper" onClick={handleLogout}>
        <div className="logoutBox">
          <Button variant="contained">
            <IoMdLogOut />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

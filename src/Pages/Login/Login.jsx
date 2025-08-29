import React, { useState } from "react";
import css from "./Login.module.css";
import appStore from "../../assets/playstore.jpg";
import { loginUser } from "../../Components/Redux/authLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegHospital } from "react-icons/fa";

// Snacbar
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Login = () => {
// Snacbar
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

    const dispatch=useDispatch();
    const navigate=useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setLoginInfo({ ...loginInfo, [name]: value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser(loginInfo));
    // console.log(response,"response at login submit")
    if (response?.payload?.status === 200) {
      localStorage.setItem(
        "admin_token",
        response?.payload?.data?.user_data?.access_token
      );
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting to dashboard...",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1000);
    } else {
      // console.error("Error while Login----", response.payload);
      setSnackbar({
        open: true,
        message: response?.payload?.message || "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <div className={css.login_container}>
    <div className={css.Newcontainer}>
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className={css.leftSection}>
        <div className={css.overlay}>
          <h1>Bharat TeleClinic</h1>
          <h2>Anytime, Anywhere Healthcare Delivery!</h2>
          <p>Customizable telehealth solution for your clinical practice</p>
          <div className={css.appStoreDiv}>
            <p>Also available in</p>
            <div className={css.app_buttons}>
              <img src={appStore} alt="App Store" />
            </div>
          </div>
        </div>
      </div>

      <div className={css.rightSection}>
      <div className={css.hospitalIcon}>
        <FaRegHospital />
        </div>
        <h2>Welcome to the Super Admin Panel.</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              onChange={handleChange}
              autoFocus
              type="email"
              name="email"
              placeholder="Email Id*"
              value={loginInfo.email}
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
            />
          </div>

          <p>
            Please read our <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms & Conditions</a>
          </p>

          <button type="submit" className={css.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;

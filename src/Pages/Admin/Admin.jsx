import React, { useState } from 'react'
import css from "./Admin.module.css"
import { Button } from '@mui/material'
// show password
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Admin = () => {
     const [formData, setFormData] = useState({
      email:"",
      password:"",
      domain:""
     });
const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className={css.admin_container}>
      <h4>Admin</h4>
      <h6>Add More Admin</h6>
       <div className="row mt-4">
          <div className="mb-1 col-md-3">
            <label className="form-label">Email<span style={{color:"red"}}>*</span></label>
            <input type="text" className="form-control" name='email' value={formData.email} onChange={handleChange} required/>
          </div>
              <div className="mb-1 col-md-3">
            <label className="form-label">Domain<span style={{color:"red"}}>*</span></label>
            <select className="form-control" name='domain' value={formData.domain} onChange={handleChange}>
              <option>--Select your domain--</option>
              <option>Sales</option>
              <option>Operation</option>
              <option>Tech</option>
            </select>
          </div>
          <div className="mb-1 col-md-3">
            <label className="form-label">Password<span style={{color:"red"}}>*</span></label>
               <div style={{ position: "relative", display: "block" }}>
              <input
                className="form-control"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                style={{ paddingRight: "40px" }}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#333",
                }}
              />
            </div>
          </div>
            <div className="mb-2 col-md-3 d-flex align-items-end">
            <Button onClick={togglePasswordVisibility} type='submit' sx={{fontSize:"small"}} className="w-100" variant="contained">Submit</Button>
          </div>
        </div>
    </div>
  )
}
export default Admin

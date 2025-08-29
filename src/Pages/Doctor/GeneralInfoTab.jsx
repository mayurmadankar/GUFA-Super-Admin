import css from "./Doctor.module.css";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import image from "../../assets/btimage.jpg";
import { border } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApprovedDoctor,
  clearApprovedDoctorUser
} from "../../Components/Redux/authDoctorOnboard";
// Snacbar
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none"
};

const specialityText = {
  1: "General Physician",
  2: "Gynecologist",
  3: "Dermatologist",
  4: "Sexologist",
  5: "Psychiatrist",
  6: "Gastroenterologist",
  7: "Pediatrician",
  8: "ENT Specialist",
  9: "Urologist",
  10: "Orthopedist",
  11: "Neurologist",
  12: "Cardiologist",
  13: "Nutritionist/Dietitian",
  14: "Diabetology",
  15: "Eye & Vision",
  16: "Dentist",
  17: "Pulmonologist",
  18: "Ayurveda",
  19: "Homeopathy",
  20: "Cancer",
  21: "Physiotherapist",
  22: "Nephrologist",
  23: "Trichologist"
};

const GeneralInfoTab = ({ doctor, showApproveButton }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState(null);
  const dispatch = useDispatch();
  const { error, approvedDoctorUser } = useSelector(
    (state) => state.doctorUser
  );

  // console.log(doctor, "doctor");
  // console.log("Doctor signature", doctor.docs?.signature);

  // Snacbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message:
          error?.message || "Failed to Approve Doctor. Please try again.",
        severity: "error"
      });
    }
    if (approvedDoctorUser) {
      setSnackbar({
        open: true,
        message: "Successfully Approved.",
        severity: "success"
      });

      setTimeout(() => {
        dispatch(clearApprovedDoctorUser());
      }, 3000);
    }
  }, [error, approvedDoctorUser, dispatch]);

  const handleOpen = (docType) => {
    setSelectedDoc(docType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoc(null);
  };

  const bucket = import.meta.env.VITE_BUCKET_NAME; // Get bucket name from env
  const region = import.meta.env.VITE_REGION_NAME;

  const getImageSrc = (docType) => {
    if (!doctor?.docs) return null;

    const region = "s3.ap-south-1"; // or use: import.meta.env.VITE_REGION
    const bucket = import.meta.env.VITE_BUCKET_NAME;

    let imagePath = null;

    switch (docType) {
      case "signature":
        imagePath = doctor.docs.signature;
        break;
      case "license_image":
        imagePath = doctor.docs.license_image;
        break;
      case "aadhar_front_img":
        imagePath = doctor.docs.aadhar_front_img;
        break;
      case "pan_card_img":
        imagePath = doctor.docs.pan_card_img;
        break;
      case "aadhar_back_img":
        imagePath = doctor.docs.aadhar_back_img;
        break;
      case "cancelled_cheque_img":
        imagePath = doctor.docs.cancelled_cheque_img;
        break;
      case "clinic_estab_licence":
        imagePath = doctor?.clinic?.clinic_est_licence_img;
        break;
      case "trade_licence_img":
        imagePath = doctor?.clinic?.trade_license_img;
        break;
      case "clinic_gst_img":
        imagePath = doctor?.clinic?.clinic_gst_img;
        break;
      case "clinic_owner_aadhar_img":
        imagePath = doctor?.clinic?.clinic_owner_aadhar_front_img;
        break;
      default:
        return null;
    }

    if (!imagePath) return null;

    // If already full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Otherwise construct full S3 URL
    return `http://${bucket}.${region}.amazonaws.com/${imagePath.replace(
      /^\/+/,
      ""
    )}`;
  };

  //Helper to get file extension
  const getFileType = (filePath) => {
    if (!filePath) return "";
    const ext = filePath.split(".").pop().toLowerCase();
    return ext;
  };

  const handleApprove = (doctor_id) => {
    dispatch(fetchApprovedDoctor(doctor_id));
  };

  const navigate = useNavigate();
  const handleEdit = (doctor_id) => {
    navigate(`/edit_doctor_profile/${doctor_id}`);
  };

  return (
    <div>
      {/* Snackbar always place at the top div*/}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Clinic Details</h5>
          {showApproveButton && (
            <div className="d-flex flex-row gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEdit(doctor?.doctor_id)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleApprove(doctor?.doctor_id)}
              >
                Approve
              </button>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>Clinic Name:</span>{" "}
              {doctor?.clinic?.clinic_name || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Clinic GST Number:</span>{" "}
              {doctor?.clinic?.clinic_gst_no || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>
                Clinic Owner Aadhar No.:
              </span>{" "}
              {doctor?.clinic?.clinic_owner_aadhar_no || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>City:</span>{" "}
              {doctor?.clinic?.clinic_address?.city || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Pincode:</span>{" "}
              {doctor?.clinic?.clinic_address?.pincode || "N/A"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>
                Clinical Establishment Licence No:
              </span>{" "}
              {doctor?.clinic?.clinic_est_licence_no || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>
                Trade License (Municipal Corporation) No.:
              </span>{" "}
              {doctor?.clinic?.trade_license_no || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Address:</span>{" "}
              {doctor?.clinic?.clinic_address?.street || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>State:</span>{" "}
              {doctor?.clinic?.clinic_address?.state || "N/A"}
            </p>
          </div>
        </div>

        <h5 className="fw-bold">Doctor Personal Information</h5>
        <div className="row">
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>First Name:</span>{" "}
              {doctor?.first_name}
            </p>
            <p>
              <span className={css.generalInfo_font}>Last Name:</span>{" "}
              {doctor?.last_name}
            </p>
            <p>
              <span className={css.generalInfo_font}>Gender:</span>{" "}
              {doctor?.gender}
            </p>
            <p>
              <span className={css.generalInfo_font}>Date Of Birth:</span>{" "}
              {doctor?.dob ? new Date(doctor?.dob).toLocaleDateString() : "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Pan No.:</span>{" "}
              {doctor?.pan_card_no || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Selected Price:</span>{" "}
              {doctor?.consultation_fee.join(",") || "N/A"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>Education:</span>{" "}
              {doctor?.qualification || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Speciality:</span>{" "}
              {specialityText[Number(doctor?.speciality)] || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Experience:</span>{" "}
              {doctor?.experience} Years
            </p>
            <p>
              <span className={css.generalInfo_font}>License Number:</span>{" "}
              {doctor?.license || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>
                License Registration Date:
              </span>{" "}
              {doctor?.license_registration_date
                ? new Date(
                    doctor?.license_registration_date
                  ).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>License Valid Upto:</span>{" "}
              {doctor?.valid_up_to_date
                ? new Date(doctor?.valid_up_to_date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <h5 className="fw-bold">Contact details</h5>

        <div className="row">
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>Phone Number:</span>{" "}
              {doctor?.contact_number}
            </p>
            <p>
              <span className={css.generalInfo_font}>Email:</span>{" "}
              {doctor?.email}
            </p>
            <p>
              <span className={css.generalInfo_font}>Address:</span>{" "}
              {doctor?.address?.street || "N/A"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>City:</span>{" "}
              {doctor?.address?.city || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Pincode:</span>{" "}
              {doctor?.address?.pincode || "N/A"}
            </p>
            <p>
              <span className={css.generalInfo_font}>State:</span>{" "}
              {doctor?.address?.state || "N/A"}
            </p>
          </div>
        </div>

        <h5 className="fw-bold">Uploaded Documents</h5>
        <div className="row mb-4">
          <div className="col-md-6">
            <h6
              onClick={() => handleOpen("signature")}
              style={{ cursor: "pointer" }}
            >
              Signature:{" "}
              {doctor.docs?.signature ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
            <h6
              onClick={() => handleOpen("license_image")}
              style={{ cursor: "pointer" }}
            >
              Licence:{" "}
              {doctor.docs?.license_image ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
            <h6
              onClick={() => handleOpen("pan_card_img")}
              style={{ cursor: "pointer" }}
            >
              Pan Card:{" "}
              {doctor.docs?.pan_card_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>

            <h6
              onClick={() => handleOpen("clinic_estab_licence")}
              style={{ cursor: "pointer" }}
            >
              Clinical Establishment Licence:{" "}
              {doctor?.clinic?.clinic_est_licence_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
            <h6
              onClick={() => handleOpen("trade_licence_img")}
              style={{ cursor: "pointer" }}
            >
              Trade License:{" "}
              {doctor?.clinic?.trade_license_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
          </div>

          <div className="col-md-6">
            <h6
              onClick={() => handleOpen("aadhar_front_img")}
              style={{ cursor: "pointer" }}
            >
              Aadhar Card Front:{" "}
              {doctor?.docs?.aadhar_front_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
            <h6
              onClick={() => handleOpen("aadhar_back_img")}
              style={{ cursor: "pointer" }}
            >
              Aadhar Card Back:{" "}
              {doctor?.docs?.aadhar_back_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>

            <h6
              onClick={() => handleOpen("cancelled_cheque_img")}
              style={{ cursor: "pointer" }}
            >
              Cancelled Check:{" "}
              {doctor?.docs?.cancelled_cheque_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>

            <h6
              onClick={() => handleOpen("clinic_gst_img")}
              style={{ cursor: "pointer" }}
            >
              Clinic GST Certificate:{" "}
              {doctor?.clinic?.clinic_gst_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>

            <h6
              onClick={() => handleOpen("clinic_owner_aadhar_img")}
              style={{ cursor: "pointer" }}
            >
              Clinic Owner Aadhar:{" "}
              {doctor?.clinic?.clinic_owner_aadhar_front_img ? (
                <Button variant="contained">Uploaded</Button>
              ) : (
                <Button variant="contained">Not Uploaded</Button>
              )}
            </h6>
          </div>
        </div>

        {/* Common Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            {getImageSrc(selectedDoc) ? (
              (() => {
                const fileType = getFileType(getImageSrc(selectedDoc));
                if (fileType === "pdf") {
                  return (
                    <iframe
                      src={getImageSrc(selectedDoc)}
                      width="100%"
                      height="500px"
                      title="PDF Preview"
                    />
                  );
                } else {
                  return (
                    <img
                      src={getImageSrc(selectedDoc)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "contain"
                      }}
                    />
                  );
                }
              })()
            ) : (
              <Typography variant="h6" component="div">
                Image not available
              </Typography>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default GeneralInfoTab;

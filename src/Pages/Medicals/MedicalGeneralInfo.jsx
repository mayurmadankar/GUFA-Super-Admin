import React, { useEffect, useRef, useState } from "react";
import css from "./Medical.module.css";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { addDevices } from "../../Components/Redux/authPatientList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { clearAllotedDevice } from "../../Components/Redux/authPatientList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none"
};

// Snacbar
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";

const MedicalGeneralInfo = ({ medicalId }) => {
  const { medical_id } = useParams();
  const [deviceOption, setDeviceOption] = useState(""); // rent or sell
  const [isDeviceDetailBtnOpen, setIsDeviceDetailBtnOpen] = useState(false); // rent or sell
  const dispatch = useDispatch();
  const { error, addedDevice } = useSelector((state) => state.patientList);

  const [open, setOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState(null);

  const { singleMedical } = useSelector((state) => state.medicalUser);
  const medical = singleMedical?.data;
  // console.log(medical, "indivisual medical detail");

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
    if (!medical) return null;

    const region = "s3.ap-south-1"; // or use: import.meta.env.VITE_REGION
    const bucket = import.meta.env.VITE_BUCKET_NAME;

    let imagePath = null;

    switch (docType) {
      case "med_store_licence_img":
        imagePath = medical?.documents[0]?.image;
        break;
      case "med_store_gst_img":
        imagePath = medical?.documents[1]?.image;
        break;
      case "aadhar_owner_img":
        imagePath = medical?.owner?.aadhar_front_img;
        break;
      case "aadhar_pharmacist_img":
        imagePath = medical?.pharmacists[0]?.aadhar_front_img;
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

  const handleDeviceButton = () => {
    setIsDeviceDetailBtnOpen((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    device_serial: "",
    imei: "",
    sim_number: "",
    sim_provider: "",
    data_capacity: "",
    deduct_sim_cost: null,
    // consultation_fees: "",
    longitude: "",
    latitude: "",
    //vital measurment fee
    fever_fee: null,
    chest_pain_fee: null,
    breathing_difficulty_fee: null,
    dizziness_fee: null,
    irregular_heartbeat_fee: null,
    swelling_fee: null,
    weight_change_fee: null,
    diabetes_fee: null,
    referral_commission: null,
    lab_referral: null,
    prescription_sales: null,
    pharma_ads: null,
    // device_status: "",

    // rent details
    rent_deposit: "",
    rent_monthly: "",
    rent_contract_month: "",
    deduct_rent: null,

    // sell details
    order_number: "",
    expected_delivery: "",
    activation_date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medical_id) {
      return;
    }
    // Format date fields to DD-MM-YYYY
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    };

    const formattedData = {
      ...formData,
      expected_delivery: formatDate(formData.expected_delivery),
      activation_date: formatDate(formData.activation_date)
    };
    dispatch(addDevices({ formData: formattedData, id: medical_id }));
  };

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error?.message || "Registration failed. Please try again.",
        severity: "error"
      });

      return;
    }

    if (addedDevice) {
      setSnackbar({
        open: true,
        message: "Added Device successfully.",
        severity: "success"
      });
      //  Scroll to top on success
      window.scrollTo({ top: 0, behavior: "smooth" });
      // now reset all the addDevice formData
      setFormData({
        device_serial: "",
        imei: "",
        sim_number: "",
        sim_provider: "",
        data_capacity: "",
        deduct_sim_cost: "",
        // consultation_fees: "",
        longitude: "",
        latitude: "",
        //vital measurment fee
        fever_fee: "",
        chest_pain_fee: "",
        breathing_difficulty_fee: "",
        dizziness_fee: "",
        irregular_heartbeat_fee: "",
        swelling_fee: "",
        weight_change_fee: "",
        diabetes_fee: "",
        referral_commission: "",
        lab_referral: "",
        prescription_sales: "",
        pharma_ads: "",
        // device_status: "",

        // rent details
        rent_deposit: "",
        rent_monthly: "",
        rent_contract_month: "",
        deduct_rent: "",

        // sell details
        order_number: "",
        expected_delivery: "",
        activation_date: ""
      });

      setTimeout(() => {
        dispatch(clearAllotedDevice());
      }, 3000);
    }
  }, [error, dispatch, addedDevice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h5 className="fw-bold">Order Details</h5>
        </div>
        <div className="row">
          <div className="col-md-3">
            <p>
              <span className={css.generalInfo_font}>Product Name: </span>
              {medical?.order?.product_name || "-"}
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <span className={css.generalInfo_font}>Quantity: </span>
              {medical?.order?.quantity || "-"}
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <span className={css.generalInfo_font}>Status: </span>
              {medical?.order?.status || "-"}
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <span className={css.generalInfo_font}>Amount: </span>
              {medical?.order?.total_amount || "-"}
            </p>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-4">
            <p><span className={css.generalInfo_font}>Trial start date: </span>{tDate || "-"}</p>
          </div>
          <div className="col-md-4">
            <p><span className={css.generalInfo_font}>Trial end date: </span>{medical?.order?.trial_end_date || "-"}</p>
          </div>
        </div> */}

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Store Information</h5>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}> GST Number:</span>
              {medical?.owner?.gst_no || "-"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>Owner Aadhar No.: </span>
              {medical?.owner?.aadhar_no || "-"}
            </p>
          </div>
        </div>

        <h5 className="fw-bold">Contact details</h5>

        <div className="row">
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>Email: </span>
              {medical?.owner?.email || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Address: </span>
              {medical?.address?.address || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>street: </span>
              {medical?.address?.street || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Area:</span>
              {medical?.address?.area || "-"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <span className={css.generalInfo_font}>District: </span>
              {medical?.address?.city || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>City: </span>
              {medical?.address?.city || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>Pincode: </span>
              {medical?.address?.pincode || "-"}
            </p>
            <p>
              <span className={css.generalInfo_font}>State: </span>
              {medical?.address?.state || "-"}
            </p>
          </div>
        </div>

        <h5 className="fw-bold">Uploaded Documents</h5>
        <div className="row mb-4">
          <div className="col-md-6">
            <h6
              onClick={() => handleOpen("med_store_licence_img")}
              style={{ cursor: "pointer" }}
            >
              Medical Store Licence:{" "}
              {medical?.documents[0]?.image ? "Uploaded" : "Not Uploaded"}
            </h6>
            <h6
              onClick={() => handleOpen("med_store_gst_img")}
              style={{ cursor: "pointer" }}
            >
              Medical Store GST Cert.:{" "}
              {medical?.documents[1]?.image ? "Uploaded" : "Not Uploaded"}
            </h6>
          </div>
          <div className="col-md-6">
            <h6
              onClick={() => handleOpen("aadhar_owner_img")}
              style={{ cursor: "pointer" }}
            >
              Aadhar Card Of Owner:{" "}
              {medical?.owner?.aadhar_front_img ? "Uploaded" : "Not Uploaded"}
            </h6>
            <h6
              onClick={() => handleOpen("aadhar_pharmacist_img")}
              style={{ cursor: "pointer" }}
            >
              Aadhar Card Of Pharmacist:{" "}
              {medical?.pharmacists[0]?.aadhar_front_img
                ? "Uploaded"
                : "Not Uploaded"}
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
              getImageSrc(selectedDoc).toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={getImageSrc(selectedDoc)}
                  width="100%"
                  height="500px"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={getImageSrc(selectedDoc)}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "contain"
                  }}
                />
              )
            ) : (
              <Typography variant="h6" component="div">
                Document not available
              </Typography>
            )}
          </Box>
        </Modal>

        <div className="d-flex justify-content-center mb-3">
          <Button variant="contained" onClick={handleDeviceButton}>
            Add Device Detail
          </Button>
        </div>
        {isDeviceDetailBtnOpen && (
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow mt-1 bg-white"
          >
            <h4>For Medical Name</h4>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Device Serial No.
                  <span id="startMark" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="device_serial"
                  value={formData.device_serial}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  IMEI
                  <span id="startMark" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="imei"
                  value={formData.imei}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  SIM number
                  <span id="startMark" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sim_number"
                  value={formData.sim_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Sim provider
                  <span id="startMark" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <select
                  className="form-control"
                  name="sim_provider"
                  value={formData.sim_provider}
                  onChange={handleChange}
                  required
                >
                  <option value="">---Select---</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Joi">Jio</option>
                  <option value="VI">VI</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Internet Data capacity per month(GB)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="data_capacity"
                  value={formData.data_capacity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Deduct the sim cost from monthly earning
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="deduct_sim_cost"
                  value={formData.deduct_sim_cost}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label">Consulation Fees</label>
                <select
                  className="form-control"
                  name="consultation_fees"
                  value={formData.consultation_fees}
                  onChange={handleChange}
                >
                  <option value="">---Select---</option>
                  <option value="99">₹99</option>
                  <option value="199">₹199</option>
                  <option value="299">₹299</option>
                  <option value="399">₹399</option>
                  <option value="499">₹499</option>
                </select>
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h4>Vital Measurment Fees</h4>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Fever / Feeling hot | will check Body temperature (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="fever_fee"
                  value={formData.fever_fee}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Chest pain | will check Oxygen level, BP, Heart rhythm (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="chest_pain_fee"
                  value={formData.chest_pain_fee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Breathing difficulty | will check Oxygen saturation (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="breathing_difficulty_fee"
                  nulllue={formData.breathing_difficulty_fee}
                  nullChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Dizziness | check Blood pressure, Blood sugar (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="dizziness_fee"
                  nulllue={formData.dizziness_fee}
                  nullChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Irregular heartbeat | will check Pulse rate, Heart rhythm (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="irregular_heartbeat_fee"
                  nulllue={formData.irregular_heartbeat_fee}
                  nullChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Swelling in legs / face | Check for diabetes or kidney issue
                  (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="swelling_fee"
                  value={formData.swelling_fee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Sudden weight gain / loss | will check Body weight, BMI (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="weight_change_fee"
                  value={formData.weight_change_fee}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Diabetes / Fatigue / Weakness | will check Blood sugar level
                  (Rs)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="diabetes_fee"
                  value={formData.diabetes_fee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">
                  Doctor Referal another clinic Comission (%)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="referral_commission"
                  value={formData.referral_commission}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Lab Referrals (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="lab_referral"
                  value={formData.lab_referral}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Prescription Sales (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="prescription_sales"
                  value={formData.prescription_sales}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Pharma Ads (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="pharma_ads"
                  value={formData.pharma_ads}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Radio Buttons */}
            <FormControl component="fieldset" fullWidth>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Device Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="device-status-label"
                name="deviceOption"
                value={deviceOption}
                onChange={(e) => setDeviceOption(e.target.value)}
              >
                <FormControlLabel
                  value="rent"
                  control={<Radio />}
                  label="Device on rent"
                />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label="Device on sell"
                />
              </RadioGroup>
            </FormControl>

            {/* Rent Details */}
            {deviceOption === "rent" && (
              <div className="mb-5">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Device rent Deposit (Rs)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="rent_deposit"
                      value={formData.rent_deposit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Device monthly rent (Rs)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="rent_monthly"
                      value={formData.rent_monthly}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Rental Contract Month</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rent_contract_month"
                      value={formData.rent_contract_month}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* <div className="mb-3 col-md-6">
                             <label className="form-label">Deduct the rent from medical store earning (Rs)</label>
                             <input type="text" className="form-control" name="deduct_rent" value={formData.deduct_rent} onChange={handleChange}  required/>
                         </div> */}
                </div>
              </div>
            )}

            {/* Sell Details */}
            {deviceOption === "sell" && (
              <div className="mb-5">
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label className="form-label">Order number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="order_number"
                      value={formData.order_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label className="form-label">Expected delivery date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expected_delivery"
                      value={formData.expected_delivery}
                      onChange={handleChange}
                      min="1900-01-01"
                      max="2099-12-31"
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label className="form-label">Activation Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="activation_date"
                      value={formData.activation_date}
                      onChange={handleChange}
                      min="1900-01-01"
                      max="2099-12-31"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button type="submit" sx={{ width: "100%" }} variant="contained">
                Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MedicalGeneralInfo;

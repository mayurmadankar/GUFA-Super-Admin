import React, { useEffect, useState } from "react";
import css from "./Doctor.module.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorInfo } from "../../Components/Redux/authDoctorOnboard";

const EditDoctorPage = () => {
  const navigate = useNavigate();
  const { singleDoctor, loading, error } = useSelector(
    (state) => state.doctorUser
  );
  const doctor = singleDoctor.doctor;
  // console.log(doctor,"ppp")

  const handleCancel = () => {
    navigate(-1);
  };
  // Clinic and Owner Details
  const [updatedClinData, setUpdatedClinData] = useState({
    clinic_name: "",
    clinic_address: "",
    clinic_city: "",
    clinic_state: "",
    clinic_pincode: "",
    clinic_est_licence_no: "",
    clinic_est_licence_img: "",
    trade_license_no: "",
    trade_license_img: "",
    clinic_gst_no: "",
    clinic_gst_img: "",
    clinic_owner_aadhar_no: "",
    clinic_owner_aadhar_img: ""
  });
  // Doctor Details
  const [updatedDocData, setUpdatedDocData] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    qualification: "",
    experience: "",
    speciality: "",
    license_number: "",
    license_registration_date: "",
    valid_up_to_date: "",
    email: "",
    number: "",
    password: "",
    aadhar_no: "",
    consultation_fees: [],
    address: "",
    city: "",
    state: "",
    pincode: "",
    data_sharing_consent: false,
    usertype: 1,
    license_img: "",
    signature_img: "",
    aadhar_front_img: "",
    aadhar_back_img: "",
    pan_card_no: "",
    profile_img: "",
    cancelled_cheque_img: "",
    pan_card_img: ""
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedClinData({ ...updatedClinData, [name]: value });
  };

  const handleDocChange = (e) => {
    const { name, options, type, value } = e.target;

    if (name === "consultation_fees" && type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setUpdatedDocData({ ...updatedDocData, [name]: selectedOptions });
    } else {
      setUpdatedDocData({ ...updatedDocData, [name]: value });
    }
  };

  // const handleDocChange=(e)=>{
  //   // let name=e.target.name;
  //   // let value=e.target.value;
  //   // setUpdatedDocData({...updatedClinData,[name]:value})
  //     const { name, options } = e.target;

  //   if (name === "consultation_fees") {
  //     const selectedOptions = Array.from(options)
  //       .filter(option => option.selected)
  //       .map(option => option.value);
  //     setUpdatedDocData({ ...updatedDocData , [name]: selectedOptions });
  //   } else {
  //     setUpdatedDocData({ ...updatedDocData , [e.target.name]: e.target.value });
  //   }
  // }

  useEffect(() => {
    if (doctor) {
      setUpdatedClinData({
        clinic_name: doctor.clinic_name || "",
        clinic_address: doctor.address?.street || "",
        clinic_city: doctor.address?.city || "",
        clinic_state: doctor.address?.state || "",
        clinic_pincode: doctor.address?.pincode || "",
        clinic_est_licence_no: doctor?.clinic?.clinic_est_licence_no || "",
        trade_license_no: doctor?.clinic?.trade_license_no || "",
        clinic_gst_no: doctor?.clinic?.clinic_gst_no || "",
        clinic_owner_aadhar_no: doctor?.clinic?.clinic_gst_no || "",
        trade_license_img: "",
        clinic_est_licence_img: "",
        clinic_gst_img: "",
        clinic_owner_aadhar_img: ""
      });

      setUpdatedDocData({
        fname: doctor.first_name || "",
        lname: doctor.last_name || "",
        gender: doctor.gender || "",
        dob: doctor.dob || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience?.toString() || "",
        speciality: doctor.speciality?.toString() || "",
        license_number: doctor.license || "",
        license_registration_date: doctor?.license_registration_date,
        valid_up_to_date: doctor?.valid_up_to_date,
        email: doctor.email || "",
        number: doctor.contact_number || "",
        password: "",
        aadhar_no: doctor.aadhar_no || "",
        consultation_fees:
          doctor.consultation_fee?.map((fee) => fee.toString()) || [],
        address: doctor.address?.street || "",
        city: doctor.address?.city || "",
        state: doctor.address?.state || "",
        pincode: doctor.address?.pincode || "",
        data_sharing_consent: false,
        usertype: 1,
        license_img: doctor.docs?.license_image || "",
        signature_img: doctor.docs?.signature || "",
        aadhar_front_img: doctor.docs?.aadhar_front_img || "",
        aadhar_back_img: doctor.docs?.aadhar_back_img || "",
        pan_card_no: doctor.pan_card_no || "",
        profile_img: doctor.docs?.profile_img || "",
        cancelled_cheque_img: doctor.docs?.cancelled_cheque_img || "",
        pan_card_img: doctor.docs?.pan_card_img || ""
      });
    }
  }, [doctor]);

  const specialityMap = {
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

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mergedData = { ...updatedDocData, ...updatedClinData };
    const formData = new FormData();
    for (const key in mergedData) {
      if (key === "consultation_fees") {
        formData.append(key, JSON.stringify(mergedData[key]));
      } else {
        formData.append(key, mergedData[key]);
      }
    }

    try {
      const resultAction = await dispatch(
        updateDoctorInfo({
          doctor_id: doctor?.doctor_id,
          credentials: formData
        })
      );

      if (updateDoctorInfo.fulfilled.match(resultAction)) {
        // Redux has been updated successfully, now it's safe to navigate
        navigate(-1);
      } else {
        // Optional: Show an error message to user
        console.error("Doctor update failed:", resultAction?.payload?.message);
      }
    } catch (err) {
      console.error("Unexpected error during update:", err);
    }
  };

  //   const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const mergedData = { ...updatedDocData, ...updatedClinData };
  //   const formData = new FormData();
  //   for (const key in mergedData) {
  //     if (key === "consultation_fees") {
  //       formData.append(key, JSON.stringify(mergedData[key]));
  //     } else {
  //       formData.append(key, mergedData[key]);
  //     }
  //   }
  //   dispatch(updateDoctorInfo({ doctor_id: doctor?.doctor_id, credentials:formData }));
  //   navigate(-1);
  // };

  //   const handleSubmit=(e)=>{
  //     e.preventDefault();
  //     let mergedData;
  //     mergedData={...updatedDocData,...updatedClinData}
  // console.log(mergedData,"data")
  //   dispatch(updateDoctorInfo({ doctor_id: doctor?.doctor_id, mergedData }));
  //   navigate(-1)
  //   }

  return (
    <div className={`${css.view_doctor_container}`}>
      <h4 style={{ marginBottom: "20px" }}>
        Edit Doctor Profile-{doctor?.doctor_id}
      </h4>

      <form className="p-4 border rounded shadow mt-1 bg-white">
        <div>
          <h4>Clinic Details</h4>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Clinic Name</label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.clinic_name}
                name="clinic_name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Shop No., Building name/number"
                value={updatedClinData.clinic_address}
                name="clinic_address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Taluka/City Name"
                value={updatedClinData.clinic_city}
                name="clinic_city"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.clinic_state}
                name="clinic_state"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.clinic_pincode}
                name="clinic_pincode"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Clinical Establishment Licence No.
              </label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.clinic_est_licence_no}
                name="clinic_est_licence_no"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Upload Clinical Establishment Licence (JPEG/JPG/PNG)
              </label>
              <input
                className="form-control"
                type="file"
                id="establishmentLicenceImg"
                name="clinic_est_licence_img"
                accept=".jpeg,.jpg,.png"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Upload Trade License (Municipal Corporation) No.
              </label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.trade_license_no}
                name="trade_license_no"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Upload Trade License (JPEG/JPG/PNG)
              </label>
              <input
                className="form-control"
                type="file"
                id="tradeLicenceImg"
                name="trade_license_img"
                accept=".jpeg,.jpg,.png"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">GST Registration Number</label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData.clinic_gst_no}
                name="clinic_gst_no"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Upload GST Certificate (JPEG/JPG/PNG)
              </label>
              <input
                className="form-control"
                type="file"
                id="clinicGst"
                name="clinic_gst_img"
                accept=".jpeg,.jpg,.png"
              />
            </div>
          </div>
        </div>

        <div>
          <h4>Clinic Owner Details</h4>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Adhar Number No.</label>
              <input
                type="text"
                className="form-control"
                value={updatedClinData?.clinic_owner_aadhar_no}
                name="clinic_owner_aadhar_no"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">
                Upload Aadhaar Card (JPEG/JPG/PNG)
              </label>
              <input
                className="form-control"
                type="file"
                id="ownerAadharFront"
                name="clinic_owner_aadhar_img"
                accept=".jpeg,.jpg,.png"
              />
            </div>
          </div>
        </div>

        <div>
          <h4>Doctor Details</h4>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.fname}
              name="fname"
              onChange={handleDocChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.lname}
              name="lname"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={updatedDocData.gender}
              name="gender"
              onChange={handleDocChange}
            >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              value={updatedDocData.dob}
              name="dob"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Qualification</label>
            <select
              className="form-control"
              value={updatedDocData.qualification}
              name="qualification"
              onChange={handleDocChange}
            >
              <option value="">--Select--</option>
              <option value="MBBS">
                MBBS (Bachelor of Medicine and Bachelor of Surgery)
              </option>
              <option value="BDS">BDS (Bachelor of Dental Surgery)</option>
              <option value="BAMS">
                BAMS (Bachelor of Ayurvedic Medicine and Surgery)
              </option>
              <option value="BHMS">
                BHMS (Bachelor of Homeopathic Medicine and Surgery)
              </option>
              <option value="BUMS">
                BUMS (Bachelor of Unani Medicine and Surgery)
              </option>
              <option value="BSMS">
                BSMS (Bachelor of Siddha Medicine and Surgery)
              </option>
              <option value="BNYS">
                BNYS (Bachelor of Naturopathy and Yogic Sciences)
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Experince (Years)</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.experience}
              name="experience"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Speciality</label>
            <select
              name="speciality"
              className="form-control"
              value={updatedDocData.speciality}
            >
              <option value="">--Select--</option>
              {Object.entries(specialityMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Licence Number</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.license_number}
              name="license_number"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Licence Registration Date</label>
            <input
              type="date"
              className="form-control"
              value={updatedDocData.license_registration_date}
              name="license_registration_date"
              onChange={handleDocChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Up To Date</label>
            <input
              type="date"
              className="form-control"
              value={updatedDocData.valid_up_to_date}
              name="valid_up_to_date"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={updatedDocData.email}
              name="email"
              onChange={handleDocChange}
            />
          </div>
          {/* GPT code */}
          <div className="mb-3 col-md-6">
            <label className="form-label">Consultation Fees</label>

            {[100, 200, 300, 400, 500].map((fee) => (
              <div className="form-check" key={fee}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="consultation_fees"
                  value={fee}
                  checked={updatedDocData.consultation_fees.includes(
                    fee.toString()
                  )}
                  onChange={(e) => {
                    const selected = updatedDocData.consultation_fees;
                    if (e.target.checked) {
                      setUpdatedDocData({
                        ...updatedDocData,
                        consultation_fees: [...selected, e.target.value]
                      });
                    } else {
                      setUpdatedDocData({
                        ...updatedDocData,
                        consultation_fees: selected.filter(
                          (val) => val !== e.target.value
                        )
                      });
                    }
                  }}
                />
                <label className="form-check-label">₹{fee}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Password</label>
            <div style={{ position: "relative", display: "block" }}>
              <input
                className="form-control"
                value={updatedDocData.password}
                name="password"
              />
            </div>
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label">Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.aadhar_no}
              name="aadhar_no"
              onChange={handleDocChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            value={updatedDocData.address}
            name="address"
            onChange={handleDocChange}
          ></textarea>
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.city}
              name="city"
              onChange={handleDocChange}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.state}
              name="state"
              onChange={handleDocChange}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              value={updatedDocData.pincode}
              name="pincode"
              onChange={handleDocChange}
            />
          </div>
        </div>

        {/* <div>
          <label className="form-label">
            Consulation Fees
          </label>

          {[100, 200, 300, 400, 500].map((fee) => (
            <div className="form-check" key={fee}>
              <input
                className="form-check-input"
                type="checkbox"
                name="consultation_fees"
                value={fee}
                checked={doctorFormData.consultation_fees.includes(
                  fee.toString()
                )}
                onChange={(e) => {
                  const selected = doctorFormData.consultation_fees;
                  if (e.target.checked) {
                    setDoctorFormData({
                      ...doctorFormData,
                      consultation_fees: [...selected, e.target.value],
                    });
                  } else {
                    setDoctorFormData({
                      ...doctorFormData,
                      consultation_fees: selected.filter(
                        (val) => val !== e.target.value
                      ),
                    });
                  }
                }}
              />
              <label className="form-check-label">₹{fee}</label>
            </div>
          ))}
        </div> */}

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload License Copy (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="licenseInput"
              name="license_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload Signature (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="signature_img"
              name="signature_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload Aadhar Card Front (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="aadharFrontInput"
              name="aadhar_front_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload Aadhar Card Back (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="aadharBackInput"
              name="aadhar_back_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Pan Card No.</label>
            <input
              className="form-control"
              type="text"
              name="pan_card_no"
              value={updatedDocData.pan_card_no}
              onChange={handleDocChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Upload Pan Card (JPEG/JPG/PNG)</label>
            <input
              className="form-control"
              type="file"
              id="panCardImageInput"
              name="pan_card_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload Cancelled Check Image (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="checkImageInput"
              name="cancelled_cheque_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label">
              Upload Profile Pic. (JPEG/JPG/PNG)
            </label>
            <input
              className="form-control"
              type="file"
              id="profileImageInput"
              name="profile_img"
              accept=".jpeg,.jpg,.png"
            />
          </div>
        </div>

        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"
          }}
        >
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </form>
    </div>
  );
};
export default EditDoctorPage;

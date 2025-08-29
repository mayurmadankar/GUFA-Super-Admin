import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndivisualMedical } from "../../Components/Redux/authMedicalOnboard";

const EditMedical = () => {
  const { medical_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleMedical, error, loading } = useSelector(
    (state) => state.medicalUser
  );
  const medical = singleMedical?.data;

  const [formData, setFormData] = useState({
    enterprise_name: "",
    gst_number: "",
    address: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    district: "",
    country: "India",
    owner_fname: "",
    owner_lname: "",
    owner_mobile: "",
    owner_additional_mobile: "",
    owner_email: "",
    owner_aadhar: "",
    owner_password: "",
    pharmacist_fname: "",
    pharmacist_lname: "",
    pharmacist_email: "",
    pharmacist_license_number: "",
    pharmacist_mobile: "",
    pharmacist_additional_mobile: "",
    pharmacist_aadhar: "",
    product_id: null,
    purchase_type: null,
    gst_img: null,
    owner_aadhar_img: null,
    pharmacist_license_img: null,
    pharmacist_aadhar_img: null,
    user_type: 5
  });

  useEffect(() => {
    if (medical_id) {
      dispatch(fetchIndivisualMedical(medical_id));
    }
  }, [medical_id, dispatch]);

  useEffect(() => {
    if (medical) {
      setFormData({
        enterprise_name: medical.enterprise_name || "",
        gst_number: medical.gst_number || "",
        address: medical.address || "",
        street: medical.street || "",
        area: medical.area || "",
        city: medical.city || "",
        state: medical.state || "",
        pincode: medical.pincode || "",
        district: medical.district || "",
        country: "India",
        owner_fname: medical.owner?.first_name || "",
        owner_lname: medical.owner?.last_name || "",
        owner_mobile: medical.owner?.mobile || "",
        owner_additional_mobile: medical.owner?.additional_mobile || "",
        owner_email: medical.owner?.email || "",
        owner_aadhar: medical.owner?.aadhar_number || "",
        owner_password: "",
        pharmacist_fname: medical.pharmacist?.first_name || "",
        pharmacist_lname: medical.pharmacist?.last_name || "",
        pharmacist_email: medical.pharmacist?.email || "",
        pharmacist_license_number: medical.pharmacist?.license_number || "",
        pharmacist_mobile: medical.pharmacist?.mobile || "",
        pharmacist_additional_mobile:
          medical.pharmacist?.additional_mobile || "",
        pharmacist_aadhar: medical.pharmacist?.aadhar_number || "",
        product_id: medical.product_id || null,
        purchase_type: medical.purchase_type || null,
        gst_img: null,
        owner_aadhar_img: null,
        pharmacist_license_img: null,
        pharmacist_aadhar_img: null,
        user_type: 5
      });
    }
  }, [medical]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch update action here if needed
    alert("Medical updated successfully!");
    navigate("/medical");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Medical</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow mt-1 bg-white"
        style={{ maxWidth: 900 }}
      >
        <h5>Store Details</h5>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Medical Name</label>
            <input
              type="text"
              className="form-control"
              name="enterprise_name"
              value={formData.enterprise_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">GST Number</label>
            <input
              type="text"
              className="form-control"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Area</label>
            <input
              type="text"
              className="form-control"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">District</label>
            <input
              type="text"
              className="form-control"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              disabled
            />
          </div>
        </div>

        <h5>Owner Details</h5>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="owner_fname"
              value={formData.owner_fname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="owner_lname"
              value={formData.owner_lname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="owner_mobile"
              value={formData.owner_mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Additional Mobile</label>
            <input
              type="text"
              className="form-control"
              name="owner_additional_mobile"
              value={formData.owner_additional_mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="owner_email"
              value={formData.owner_email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              name="owner_aadhar"
              value={formData.owner_aadhar}
              onChange={handleChange}
            />
          </div>
        </div>

        <h5>Pharmacist Details</h5>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_fname"
              value={formData.pharmacist_fname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_lname"
              value={formData.pharmacist_lname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="pharmacist_email"
              value={formData.pharmacist_email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">License Number</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_license_number"
              value={formData.pharmacist_license_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_mobile"
              value={formData.pharmacist_mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Additional Mobile</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_additional_mobile"
              value={formData.pharmacist_additional_mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              name="pharmacist_aadhar"
              value={formData.pharmacist_aadhar}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/medical")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedical;

import { configureStore } from "@reduxjs/toolkit";
import authMedicalOnboard from "./authMedicalOnboard";
import authDoctorOnboard from "./authDoctorOnboard";
import authPatientList from "./authPatientList";
import versionReducer from "./authVersion";

const store = configureStore({
  reducer: {
    medicalUser: authMedicalOnboard,
    doctorUser: authDoctorOnboard,
    patientList: authPatientList,
    version: versionReducer
  }
});

export default store;

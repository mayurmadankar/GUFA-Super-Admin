import {configureStore} from "@reduxjs/toolkit"
import authMedicalOnboard from "./authMedicalOnboard"
import authDoctorOnboard from "./authDoctorOnboard";
import authPatientList from "./authPatientList";
const store=configureStore({
    reducer:{
        medicalUser:authMedicalOnboard,
        doctorUser:authDoctorOnboard,
        patientList:authPatientList
    }
})

export default store;
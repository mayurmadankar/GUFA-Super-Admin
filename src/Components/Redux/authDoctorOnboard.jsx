import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newDoctorList: null,
  approvedDoctorUser: null,
  approvedDoctors: null,
  liveDoctorList: null,
  error: null,
  loading: false
};

// For fetching new doctor list.
export const fetchNewDoctorsList = createAsyncThunk(
  "onborded_doctors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/super_admin/get_all_register_doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
      // console.log(response.data,"response.data at redux")
    } catch (error) {
      console.log("API error  while fetching new doctors list", error.response);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);
// fetch single doctor
export const fetchSingleDoctor = createAsyncThunk(
  "single_doctor",
  async (doctor_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/super_admin/get_single_doctor?doctor_id=${doctor_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log("API error while fetching single doctor", error.response);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);
// ajit
// For fetching approved doctors list
export const fetchApprovedDoctors = createAsyncThunk(
  "approved_doctors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/super_admin/doctor/get_approved_doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(response.data, "response.data at redux");
      return response.data;
    } catch (error) {
      // console.log("API error while fetching approved doctors", error.response);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);

// For fetching approved doctor user list.
export const fetchApprovedDoctor = createAsyncThunk(
  "approved_doctor",
  async (doctor_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");

      const formData = new FormData();
      formData.append("doctor_id", doctor_id);

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/super_admin/doctor/approve_doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      return response.data;
    } catch (error) {
      console.log("API error while Approving the new doctors", error.response);
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);

// For fetching live doctor list.
export const fetchLiveDoctorsList = createAsyncThunk(
  "live_doctors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/super_admin/doctor/get_doctor_instant_call_status_list`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(response.data,"response.data at redux")
      return response.data;
    } catch (error) {
      console.log(
        "API error  while fetching live doctors list",
        error.response
      );
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);

// deactivate doctors
export const deactivateDoctor = createAsyncThunk(
  "deactivate_doctor",
  async (doctor_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("doctor_id", doctor_id);

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/super_admin/doctor/deactivate_doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);

//  const formData = new FormData();
// Object.keys(credentials).forEach((key) => {
//   if (key === "consultation_fees" && Array.isArray(credentials[key])) {
//     // Append each fee separately
//     credentials[key].forEach((fee) => {
//       formData.append("consultation_fees", fee);
//     });
//   } else {
//     formData.append(key, credentials[key]);
//   }
// });

// update doctor info
export const updateDoctorInfo = createAsyncThunk(
  "update_doctor_info",
  async ({ doctor_id, credentials }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.put(
        `${
          import.meta.env.VITE_BASEURL
        }/super_admin/doctor/edit_doctor_profile?doctor_id=${doctor_id}`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message
      });
    }
  }
);

const authDoctorOnboard = createSlice({
  name: "Doctor_Onboard",
  initialState,
  reducers: {
    clearApprovedDoctorUser: (state) => {
      state.approvedDoctorUser = null;
    }
  },
  // Extrareducer used to get the data
  extraReducers: (builder) => {
    //extrareducer fetching the list on onborded medical
    builder
      .addCase(fetchNewDoctorsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewDoctorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.newDoctorList = action.payload;
        state.error = null;
      })
      .addCase(fetchNewDoctorsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDoctor = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchApprovedDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedDoctors = action.payload;
        state.error = null;
      })
      .addCase(fetchApprovedDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // approved doctor user
      .addCase(fetchApprovedDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedDoctorUser = action.payload;
        // console.log(action.payload,"success")
        state.error = null;
      })
      .addCase(fetchApprovedDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload,"error")
      })

      // live Doctor list
      .addCase(fetchLiveDoctorsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveDoctorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.liveDoctorList = action.payload;
        state.error = null;
      })
      .addCase(fetchLiveDoctorsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload,"error action.payload at redux")
      })

      .addCase(deactivateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deactivateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        // Remove from approvedDoctors
        if (state.approvedDoctors && state.approvedDoctors.doctors) {
          state.approvedDoctors = {
            ...state.approvedDoctors,
            doctors: state.approvedDoctors.doctors.filter(
              (doctor) => doctor.doctor_id !== action.payload.doctor_id
            )
          };
        }
        // Remove from newDoctorList
        if (state.newDoctorList && state.newDoctorList.doctors) {
          state.newDoctorList = {
            ...state.newDoctorList,
            doctors: state.newDoctorList.doctors.filter(
              (doctor) => doctor.doctor_id !== action.payload.doctor_id
            )
          };
        }
        state.error = null;
      })
      // .addCase(deactivateDoctor.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.approvedDoctors = {
      //     ...state.approvedDoctors,
      //     doctors: state.approvedDoctors.doctors.filter(
      //       (doctor) => doctor.doctor_id !== action.payload.doctor_id
      //     ),
      //   };
      //   state.error = null;
      // })
      .addCase(deactivateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update Doctor info
      .addCase(updateDoctorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDoctor = action.payload;
        state.error = null;
      })
      .addCase(updateDoctorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { clearApprovedDoctorUser } = authDoctorOnboard.actions;
export default authDoctorOnboard.reducer;

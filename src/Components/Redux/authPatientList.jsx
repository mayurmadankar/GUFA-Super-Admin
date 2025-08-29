import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    patientList:null,
    paymentList:null,
    addedDevice:null,// when we add new device
    getAddedDevice:null,// get added device
    howManyDevicesAdded:null,  // to know how many devices are added to that medical stores.
    loading:false,
    error:null
}
// Patient list
export const fetchPatientList=createAsyncThunk("patient_list",async(_,{rejectWithValue})=>{
    try {

        const token=localStorage.getItem("admin_token");
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/patient/get_patients`,
            {
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
            console.log("API error  while fetching the list of patients",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
});



// Payment list
export const fetchPaymentList=createAsyncThunk("payment_list",async(_,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem("admin_token");
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/payment-report`,
            {
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
            console.log("API error  while fetching the list of payments",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
})


// Add device (allot devices to the medical stores)
export const addDevices=createAsyncThunk("add_devices",async({ id, formData },{rejectWithValue})=>{
//      console.log(formData,"Form submitted at redux");
//   console.log(medical?.enterprise?.id,"medical id at redux");
    try {
        const token=localStorage.getItem("admin_token");
         const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/super_admin/add-device/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response.data,"response")
      return response.data;
    } catch (error) {
            console.log("API error  while adding the device to the medical stores",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.error
            })
    }
});


// Payment list
export const fetchPaymentLit=createAsyncThunk("payment_list",async(_,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem("admin_token");
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/payment-report`,
            {
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
            console.log("API error  while fetching the list of payments",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
});

// Fetch how many devices are added to that perticular medical store.
export const fetchHowManyDevicesAreAdded=createAsyncThunk("how_many_added_device",async(id,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem("admin_token");
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/enterprises/${id}/consultation-devices`,
            {
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
            console.log("API error  while fetching how many devices are added",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
});



// Fetch added device
export const fetchAddedDevice=createAsyncThunk("added_device",async(serial_no,id,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem("admin_token");
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/consultations/device/${serial_no}?enterprise_id=${id}`,
            {
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
            console.log("API error  while fetching the list of payments",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
});





const authPatient=createSlice({
  name: 'patientList',
  initialState,
  reducers: {

    clearAllotedDevice:(state)=>{
        state.addedDevice=null;
    }
  },
  //extra reducer 
  extraReducers:(builder)=>{
    builder
    .addCase(fetchPatientList.pending,(state)=>{
        state.loading=true;
        state.error=null
    })

       .addCase(fetchPatientList.fulfilled,(state,action)=>{
        state.loading=false;
        state.patientList=action.payload;
        state.error=null;
    })

       .addCase(fetchPatientList.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



      .addCase(fetchPaymentList.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
       .addCase(fetchPaymentList.fulfilled,(state,action)=>{
        state.loading=false;
        state.paymentList=action.payload;
        state.error=null;
    })
       .addCase(fetchPaymentList.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


        .addCase(addDevices.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
       .addCase(addDevices.fulfilled,(state,action)=>{
        state.loading=false;
        state.addedDevice=action.payload;
        state.error=null;
    })
       .addCase(addDevices.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })



// how many devices are added
       .addCase(fetchHowManyDevicesAreAdded.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
       .addCase(fetchHowManyDevicesAreAdded.fulfilled,(state,action)=>{
        state.loading=false;
        state.howManyDevicesAdded=action.payload;
        state.error=null;
    })
       .addCase(fetchHowManyDevicesAreAdded.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


        .addCase(fetchAddedDevice.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
       .addCase(fetchAddedDevice.fulfilled,(state,action)=>{
        state.loading=false;
        state.getAddedDevice=action.payload;
        state.error=null;
    })
       .addCase(fetchAddedDevice.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })
  }
})

export const { clearAllotedDevice } = authPatient.actions;
export default authPatient.reducer;
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
let initialState={
    user:"",
    token:localStorage.getItem('admin_token') || null,
    error:null,
    loading:false,
  };

  // For LOGIN
export const loginUser=createAsyncThunk("SuperAdmin/login",async(credentials,{rejectWithValue})=>{
    try {
      // Submitted form data is required in object form so formData storing object form. 
      const formData = new FormData();
      Object.keys(credentials).forEach(key=>{
        formData.append(key,credentials[key])
      });
        const response=await axios.post(`${import.meta.env.VITE_BASEURL}/user/login`,formData);
        return  response;
    } catch (error) {
          console.log("API error.response while login",error.response)
            return rejectWithValue({
              status:error?.response?.status,
              message:error?.response?.data?.message,
            })
    }
    });
    //Till now we fetched the data but how to send these data to the store. by using extraReducers:(builder)

const authLogin=createSlice({
    name:"login",
    initialState,
    reducers:{

    },
      // Extrareducer used to get the data 
      extraReducers:(builder)=>{
     // Lgon user extra reducers
     builder
     .addCase(loginUser.pending, (state) => {
       state.loading = true;
       state.error=null;
     })
     .addCase(loginUser.fulfilled, (state, action) => {
       state.loading = false;
       state.user = action.payload;
       state.error=null;
     })
     .addCase(loginUser.rejected, (state, action) => {
       state.loading = false;
       state.error=action.payload;
     });
     }
})

export default authLogin.reducer;
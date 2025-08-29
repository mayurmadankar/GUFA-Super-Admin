import  {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
const  initialState={
    onbordedMedicalList:null,
    singleMedical:null,
    error:null,
    loading:false,
}

  // For fetching the list of onborded medical
  export const fetchListOfOnbordedMedical=createAsyncThunk("onborded_medical",async(_,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem('admin_token');
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/get_all_enter`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        return  response.data;
    } catch (error) {
          console.log("API error  while fetching the list of onborded medicals",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
    });
    //Till now we fetched the data but how to send these data to the store. by using extraReducers:(builder)



      // For fetching the indivisual medical detail
  export const fetchIndivisualMedical=createAsyncThunk("single_medical",async(medical_id,{rejectWithValue})=>{
    try {
        const token=localStorage.getItem('admin_token');
        const response=await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/enterprise/${medical_id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        return  response.data;
    } catch (error) {
          console.log("API error  while fetching indivisual medical details",error.response)
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message
            })
    }
    });
const authMedicalOnboard=createSlice({
    name:"medical_onboard",
    initialState,
    reducers:{

    },

    // Extrareducer used to get the data 
          extraReducers:(builder)=>{
         //extrareducer fetching the list on onborded medical 
         builder
         .addCase(fetchListOfOnbordedMedical.pending, (state) => {
           state.loading = true;
           state.error=null;
         })
         .addCase(fetchListOfOnbordedMedical.fulfilled, (state, action) => {
           state.loading = false;
           state.onbordedMedicalList = action.payload;
           state.error=null;
         })
         .addCase(fetchListOfOnbordedMedical.rejected, (state, action) => {
           state.loading = false;
           state.error=action.payload; 
         })


           .addCase(fetchIndivisualMedical.pending, (state) => {
           state.loading = true;
           state.error=null;
         })
         .addCase(fetchIndivisualMedical.fulfilled, (state, action) => {
           state.loading = false;
           state.singleMedical = action.payload;
           state.error=null;
         })
         .addCase(fetchIndivisualMedical.rejected, (state, action) => {
           state.loading = false;
           state.error=action.payload; 
         });
         }

})

export default authMedicalOnboard.reducer;
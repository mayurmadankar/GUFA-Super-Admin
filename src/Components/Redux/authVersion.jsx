import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadVersion = createAsyncThunk(
  "version/uploadVersion",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Uploading version Thunk called...");
      // const response = await axios.post(
      //   "https://jsonplaceholder.typicode.com/posts",
      //   formData
      // );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      let platform, version, fileName;
      if (formData.get) {
        platform = formData.get("platform");
        version = formData.get("version");
        const file = formData.get("file");
        fileName = file && file.name ? file.name : "";
      } else {
        platform = formData.platform;
        version = formData.version;
        fileName =
          formData.file && formData.file.name ? formData.file.name : "";
      }
      // console.log(response.data);
      return {
        platform,
        version,
        fileName,
        date: new Date().toISOString()
      };
    } catch (err) {
      console.error("Upload failed:", err);
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

//new debounce validation createAsyncThubk
export const validateVersion = createAsyncThunk(
  "version/validateVersion",
  async ({ version, platform }, { rejectWithValue }) => {
    try {
      // Make actual API call to validate version
      // const response = await axios.get(
      //   `https://your-api-domain.com/api/versions/validate`, // Replace with your actual API endpoint
      //   {
      //     params: {
      //       version,
      //       platform
      //     },
      //     headers: {
      //       'Authorization': `Bearer ${token}`, // Include auth token if required
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );
      await new Promise((resolve) => setTimeout(resolve, 300));

      const existingVersions = {
        doctor: ["1.0.0", "1.0.1", "2.0.0", "2.1.0"],
        patient: ["1.0.0", "1.5.0", "2.0.0", "3.0.0"]
      };
      const exists = existingVersions[platform]?.includes(version);

      return {
        version,
        platform,
        isValid: !exists,
        message: exists
          ? `Version ${version} already exists for ${platform}`
          : `Version ${version} is available`
      };
    } catch (err) {
      console.error("Validation failed:", err);
      return rejectWithValue(
        err.response?.data?.message || "Validation failed"
      );
    }
  }
);

const versionSlice = createSlice({
  name: "version",
  initialState: {
    versions: [],
    loading: false,
    validating: false,
    error: null,
    validationResult: null
  },
  reducers: {
    clearValidation: (state) => {
      state.validationResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVersion.fulfilled, (state, action) => {
        state.versions.unshift(action.payload);
        state.loading = false;
      })
      .addCase(uploadVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateVersion.pending, (state) => {
        state.validating = true;
        state.validationResult = null;
      })
      .addCase(validateVersion.fulfilled, (state, action) => {
        state.validating = false;
        state.validationResult = action.payload;
      })
      .addCase(validateVersion.rejected, (state, action) => {
        state.validating = false;
        state.error = action.payload;
      });
  }
});

export const { clearValidation } = versionSlice.actions;
export default versionSlice.reducer;

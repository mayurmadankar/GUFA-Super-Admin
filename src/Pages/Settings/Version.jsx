import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadVersion,
  validateVersion
} from "../../Components/Redux/authVersion";
import "./VersionUpload.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounceRef } from "./debounce";

const VersionUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [platform, setPlatform] = useState("");
  const [version, setVersion] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { versions, loading, error, validating, validationResult } =
    useSelector((state) => state.version);

  const debouncedValidateVersion = useDebounceRef(
    (versionValue, platformValue) => {
      // console.log(
      //   "✅ Debounced function called after 5 seconds:",
      //   versionValue,
      //   platformValue
      // );
      if (versionValue && platformValue) {
        dispatch(
          validateVersion({ version: versionValue, platform: platformValue })
        );
      }
    },
    500
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVersionChange = (e) => {
    const versionValue = e.target.value;
    setVersion(versionValue);
    debouncedValidateVersion(versionValue, platform);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if version validation failed
    if (validationResult && !validationResult.isValid) {
      toast.error(validationResult.message);
      return;
    }

    if (platform && version && file) {
      const formData = new FormData();
      formData.append("platform", platform);
      formData.append("version", version);
      formData.append("file", file);
      const result = await dispatch(uploadVersion(formData));
      if (result.type === "version/uploadVersion/fulfilled") {
        toast.success("Version uploaded successfully!");
        setShowForm(false);
        setPlatform("");
        setVersion("");
        setFile(null);
      } else if (result.type === "version/uploadVersion/rejected") {
        toast.error(error || "Upload failed");
      }
    }
  };

  return (
    <div className="version-container">
      <div className="left-panel">
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          Add Version
        </button>
        {loading && <div className="info-msg">Uploading...</div>}
        {showForm && (
          <form className="version-form" onSubmit={handleSubmit}>
            <div className="version-form-radio-group">
              <label className="version-form-radio-label">
                <input
                  type="radio"
                  name="platform"
                  value="doctor"
                  checked={platform === "doctor"}
                  onChange={() => setPlatform("doctor")}
                />
                <strong>Doctor App</strong>
              </label>
              <label className="version-form-radio-label">
                <input
                  type="radio"
                  name="platform"
                  value="patient"
                  checked={platform === "patient"}
                  onChange={() => setPlatform("patient")}
                />
                <strong>Patient App</strong>
              </label>
            </div>

            {platform && (
              <>
                <input
                  type="text"
                  placeholder={`Enter the ${platform} version (e.g. 1.0.0)`}
                  value={version}
                  onChange={handleVersionChange}
                  required
                />

                {validating && (
                  <div className="info-msg">Validating version...</div>
                )}
                {validationResult && (
                  <div
                    className={
                      validationResult.isValid ? "success-msg" : "error-msg"
                    }
                  >
                    {validationResult.message}
                  </div>
                )}

                <div className="apk-upload-wrapper">
                  <label htmlFor="apk-upload " className="">
                    <strong>Upload APK</strong>
                  </label>
                  <input
                    type="file"
                    id="apk-upload"
                    name="apk"
                    accept=".apk"
                    // style={{ display: "none" }}
                    onChange={handleFileChange}
                    required
                  />
                  {/* {file && <span className="file-name">{file.name}</span>} */}
                </div>
              </>
            )}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        )}
      </div>
      <div className="right-panel">
        <h5>Version History</h5>
        <ul>
          {versions
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((v, idx) => (
              <li key={idx} className="version-item">
                <strong>
                  {v.platform ? v.platform.toUpperCase() : "UNKNOWN"} :
                </strong>{" "}
                {v.version && (
                  <span className="version-value">v{v.version}</span>
                )}
                {v.fileName && (
                  <span className="file-name"> &nbsp;({v.fileName})</span>
                )}
                <span className="date">
                  {v.date ? new Date(v.date).toLocaleString() : ""}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default VersionUpload;

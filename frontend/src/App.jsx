import React, { useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:8000/api/image/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log(`Upload Progress: ${progress}%`);
        },
      })
      .then((response) => {
        console.log("Upload successful. Server response:", response.data);
        // You can handle the success response here, such as updating the UI
      })
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error("Server error:", error.response.data.message);
          // You can handle the specific server error here
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response from the server");
          // You can handle this scenario, perhaps by informing the user
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
          // You can handle unexpected errors here
        }
      });
  };

  return (
    <>
      <div>
        <div className="imgdiv">
          <label htmlFor="img">Image Here</label>
          <input
            type="file"
            name="image"
            id="img"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <br />
        {file ? (
          <img
            width={100}
            height={100}
            src={URL.createObjectURL(file)}
            alt="Uploaded"
          />
        ) : null}
      </div>
    </>
  );
};

export default App;

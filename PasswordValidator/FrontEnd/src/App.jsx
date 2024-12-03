import React, { useState } from "react";
import "./App.css";
import Validate from "./validate.jsx";

function App() {
  const [password, setPassword] = useState("");
  const { handlePasswordValidation, errorMessage } = Validate();

  const handleChange = (e) => {
    setPassword(e.target.value);
    handlePasswordValidation(e.target.value); // Call validation on change
  };

  return (
    <div style={{ marginLeft: "200px" }}>
      <h2>Checking Password Strength in ReactJS</h2>
      <span>Enter Password: </span>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <br />
      {errorMessage && (
        <span style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</span>
      )}
    </div>
  );
}

export default App;

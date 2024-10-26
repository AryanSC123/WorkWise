// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Firebase/firebaseFunctions"; // Import your login function
import { MuiInput } from "../../MuiTemplates/MuiInput";
import MuiButton from "../../MuiTemplates/MuiButton";

const Login = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password); // Call the login function
      console.log("Logged in user:", user);
      // Optionally dispatch an action to update your Redux store
      // dispatch(yourAction(user));
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message); // Set error message to display
    }
  };

  const containerStyle = {
    width: "40%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    maxWidth: "400px",
  };

  const inputStyle = {
    marginBottom: "10px",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <MuiInput
        placeholder="Email"
        variant="outlined"
        style={inputStyle}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MuiInput
        placeholder="Password"
        variant="outlined"
        style={inputStyle}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MuiButton label="Log In" onClick={handleLogin} />
      <p>
        <span
          style={{ cursor: "pointer", color: "#323232" }}
          onClick={toggleForm}
        >
          Already a member? Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;

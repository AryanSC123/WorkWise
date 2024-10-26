import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MuiInput } from "../../MuiTemplates/MuiInput";
import MuiButton from "../../MuiTemplates/MuiButton";
import { signUpUser } from "../../Firebase/firebaseFunctions";

const SignUp = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      await signUpUser(email, password, dispatch); // Pass dispatch to the signUpUser function
      console.log("User signed up successfully!");
      // Optionally redirect or perform further actions
    } catch (error) {
      setError(error.message); // Handle errors
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    width: "40%",
    height: "40%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MuiInput
        placeholder="Email"
        variant="outlined"
        style={inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MuiInput
        placeholder="Password"
        variant="outlined"
        style={inputStyle}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MuiButton
        label={loading ? "Signing Up..." : "Sign Up"}
        onClick={handleSignUp}
        disabled={loading}
      />
      <p>
        <span
          style={{ cursor: "pointer", color: "#323232" }}
          onClick={toggleForm}
        >
          Already a member? Log In
        </span>
      </p>
    </div>
  );
};

export default SignUp;

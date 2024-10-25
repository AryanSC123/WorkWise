// components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    const user = { username }; // Example user object
    dispatch(login(user));
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

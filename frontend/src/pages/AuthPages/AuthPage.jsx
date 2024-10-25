import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const fullPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  return (
    <div style={fullPageStyle}>
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <SignUp toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;

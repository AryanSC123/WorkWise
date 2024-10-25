// src/App.js
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinOrCreateTeam from "./pages/JoinOrCreateTeam/JoinOrCreateTeam";
import HomePageWithoutLogin from "./pages/HomePageWithoutLogin";
import HomePageWithLogin from "./pages/HomePageWithLogin";
import AuthPage from "./pages/AuthPages/AuthPage";
import { useAuthListener } from "./Firebase/firebaseFunctions"; // Import your custom hook
import VideoCall from "./Components/VideoCall";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(useSelector((state) => state.auth));
  useAuthListener(); // Set up the auth listener

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageWithLogin />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/createOrJoinTeam" element={<JoinOrCreateTeam />} />
        <Route path="/videoCall/:teamId" element={<VideoCall />} />
        {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
    </BrowserRouter>
  );
}

function Dashboard() {
  return <div>Welcome to the Dashboard!</div>;
}

export default App;

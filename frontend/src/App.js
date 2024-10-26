import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinOrCreateTeam from "./pages/JoinOrCreateTeam/JoinOrCreateTeam";
import HomePageWithoutLogin from "./pages/HomePageWithoutLogin";
import HomePageWithLogin from "./pages/HomePageWithLogin";
import AuthPage from "./pages/AuthPages/AuthPage";
import { useAuthListener } from "./Firebase/firebaseFunctions"; // Import your custom hook
import VideoCall from "./Components/VideoCall";
import TeamDetails from "./pages/TeamDetails";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(useSelector((state) => state.auth));
  useAuthListener(); // Set up the auth listener

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePageWithLogin /> : <HomePageWithoutLogin />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/createOrJoinTeam"
          element={
            isAuthenticated ? <JoinOrCreateTeam /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/videoCall/:teamId"
          element={isAuthenticated ? <VideoCall /> : <Navigate to="/login" />}
        />
        <Route
          path="/teamDetails/:teamId"
          element={isAuthenticated ? <TeamDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function Dashboard() {
  return <div>Welcome to the Dashboard!</div>;
}

export default App;

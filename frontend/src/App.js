import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageWithLogin from "./pages/HomePageWithLogin";
import JoinOrCreateTeam from "./pages/JoinOrCreateTeam/JoinOrCreateTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageWithLogin />} />
        <Route path="/createOrJoinTeam" element={<JoinOrCreateTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

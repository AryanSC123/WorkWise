import { useNavigate } from "react-router-dom";
import MuiButton from "../MuiTemplates/MuiButton";

export default function HomePageWithLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="Header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px", // Optional: Add some padding if desired
        }}
      >
        <div>Teams</div>
        <MuiButton
          onClick={() => navigate("/createOrJoinTeam")}
          label="Join or create team" // Pass the label prop here
        />
      </div>
    </div>
  );
}

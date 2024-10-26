import { useState } from "react";
import MuiButton from "../../MuiTemplates/MuiButton";
import { MuiInput } from "../../MuiTemplates/MuiInput";
import { IconButton } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd"; // Icon for Create Team
import GroupIcon from "@mui/icons-material/Group"; // Icon for Join Team
import { createTeam, joinTeam } from "../../Firebase/firebaseFunctions"; // Import joinTeam
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function JoinOrCreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user object from Redux state
  const userId = user ? user.uid : null; // Safely access uid
  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    try {
      const teamId = await createTeam(teamName, userId); // Pass userId to createTeam
      console.log("Team created with ID:", teamId);
      // Optionally handle further actions after team creation
      setTeamName(""); // Clear the input field
    } catch (error) {
      setError(error.message); // Set error message for display
      console.error(error.message);
    }
  };

  const handleJoinTeam = async (teamId) => {
    await joinTeam(teamCode, userId);
    navigate(`/videoCall/${teamId}`, { state: { userId: userId } });
  };

  console.log(teamCode);

  return (
    <div>
      <div
        className="Header"
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px 40px",
        }}
      >
        {/* Box for creating a team */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
            flex: 1,
            maxWidth: "20%",
          }}
        >
          <IconButton
            style={{ display: "block", margin: "0 auto", fontSize: "40px" }}
          >
            <GroupAddIcon />
          </IconButton>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display error message */}
          <MuiInput
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "10px",
            }}
          />
          <MuiButton
            label="Create Team"
            onClick={handleCreateTeam} // Call handleCreateTeam
          />
        </div>

        {/* Box for joining a team */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
            flex: 1,
            maxWidth: "20%",
          }}
        >
          <IconButton
            style={{ display: "block", margin: "0 auto", fontSize: "40px" }}
          >
            <GroupIcon />
          </IconButton>
          <MuiInput
            placeholder="Enter Team UID"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "10px",
            }}
          />
          <MuiButton
            label="Join Team"
            onClick={() => handleJoinTeam({ teamCode })}
          />
        </div>
      </div>
    </div>
  );
}

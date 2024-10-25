import { useState } from "react";
import MuiButton from "../../MuiTemplates/MuiButton";
import JoinTeam from "./JoinTeam";
import CreateTeam from "./CreateTeam";
import { MuiInput } from "../../MuiTemplates/MuiInput";
import { IconButton } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd"; // Icon for Create Team
import GroupIcon from "@mui/icons-material/Group"; // Icon for Join Team

export default function JoinOrCreateTeam() {
  const [joinTeamBool, setJoinTeamBool] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [teamName, setTeamName] = useState("");

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
            maxWidth: "20%", // Limit width to 40% of the screen
          }}
        >
          <IconButton
            style={{ display: "block", margin: "0 auto", fontSize: "40px" }}
          >
            <GroupAddIcon />
          </IconButton>
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
            onClick={() => setJoinTeamBool(false)}
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
            maxWidth: "20%", // Limit width to 40% of the screen
          }}
        >
          <IconButton
            style={{ display: "block", margin: "0 auto", fontSize: "40px" }}
          >
            <GroupIcon />
          </IconButton>
          <MuiInput
            placeholder="Enter Team Code"
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
            onClick={() => {
              // Handle join team logic here, e.g., validate teamCode
              console.log(`Joining team with code: ${teamCode}`);
              setJoinTeamBool(true);
            }}
          />
        </div>
      </div>

      {/* {joinTeamBool ? <JoinTeam /> : <CreateTeam />} */}
    </div>
  );
}

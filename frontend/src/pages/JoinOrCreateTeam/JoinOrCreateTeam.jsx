import { useState } from "react";
import MuiButton from "../../MuiTemplates/MuiButton";
import JoinTeam from "./JoinTeam";
import CreateTeam from "./CreateTeam";

export default function JoinOrCreateTeam() {
  const [joinTeamBool, setJoinTeamBool] = useState(false);

  return (
    <div>
      <div
        className="Header"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          padding: "20px 40px",
        }}
      >
        <MuiButton label="Create Team" onClick={() => setJoinTeamBool(false)} />
        <MuiButton label="Join Team" onClick={() => setJoinTeamBool(true)} />
      </div>

      {joinTeamBool ? <JoinTeam /> : <CreateTeam />}
    </div>
  );
}

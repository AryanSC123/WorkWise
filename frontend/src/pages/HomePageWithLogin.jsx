import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MuiButton from "../MuiTemplates/MuiButton";
import { useNavigate } from "react-router-dom";
import { fetchUserTeams } from "../Firebase/firebaseFunctions";

export default function HomePageWithLogin() {
  const [teams, setTeams] = useState([]);
  const user = useSelector((state) => state.auth.user); // Get the user from Redux state
  const userId = user ? user.uid : null; // Safely access UID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      if (userId) {
        try {
          const fetchedTeams = await fetchUserTeams(userId); // Call the function from firebaseFunctions
          setTeams(fetchedTeams);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchTeams();
  }, [userId]);

  return (
    <div>
      <div
        className="Header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
        }}
      >
        <div>Teams</div>
        <MuiButton
          onClick={() => navigate("/createOrJoinTeam")}
          label="Join or create team"
        />
      </div>
      <div>
        <h2>Your Teams</h2>
        {teams.length > 0 ? (
          <ul>
            {teams.map((team) => (
              <li
                key={team.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{team.name}</span>
                <MuiButton
                  label="Start Video Call"
                  onClick={() =>
                    navigate(`/videoCall/${team.id}`, { state: { userId } })
                  } // Navigate to video call with team ID
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No teams found. Join or create a team!</p>
        )}
      </div>
    </div>
  );
}

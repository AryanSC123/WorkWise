import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MuiButton from "../MuiTemplates/MuiButton";
import { useNavigate } from "react-router-dom";
import { fetchUserTeams, logoutUser } from "../Firebase/firebaseFunctions";
import { CardContent, Typography } from "@mui/material";
import JoinOrCreateTeam from "./JoinOrCreateTeam/JoinOrCreateTeam";

export default function HomePageWithLogin() {
  const [teams, setTeams] = useState([]);
  const [showJoinOrCreate, setShowJoinOrCreate] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.uid : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      if (userId) {
        try {
          const fetchedTeams = await fetchUserTeams(userId);
          setTeams(fetchedTeams);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchTeams();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleShowJoinOrCreate = () => {
    setShowJoinOrCreate(true);
  };

  const handleShowTeams = () => {
    setShowJoinOrCreate(false);
  };

  return (
    <div>
      <div style={styles.logoutContainer}>
        <MuiButton onClick={handleLogout} label="Logout" />
      </div>
      <div className="Header" style={styles.header}>
        <MuiButton onClick={handleShowTeams} label="Teams" />
        <MuiButton
          onClick={handleShowJoinOrCreate}
          label="Join or create team"
        />
      </div>
      <div>
        {showJoinOrCreate ? (
          <JoinOrCreateTeam /> // Render JoinOrCreateTeam component
        ) : (
          <div style={{ padding: "20px 40px" }}>
            <h2>Your Teams</h2>
            {teams.length > 0 ? (
              <div style={styles.cardContainer}>
                {teams.map((team) => (
                  <div
                    key={team.id}
                    style={styles.card}
                    onClick={() => navigate(`/teamDetails/${team.id}`)}
                  >
                    <CardContent style={styles.cardContent}>
                      <div style={styles.iconContainer}>
                        <span style={styles.icon}>👥</span>
                      </div>
                      <div style={styles.textContainer}>
                        <Typography variant="h6">{team.name}</Typography>
                      </div>
                    </CardContent>
                  </div>
                ))}
              </div>
            ) : (
              <p>No teams found. Join or create a team!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  logoutContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 40px",
  },
  header: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    padding: "20px 40px",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    // alignItems: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    border: "1px solid #ccc",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    marginRight: "16px",
  },
  icon: {
    fontSize: "40px",
  },
  textContainer: {
    flexGrow: 1,
  },
};

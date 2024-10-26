import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamDetails } from "../Firebase/firebaseFunctions"; // Adjust the import as necessary
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

const TeamDetails = () => {
  const { teamId } = useParams(); // Get the team ID from the URL
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeamDetails = async () => {
      try {
        const teamData = await fetchTeamDetails(teamId); // Fetch team details
        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching team details:", error);
      } finally {
        setLoading(false);
      }
    };

    getTeamDetails();
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!team) {
    return <div>Team not found.</div>; // Handle case when team is not found
  }

  console.log(team);

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <h2>{team.name}</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <h4>Admin:</h4> {team.admin}
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <h4>Team Code:</h4> {team.id}
          </div>
          <List>
            <h4>Members:</h4>
            {team.members && team.members.length > 0 ? (
              team.members.map((member, index) => <div>{member}</div>)
            ) : (
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                No members found.
              </div>
            )}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full height
    padding: "20px",
  },
  card: {
    maxWidth: "400px", // Limit card width
    width: "100%", // Full width up to max width
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default TeamDetails;

import React, { useEffect, useState, useRef } from "react";
import { fetchTeamDetails } from "../Firebase/firebaseFunctions";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import socket.io
import Peer from "simple-peer"; // Import simple-peer

const VideoCall = () => {
  const { teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);
  const localVideoRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.uid : null;
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState([]); // To manage peer connections
  const socketRef = useRef(); // Ref for socket

  // Fetch team details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchTeamDetails(teamId);
        setTeamDetails(details);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchDetails();
  }, [teamId]);

  // Get media access
  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getMedia();
  }, []);

  // Socket connection for signaling
  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    socketRef.current.on("connect", () => {
      console.log("Connected to the Socket.io server");
    });

    socketRef.current.on("signal", (data) => {
      console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
      console.log("Received signal from:", data.from); // Log who sent the signal
      const peer = new Peer({ initiator: false, stream });
      peer.signal(data.signal);
      setPeers((prev) => [...prev, peer]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [stream]);

  if (!teamDetails) {
    return <Typography variant="body1">Loading team details...</Typography>;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6} sm={5} md={3}>
        <div style={styles.square}>
          <video ref={localVideoRef} autoPlay muted style={styles.video} />
          <Typography variant="h6">
            {teamDetails.admin === userId ? "You" : teamDetails.admin}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

const styles = {
  square: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "200px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default VideoCall;

import React, { useEffect, useRef } from "react";

const VideoCall = () => {
  const localVideoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getMedia();
  }, []);

  return (
    <div style={styles.container}>
      <video ref={localVideoRef} autoPlay muted style={styles.localVideo} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  localVideo: {
    width: "300px",
    height: "200px",
    marginBottom: "10px",
    border: "1px solid #ccc",
  },
};

export default VideoCall;

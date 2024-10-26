import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import { fetchUserById, fetchUsers } from "../Firebase/firebaseFunctions";
import Messages from "./Messages";

const socket = socketIO.connect("http://localhost:4000");

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [firends, setFriends] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.uid : null;

  useEffect(() => {
    async function fetchUsersFunction() {
      let temp = await fetchUsers();
      setAllUsers(temp);
    }

    async function fetchFriendsFunction() {
      let temp = await fetchUserById(userId);
      console.log(temp);
    }

    fetchUsersFunction();
    fetchFriendsFunction();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", {
        userId: userId,
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <h2>Chat Room</h2>
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", padding: "20px 0px" }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <button
              type="submit"
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Send
            </button>
          </form>
          <div style={{ width: "30%" }}>
            {allUsers.map((item, i) => {
              return <div>{item.uid}</div>;
            })}
          </div>
        </div>
        <div style={{ width: "70%" }}>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Messages socket={socket} />
          </div>
          <form
            style={{
              display: "flex",
              padding: "10px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ccc",
            }}
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

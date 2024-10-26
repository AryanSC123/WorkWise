import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.uid : null;

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);
  console.log(messages);

  return (
    <div>
      <div>
        {messages.map((item, i) => {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent:
                  userId === item.userId ? "flex-end" : "flex-start",
              }}
            >
              {userId === item.userId
                ? ` ${item.text} :${item.userId}`
                : `${item.userId}: ${item.text}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;

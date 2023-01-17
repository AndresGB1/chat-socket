import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody =({messages, socket, users, setUsers}) => {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("userName");

    const leaveChat = () => {
        const userName = localStorage.getItem("userName");
        setUsers(users.filter(user => user.userName !== userName))
        localStorage.removeItem("userName");
        socket.emit("removeUser",socket.id);
        navigate('/');
        window.location.reload();
    };

    return (
      <>
        <div className="chat-box">
          <header className="chat-header">
            <span>Socket IO chat</span>
            <button className="signOutBtn" onClick={leaveChat}>
              Sign out
            </button>
          </header>
          {messages.map((message) => (
            <div className="chat-messages">
              <p>{message.userName}: {message.message}</p>
            </div>
          ))}
          {users.map((user) =>
            user.typing && user.userName !== currentUser ? (
              <p style={{ color: "gray", fontSize: "12px" }}>
                {user.userName} is typing...
              </p>
            ) : null
          )}
        </div>
      </>
    );
}
 export default ChatBody
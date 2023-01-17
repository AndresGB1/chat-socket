import React, { useEffect, useState } from "react";

const ChatSideBar = ({socket, users, setUsers}) => {
    
    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    },[socket, users]);
    return (
        <div>
            <h3>Users</h3>
            {users.map((user) => (
                user.userName === localStorage.getItem("userName") ? (
                    <p style={{color: "red"}}>you  {user.userName} </p>
                ) : (
                    <p>{user.userName}</p>
                )
            ))}
        </div>
    )
}
export default ChatSideBar
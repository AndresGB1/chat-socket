import React, { useCallback, useEffect, useState } from "react";

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState("");
    useEffect(()=>{
        socket.on("messageResponse", data => console.log("this is the message from server: ", data))
    },[message,socket])

    const handleTyping = (e) => {
      socket.emit("typing", {
        typing: e?.target.value.length > 0,
        userName: localStorage.getItem("userName"),
      });
    };

    const typingHandler = useCallback(handleTyping, [socket]); // useCallback is used to prevent the function from being recreated on every render

const handleSendMessage = useCallback((e) => {
        e.preventDefault();
   
        if(message.trim()){
            socket.emit("message",{
                message: message,
                userName: localStorage.getItem("userName"),
                id: `${socket.id}`,
                socketId: socket.id
            });
            setMessage("");
        }
       
    },[message,socket])
    
    return (
        <div>
            <form onSubmit={handleSendMessage}>
                <input
                className="message-input"  
                type="text" 
                placeholder="Write your message" 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                onKeyUp={typingHandler} // onKeyUo signifies that the event will be triggered when the key is released
                />
                <button>Send</button>
            </form>
        </div>
    )
}

export default ChatFooter
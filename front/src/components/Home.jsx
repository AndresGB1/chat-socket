import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({socket}) => {
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userName",userName);
        socket.emit("newUser",{userName,socketID: socket.id});
        navigate('/chat')
    }

    // useEffect(()=>{
    //     //send message to server
    //     socket.emit("helloFromClient", "this is the message from client")
        
    //     socket.on("helloFromServer",(...args) =>{
    //         setUserName(args);
    //     });
    // },[socket]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign in to chat</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />    
            <button>Sign in</button>
        </form>
    )
}

export default Home
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { io } from "socket.io-client";
const socket = io("https://group-chat-app-wbxu.onrender.com");


const App = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [takeuserName, setTakeUserName] = useState(false)
  const [username, setuserName] = useState("")

  useEffect(() => {
    setTakeUserName(true)
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg])
    })
    socket.on("user-connected", (socketid) => {
      console.log("Anyone connected", socketid)
    })

    socket.on("user-joined", (user) => {
      const joinedUser = `${user} joined us`
      //console.log(user," joined us")
      setMessages((prev) => [...prev, joinedUser])
    })
  }, [])

  function sendMessage() {
    socket.emit("send-message", {
      message,
      username
    }
    )
    setMessage("")
    console.log(message);
  }

  function saveuserName() {
    socket.emit("user-connected", username)
    setTakeUserName(false)
  }
  return (
    <>
      <div>Chat App</div>
      {
        takeuserName ? (
          <div style={{ width: "100%", height: "100%" }}>
            <h2>Enter username to join chat you can't text without entering username</h2>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setuserName(e.target.value)}
              value={username}
            />

            <button onClick={saveuserName}>Save</button>
          </div>
        ) : null
      }
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {typeof msg === "string"
              ? msg
              : `${msg.username}: ${msg.message}`}
          </p>
        ))}
      </div>
      <div>

      </div>
      <div >
        <input type="text" placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)} disabled={takeuserName ? true : false} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>



  )
}

export default App
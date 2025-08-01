import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setNewChat(false);
        setLoading(true);
        console.log("message", prompt, "ThreadId", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res.reply);
            setReply(res.reply);

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    // append new chat to prev chat
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt,
                }, {
                    role: "assistant",
                    content: reply,
                }]
            ))
        }

        setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span><i className="fa-solid fa-user userIcon"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
                    
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</div>
                </div>
            }
            <Chat></Chat>

            <RingLoader color="#fff" loading = {loading}></RingLoader>
            <br /><br /><br /><br />
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value = {prompt}
                        onChange = {(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter"?getReply() : ""}>
                        
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. see Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;
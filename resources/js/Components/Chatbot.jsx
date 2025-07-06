import React, { useState, useRef, useEffect } from 'react';
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from '@/Pages/companyInfo';
import "../../../resources/css/chatbot.css";


const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            hideInChat: true,
            role: "model",
            text: companyInfo
        },
    ]);

    const [showChatbot, setShowChatBot] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false); // <-- tambahan state untuk maximize
    const chatBodyRef = useRef(null);

    useEffect(() => {
        chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
    }, [chatHistory]);

    const generateBotResponse = async (history) => {
        const formattedHistory = history.map(({ role, text }) => ({
            role,
            parts: [{ text }],
        }));

        const requestBody = { contents: formattedHistory };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "API Error!");

            const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I don't understand.";

            setChatHistory((history) => {
                const updatedHistory = [...history];
                const thinkingIndex = updatedHistory.findLastIndex(chat => chat.isLoading);
                if (thinkingIndex !== -1) {
                    updatedHistory[thinkingIndex] = { role: "model", text: botResponse };
                }
                return updatedHistory;
            });

        } catch (error) {
            console.error("Error fetching AI response:", error);
            setChatHistory((history) => {
                const updatedHistory = [...history];
                const thinkingIndex = updatedHistory.findLastIndex(chat => chat.isLoading);
                if (thinkingIndex !== -1) {
                    updatedHistory[thinkingIndex] = {
                        role: "model",
                        text: "API Key is not valid. Please pass a valid API Key.",
                        isError: true
                    };
                }
                return updatedHistory;
            });
        }
    };

    return (
        <>

            <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
                <button onClick={() => setShowChatBot(prev => !prev)} id="chatbot-toggler">
                    <span className = "material-symbols-rounded" > mode_comment </span>
                    <span className="material-symbols-rounded">close</span>
                </button>

                <div className={`chatbot-popup ${isMaximized ? "maximize" : ""}`}>
                    <div className="chat-header">
                        <div className="header-info">
                            <ChatbotIcon />
                            <h2 className="logo-text">Healthify Chatbot</h2>
                        </div>

                        <div className="header-actions">
                            {/* Tombol maximize/minimize */}
                            <button
                                onClick={() => setIsMaximized(prev => !prev)}
                                className="material-symbols-rounded maximize-btn"
                                title={isMaximized ? "Minimize" : "Maximize"}
                            >
                                {isMaximized ? "fullscreen_exit" : "fullscreen"}
                            </button>

                            {/* Tombol close */}
                            <button
                                onClick={() => setShowChatBot(prev => !prev)}
                                className="material-symbols-rounded"
                            >
                                arrow_drop_down
                            </button>
                        </div>
                    </div>


                    <div className="chat-body" ref={chatBodyRef}>
                        <div className="message bot-message">
                            <ChatbotIcon />
                            <p className="message-text">Hello! How can I assist you today?</p>
                        </div>

                        {chatHistory.map((chat, index) => (
                            <ChatMessage key={index} chat={chat} />
                        ))}
                    </div>

                    <div className="chat-footer">
                        <ChatForm
                            setChatHistory={setChatHistory}
                            generateBotResponse={generateBotResponse}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Chatbot;





























{/* <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><> */ }

// import React from 'react'
// import ChatbotIcon from "./ChatbotIcon";
// import ChatForm from "./ChatForm";
// import ChatMessage from "./ChatMessage";
// import { useState, useRef, useEffect } from 'react';
// import { companyInfo } from '@/Pages/companyInfo';
// import "../../../resources/css/chatbot.css";

// const Chatbot = () => {
//     const [chatHistory, setChatHistory] = useState([
//         {
//             hideInChat: true,
//             role: "model",
//             text: companyInfo
//         },
//     ]);

//     const [showChatbot, setShowChatBot] = useState(false);
//     const chatBodyRef = useRef(null);

//     useEffect(() => {
//         chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
//     }, [chatHistory]);

//     const generateBotResponse = async (history) => {
//         const formattedHistory = history.map(({ role, text }) => ({
//             role,
//             parts: [{ text }],
//         }));

//         const requestBody = { contents: formattedHistory };

//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(requestBody),
//         };

//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`,
//                 requestOptions
//             );

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || "API Error!");

//             const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I don't understand.";

//             setChatHistory((history) => {
//                 const updatedHistory = [...history];
//                 const thinkingIndex = updatedHistory.findLastIndex(chat => chat.isLoading);

//                 if (thinkingIndex !== -1) {
//                     updatedHistory[thinkingIndex] = { role: "model", text: botResponse };
//                 }

//                 return updatedHistory;
//             });

//         } catch (error) {
//             console.error("Error fetching AI response:", error);
//             setChatHistory((history) => {
//                 const updatedHistory = [...history];
//                 const thinkingIndex = updatedHistory.findLastIndex(chat => chat.isLoading);

//                 if (thinkingIndex !== -1) {
//                     updatedHistory[thinkingIndex] = { role: "model", text: "API Key is not valid. Please pass a valid API Key.", isError: true };
//                 }

//                 return updatedHistory;
//             });
//         }
//     };

//     return (
//         <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
//             <button onClick={() => setShowChatBot(prev => !prev)} id="chatbot-toggler">
//                 <span className="material-symbols-rounded">mode_comment</span>
//                 <span className="material-symbols-rounded">close</span>
//             </button>

//             <div className="chatbot-popup">
//                 <div className="chat-header">
//                     <div className="header-info">
//                         <ChatbotIcon />
//                         <h2 className="logo-text">Healtify Chatbot</h2>
//                     </div>

//                     <button onClick={() => setShowChatBot(prev => !prev)} className="material-symbols-rounded">arrow_drop_down</button>
//                 </div>

//                 <div className="chat-body" ref={chatBodyRef}>
//                     <div className="message bot-message">
//                         <ChatbotIcon />
//                         <p className="message-text">Hello! How can I assist you today?</p>
//                     </div>

//                     {chatHistory.map((chat, index) => (
//                         <ChatMessage key={index} chat={chat} />
//                     ))}
//                 </div>

//                 <div className="chat-footer">
//                     <ChatForm setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chatbot

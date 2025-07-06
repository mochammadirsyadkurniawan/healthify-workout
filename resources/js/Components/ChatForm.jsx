import React, { useRef } from 'react';

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = '';

        setChatHistory(history => {
            const newMessage = { role: 'user', text: userMessage };
            const thinkingMessage = { role: 'model', text: "Thinking...", isLoading: true };

            const updatedHistory = [...history, newMessage, thinkingMessage];
            generateBotResponse(updatedHistory);
            return updatedHistory;
        });
    };

    return (
        <form className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Type a message..." className="message-input" required />
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    );
};

export default ChatForm;

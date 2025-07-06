import React from 'react';
import ChatbotIcon from './ChatbotIcon';
// import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({ chat }) => {
    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === 'user' ? 'user-message' : 'bot-message'}`}>
                {chat.role === 'model' && <ChatbotIcon />}
                <p className={`message-text ${chat.isError ? "error-text" : ""}`}>{chat.text}</p>
            </div>
        )
    );
};

export default ChatMessage;




import React, { useState, useEffect } from 'react';

const MessageWithTypingEffect = ({ message, typingSpeed = 50 }) => {
    const [typedText, setTypedText] = useState(message.fixedText);

    useEffect(() => {
        let fullText = `${message.fixedText} ${message.typeEffectText}`;
        let currentCharIndex = message.fixedText.length;

        const typeChar = () => {
            if (currentCharIndex < fullText.length) {
                setTypedText((prev) => prev + fullText.charAt(currentCharIndex));
                currentCharIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        };

        // Start typing effect after the fixedText is initially rendered
        const timeoutId = setTimeout(typeChar, typingSpeed);

        return () => clearTimeout(timeoutId);
    }, [message, typingSpeed]);

    const messageContainerStyle = {
        fontFamily: '"Euclid Square", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        whiteSpace: 'pre-wrap',
        fontSize: '20px', // Co
        wordWrap: 'break-word',
        color: '#333',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: 'none', // Removing the box-shadow effect
        // maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: 'transparent', // Making the background transparent
    };

    return (
        <div style={messageContainerStyle}>
            {typedText}
        </div>
    );
};

export default MessageWithTypingEffect;

import React from 'react';
import PropTypes from 'prop-types';
import './burbujas.css';

const ChatBubble = ({ message, type }) => {
  const bubbleClass = type === 'user' ? 'user-bubble' : 'other-bubble';

  return (
    <div className={`chat-bubble ${bubbleClass}`}>
      {message}
    </div>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ChatBubble;

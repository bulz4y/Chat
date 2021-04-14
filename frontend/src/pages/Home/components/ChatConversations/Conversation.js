import React from 'react';

import './Conversation.css';

const Conversation = (props) => {
    return (
        <div className="conversation">
            <div className="conversation__user-initials">{props.user.username.substring(0,1).toUpperCase()}</div>
            <div className="conversation__user">
                <div>{props.user.username}</div>
                <div>{"LAST MESSAGE"}</div>
            </div>
        </div>
    );
};

export default Conversation;
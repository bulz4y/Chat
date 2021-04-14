import React from 'react';

import './User.css';

const User = (props) => {
    return (
        <div className="user" onClick={() => props.setUser(props.user)}>
            <div className="user__initials">{props.user.username.substring(0,1).toUpperCase()}</div>
            <div className="user__name">{props.user.username} {props.user.self && '(Me)'}</div>
        </div>
    );
};

export default User;
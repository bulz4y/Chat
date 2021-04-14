import React, { useContext } from 'react';
import { AuthContext } from '../../../../shared/context/auth-context';

import './Message.css';

const Message = (props) => {
    const auth = useContext(AuthContext);

    let style = {};
    if(props.author._id === auth.userId) {
        style = {
            marginLeft: 'auto',
            background: '#00aeff',
            color: '#fff'
        };
    }

    return (
        <div className="message"  style={style}>
            <div className="message__author">
                {props.author._id === auth.userId ? <h4>Me</h4> : <h4>{props.author.username}</h4> }
            </div>
            <div className="message__body">
                {props.body}
            </div>
        </div>
    );
};

export default Message;
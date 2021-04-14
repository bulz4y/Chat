import React from 'react';

import ChatInfoType from '../ChatInfoType/ChatInfoType';

import './ChatInfo.css';
import ChatConversations from '../ChatConversations/ChatConversations';
import ChatUsers from '../ChatUsers/ChatUsers';


const ChatInfo = (props) => {
    return (
        <div className="chat-info">

            <ChatInfoType />
            
             <ChatUsers isLoading={props.isLoading} users={props.users} setUser={props.setUser}/>
            
           
    </div>
    );
};

export default ChatInfo;


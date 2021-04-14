import React, { useState, useContext, useEffect } from 'react';

import Conversation from './Conversation';
import ErrorModal from '../../../../components/ErrorModal/errorModal';
import Loader from '../../../../components/Loader/loader';
import { AuthContext } from '../../../../shared/context/auth-context';
import { useHttp } from '../../../../shared/hooks/http-hook';

import './ChatConversations.css';

const ChatConversations = (props) => {

        const [conversations, setConversations] = useState([]);

        const auth = useContext(AuthContext);


        const [isLoading, sendRequest, error, clearError] = useHttp();
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    let conversations = await sendRequest(`http://localhost:5000/api/conversations/${auth.userId}`, 'GET');

                    // Process data before changing state
                    conversations = conversations.conversations.map((conversation) => {
                        return {
                            ...conversation,
                            users: conversation.users.filter((user) => {
                                return user._id !== auth.userId;
                            })
                        };
                    });

                    setConversations(conversations);
                } catch(err) {}
              
            };
    
            fetchData();
            
        }, []);
    
        let content;

        if(conversations.length === 0) {
            content = <h1 style={{textAlign: 'center', padding: '1rem'}}>No Conversations Found.</h1>
        } else {
            content = (
                conversations.map((conversation) => {
                    return (
                        <Conversation
                            key={conversation._id} 
                            user={conversation.users[0]}
                        />
                    )
                })
            );
        }
 
    return (
        <>
        {
              error && <ErrorModal
                body={error}
                closeModal={clearError}
              />
    
        }
        <div className="chat-conversation">
            {isLoading ? <Loader /> : content}
        </div>
    </>
    );  
};

export default ChatConversations;
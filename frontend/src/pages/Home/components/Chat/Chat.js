import React, { useState, useEffect, useContext } from 'react';

import ChatInfo from '../ChatInfo/ChatInfo';
import ChatBox from '../ChatBox/ChatBox';

import socket from '../../../../shared/socket/socket';

import './Chat.css';
import { useHttp } from '../../../../shared/hooks/http-hook';
import { AuthContext } from '../../../../shared/context/auth-context';
import ErrorModal from '../../../../components/ErrorModal/errorModal';



const Chat = (props) => {

    const [isLoading, sendRequest, error, clearError] = useHttp();
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);



    const sendMessageHandler = (e, value) => {
        e.preventDefault();

        let text = value.trim();
        

        if(text !== '') {
            socket.emit('private message', {content: text, to: user._id, from: auth.userId});
        } 


    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await sendRequest(`http://localhost:5000/api/users/${auth.userId}`, 'GET');

                
            setUsers(users.users.map((user) => {
                return {
                    ...user,
                    self: user._id === auth.userId
                };
            }));
            } catch(err) {}
            
        };

        fetchData();
        
    }, []);


    return (
        <>
            {
                  error && <ErrorModal
                    body={error}
                    closeModal={clearError}
                  />
        
            }
             <section className="chat">
                <ChatInfo setUser={setUser} isLoading={isLoading} users={users} />
                {!user ? <h3 style={{ flexGrow: 3, padding: '1rem', textAlign: 'center'}}>No Conversation Started.</h3> : <ChatBox user={user} sendMessageHandler={sendMessageHandler}/>}
            </section>
        </>
       
    );
};

export default Chat;
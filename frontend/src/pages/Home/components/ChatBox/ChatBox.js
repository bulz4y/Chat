import React, { useEffect, useState, useContext, useRef } from 'react';

import { io } from 'socket.io-client';

import './ChatBox.css';
import { useHttp } from '../../../../shared/hooks/http-hook';
import ErrorModal from '../../../../components/ErrorModal/errorModal';
import Message from './Message';
import { AuthContext } from '../../../../shared/context/auth-context';
import Loader from '../../../../components/Loader/loader';

import socket from '../../../../shared/socket/socket';

const ChatBox = (props) => {

    const auth = useContext(AuthContext);
    const [isLoading, sendRequest, error, clearError] = useHttp();
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const messageContainer = useRef();


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const data = await sendRequest('http://localhost:5000/api/messages/' + props.user._id , "GET", null, {
                    "Authorization": `Bearer ${auth.token}`  
                });

                setMessages(data.messages);
            } catch(err) { }
            
        }
       
        fetchData();

     
    }, [props.user, sendRequest, auth.token]);

    useEffect(() => {
        socket.on('private message', (data) => {
            console.log(data);
            setMessages((messages) => [...messages, data]);
        });


        return () => {
            socket.off('private message');
        }

    }, []);


    useEffect(() => {
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }, [messages]);

    const changeInputHandler = (e) => {
        setValue(e.target.value);
    }


    const sendMessageHandler = (e, value) => {
        props.sendMessageHandler(e,value);
        setValue('');
    }   

 
    return (
            <> 
                <div className="chat-box">
                    <div className="chat-box__header">
                        <h3>{props.user.username}</h3>
                    </div>
                    <div className="chat-box__messages" ref={messageContainer}>

                        {!isLoading ? (messages.map((message) => {
                            return (
                                <Message
                                    key={message._id}
                                    body={message.body}
                                    author={message.userId}
                                />
                            )
                        })) : <Loader />}
                    </div>
                    <div className="chat-box__input">
                        <form onSubmit={(e) => sendMessageHandler(e, value)}>
                            <input 
                                type="text" 
                                value={value} 
                                onChange={changeInputHandler}
                            />
                        </form>
                        
                    </div>
                </div>
            </>
    );
};

export default ChatBox;
import React, { useEffect, useState, useContext } from 'react';

import User from './User';

import './ChatUsers.css';

import Loader from '../../../../components/Loader/loader';




const ChatUsers = (props) => {


        let content;



        if(props.users.length <= 0) {
            content = <h1 style={{textAlign: 'center', padding: '1rem'}}>No Users Found.</h1>
        } else  {
     

            content = (
                props.users.map((user) => {
                    return (
                        <User
                            key={user._id} 
                            user={user}
                            setUser={props.setUser}
                        />
                    )
                })
            );
        }
 
    

    return (
        <>
            <div className="chat-users">
                {props.isLoading ? <Loader /> : content}
            </div>
        </>
    );
};

export default ChatUsers;

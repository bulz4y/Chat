import React, { useEffect, useContext, useState } from 'react';

import Navigation from '../../components/Navigation/navigation';
import Chat from './components/Chat/Chat';

import socket from '../../shared/socket/socket';

import './Home.css';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../components/ErrorModal/errorModal';


const Home = (props) => {

    const auth = useContext(AuthContext);

    const [error, setError] = useState(null);


    useEffect(() => {
        socket.auth = {token: `Bearer ${auth.token}`};


        socket.connect();

        socket.on("connect_error", (err) => {
            console.log(err);
            setError(err.message);
        });


        return () => {
            socket.off('connect_error');
        }

    }, [auth.token]);

    return (
        <>  
            {error && <ErrorModal body={error} closeModal={() => {setError(null)}}/>}
            <section className='home'>
                    <Navigation />
                    <Chat />                    
            </section>
        </>
        
    )
};

export default Home;
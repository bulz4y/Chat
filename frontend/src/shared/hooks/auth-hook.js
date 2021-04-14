import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [userData, setUserData] = useState({
        userId: null,
        token: null, 
        username: null
    });


    const login = (userId, token, username) => {

        setUserData({
            userId,
            token, 
            username
        });

        localStorage.setItem('data', JSON.stringify({
            userId,
            username,
            token
        }));
    };

    const logout = () => {
        setUserData({
            userId: null,
            token: null, 
            username: null
        });
        localStorage.removeItem('data');
    };

    useEffect(() => {
        let data = null;
        try {
            data = JSON.parse(localStorage.getItem('data'));
        } catch(err) {
            console.log(err);
        }


        if(data) {
            login(data.userId, data.token, data.username);
        }

    }, []);

    return [userData, login, logout];

};
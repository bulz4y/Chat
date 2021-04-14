import { createContext } from 'react';


const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    userId: null,
    token: null,
    username: null
});

export { AuthContext };
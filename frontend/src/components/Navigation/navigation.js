import React, {useContext} from 'react';

import { useHistory } from 'react-router-dom';

import './navigatioin.css';
import Button from '../Button/Button';
import { AuthContext } from '../../shared/context/auth-context';

const Navigation = (props) => {

    const auth = useContext(AuthContext);

    const history = useHistory();

    const logout = () => {
        auth.logout();
        history.push('/login');
    }

    return (
        <header className='header'>
                <div className="header__logo">Chat App</div>
                <ul className="header__nav">
                    <li className="header__item dropdown">
                            {auth.username}   
                            <div className="dropdown-content">
                                <Button 
                                    text='Logout'
                                    click={logout}
                                    type='button'
                                />
                            </div>               
                    </li>
                </ul>
        </header>
    );
};

export default Navigation;
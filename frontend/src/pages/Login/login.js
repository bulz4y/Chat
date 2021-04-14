import React, { useContext } from 'react';

import { useHistory, Link } from 'react-router-dom';

import Input from '../../components/Input/input';
import Button from '../../components/Button/Button';

import { AuthContext } from '../../shared/context/auth-context';

import { useForm } from '../../shared/hooks/form-hook';

import '../../shared/css/auth.css';
import { useHttp } from '../../shared/hooks/http-hook';
import ErrorModal from '../../components/ErrorModal/errorModal';
import Loader from '../../components/Loader/loader';


const Login = () => {

    const initialFormState = {
        username: {
            value: '',
            isValid: false,
            error: '',
            isTouched: false
        },
        password: {
            value: '',
            isValid: false,
            error: '',
            isTouched: false
        }
    };

    const auth = useContext(AuthContext);

    const [formState, inputChangeHandler, blurChange] = useForm(initialFormState);

    const [isLoading, sendRequest, error, clearError] = useHttp();

    const history = useHistory();

    const authHandler = async (e) => {

        e.preventDefault();

        let data = {
            username: formState.inputs.username.value,
            password: formState.inputs.password.value
        };

        try {
            const loginData = await sendRequest(
                    'http://localhost:5000/api/login', 
                    'POST',
                    JSON.stringify(data),
                    {
                        'Content-Type': 'application/json'
                    }
            );

            auth.login(loginData.userId, loginData.token, loginData.username);

            history.push('/');

        } catch(err) { }
        
    };


        return (
            <>
                 {error && <ErrorModal
                            body={error}
                            closeModal={clearError}
                          />
                }

                <section className="auth">
                    <div className="auth__content">
                        <h1 className='auth__title'>Login</h1>
                        {isLoading ? <Loader /> : (
                            <>
                                <form className='auth__form' onSubmit={authHandler}>
                                    <Input
                                        type='text'
                                        element='input'
                                        id='username'
                                        name="username"
                                        placeholder='Username...'
                                        validators={[{type: 'REQUIRED'}, {type: 'MIN_LENGTH', val: 5}]}                  
                                        onInputChange={inputChangeHandler}
                                        onBlurChange={blurChange}
                                        {...formState.inputs.username}
                                    />    
                                    <Input 
                                        type='password'
                                        element='input'
                                        id='password'
                                        name='password'
                                        validators={[{type: 'REQUIRED'}, {type: 'MIN_LENGTH', val: 5}]}
                                        placeholder='Password...'                 
                                        onInputChange={inputChangeHandler}  
                                        onBlurChange={blurChange}
                                        {...formState.inputs.password}
                                    />

                                    <Button 
                                        disabled={!formState.formIsValid}
                                        type='submit'
                                        text='Login'
                                    />    

                                </form>

                                <div style={{textAlign: 'left'}}>
                                            <Link to='/signup' style={{fontSize: '1.5rem', width: '100%', textDecoration: 'none'}}>
                                                Don't have an account ?
                                            </Link>
                                </div>
                
                            </>
                        )}  
                    </div>                    
                </section>
            </>
         
        );


};

export default Login;
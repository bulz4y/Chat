import React, { useContext } from 'react';

import { useHistory, Link } from 'react-router-dom';

import Input from '../../components/Input/input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/loader';

import { AuthContext } from '../../shared/context/auth-context';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttp } from '../../shared/hooks/http-hook';

import '../../shared/css/auth.css';
import ErrorModal from '../../components/ErrorModal/errorModal';


const Signup = () => {

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
        },
        confirmPassword: {
            value: '',
            isValid: false,
            error: '',
            isTouched: false
        }
    };

    const auth = useContext(AuthContext);

    const [isLoading, sendRequest, error, clearError] = useHttp();

    const [formState, inputChangeHandler, blurChange] = useForm(initialFormState);

    const history = useHistory();

    const authHandler = async (e) => {

            e.preventDefault(); 

            try {
                let data = await sendRequest(
                        'http://localhost:5000/api/signup', 
                        "POST",
                        JSON.stringify({
                            username: formState.inputs.username.value,
                            password: formState.inputs.password.value,
                            confirmPassword: formState.inputs.confirmPassword.value
                        }),
                        {
                            'Content-Type': 'application/json'
                        }
                );     

                auth.login(data.userId, data.token, data.username);
                
                history.push('/');  
    
            } catch { }
            
        
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
                        <h1 className='auth__title'>Signup</h1>
                        {isLoading ? <Loader /> : (
                            <>
                                <form className='auth__form' onSubmit={authHandler}>
                                    
                                <Input 
                                    type='text'
                                    element='input'
                                    id='username'
                                    name="username"
                                    validators={[{type: 'REQUIRED'}, {type: 'MIN_LENGTH', val: 5}]}
                                    placeholder='Username...'
                                    onInputChange={inputChangeHandler}
                                    onBlurChange={blurChange}
                                    {...formState.inputs.username}
                                />    
                                <Input 
                                    type='password'
                                    element='input'
                                    name='password'
                                    validators={[{type: 'REQUIRED'}, {type: 'MIN_LENGTH', val: 5}]}
                                    id='password'
                                    placeholder='Password...'
                                    password={formState.inputs.confirmPassword.value}
                                    onInputChange={inputChangeHandler}
                                    onBlurChange={blurChange}
                                    requiresConfirmPassword
                                    {...formState.inputs.password}
                                />
                
                                <Input 
                                    type='password'
                                    element='input'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Confirm Password...'
                                    onInputChange={inputChangeHandler}
                                    validators={[{type: 'PASSWORD_MATCH', val: formState.inputs.password.value}]}
                                    password={formState.inputs.password.value}
                                    onBlurChange={blurChange}
                                    {...formState.inputs.confirmPassword}
                                />
                
                                <Button 
                                    disabled={!formState.formIsValid}
                                    type='submit'
                                    text='Signup'
                                />
                
                            
                                </form>

                                <div style={{textAlign: 'left'}}>
                                            <Link to='/login' style={{fontSize: '1.5rem', width: '100%', textDecoration: 'none'}}>
                                                Already have an account ?
                                            </Link>
                                </div> 
                            </>
                        )}                    
                    </div>
                
                </section>
            </>
        );

};

export default Signup;
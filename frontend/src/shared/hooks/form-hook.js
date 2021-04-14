import { useReducer, useCallback } from "react"


import { capitalizeString, validate } from '../../shared/util/util';

const formReducer = (state, action) => {
    switch(action.type) {

        case 'INPUT_CHANGE':

             let formIsValid = true;
             let validation = validate(action.value, action.validators, capitalizeString(action.id));
             
             
             let confirmPassword = {...state.inputs['confirmPassword']};

             // Update confirm password field if needed
             if(action.requiresConfirmPassword) {
                
                if(action.id === 'password' && 
                    action.value === confirmPassword.value &&
                    confirmPassword.isTouched) {

                    confirmPassword.isValid = true;
                    confirmPassword.error = '';

                } else if(action.id === 'password' && 
                        action.value !== confirmPassword.value &&
                        confirmPassword.isTouched) {

                    confirmPassword.isValid = false;
                    confirmPassword.error = 'Passwords must match';
                }
             }

            
             for(const inputId in state.inputs) {


                 if(inputId === action.id) {          
                    formIsValid = formIsValid && validation.isValid;
                 } else {
                    if(inputId === 'confirmPassword') {
                        formIsValid = formIsValid && confirmPassword.isValid;
                    } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid;
                    }
                   
                 }
                 
             }
             
             const updatedState = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        ...state.inputs[action.id],
                        value: action.value,
                        isValid: validation.isValid,
                        error: validation.error
                    },

                },
                formIsValid: formIsValid
            };

            if(action.requiresConfirmPassword) {
                updatedState.inputs['confirmPassword'] = confirmPassword;
            }

             return updatedState;

        case 'TOUCH': 
            return { 
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        ...state.inputs[action.id],
                        isTouched: true
                    }
                }
            };

        default:
            return state;
    }

};

export const useForm = (initialInputs) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        formIsValid: false
    });

    const inputHandler = useCallback((value, id, validators, requiresConfirmPassword) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            id,
            validators,
            requiresConfirmPassword
        });

    }, []);

    const blurChange = (id) => {
        dispatch({
            type: 'TOUCH',
            id
        });
    }

    return [formState, inputHandler, blurChange];

}
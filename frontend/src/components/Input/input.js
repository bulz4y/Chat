import React from 'react';

import './input.css';

const Input = (props) => {
    
    const { onInputChange, onBlurChange } = props;

    const inputChangeHandler = (e) => {
        onInputChange(e.target.value, props.id, props.validators, props.requiresConfirmPassword);
    }

    const touchHandler = () => {
        onBlurChange(props.id);

    }

    const el = props.element;

    let output = null;


    switch(el) {
        case 'input':
            output = (
                <input 
                    type={props.type} 
                    onChange={inputChangeHandler} 
                    value={props.value} 
                    placeholder={props.placeholder} 
                    name={props.name}
                    onBlur={touchHandler} 
                    id={props.id}    
                />);
            break;
        default:
            output = null;
    }


    return (
        <div className="form-control">
            {output}
            {!props.isValid && props.isTouched && <p style={{color: 'red', textAlign: 'left', fontSize: '1.2rem'}}>{props.error}</p> }
        </div>
    )
};

export default Input;
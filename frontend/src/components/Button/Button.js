import './button.css';

const Button = (props) => {;
    
    return (
        <button disabled={props.disabled} className={`btn btn-primary btn-block ${props.disabled ? 'disabled' : ""}`} type={props.type} onClick={props.click}>
            {props.text}
        </button>
    )
};

export default Button;
import React  from 'react';
import ReactDOM from 'react-dom';

import './modal.css';

const Modal = (props) => {

    let content = (
        <>  
            <div className="overlay" onClick={props.closeModal}></div>
            <div className="modal">
                <div className="modal__header">{props.header}</div>
                <div className="modal__body">{props.body}</div>
                <div className="modal__footer">{props.footer}</div>
            </div>
        </>
    )

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
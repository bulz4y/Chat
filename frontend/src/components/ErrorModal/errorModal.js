import React from 'react';

import Modal from '../Modal/modal';

const ErrorModal = (props) => {
    return (
        <Modal
            header={'An Error Occured!'}
            body={<p>{props.body}</p>}
            footer={<button className='btn btn-primary' onClick={props.closeModal}>Close</button>}
            closeModal={props.closeModal}
        />
    )
};

export default ErrorModal;
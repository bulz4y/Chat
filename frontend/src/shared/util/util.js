export const validate = (value, validators, name) => {
    let isValid = true;
    let error = '';

    for(const validator of validators) {
        if(validator.type === 'REQUIRED') {
            isValid = isValid && value.trim().length >= 0;
            error = (error === '' && !isValid) ? (name + ' is required.') : error;
        }

        if(validator.type === 'MIN_LENGTH') {
            isValid = isValid && value.trim().length >= validator.val;
            error = (error === '' && !isValid) ? (name + ' needs at least ' + validator.val + ' characters') : error;
        }

        if(validator.type === 'MAX_LENGTH') {
            isValid = isValid && value.trim().length <= validator.val;
            error = (error === '' && !isValid) ? (name + 'cant be longer than ' + validator.val + ' characters') : error;
        }

        if(validator.type === 'PASSWORD_MATCH') {
            isValid = isValid && value.trim() === validator.val;
            error = (error === '' && !isValid) ? 'Passwords must match' : error;
        }
   
    }

    return {
        error,
        isValid
    };
};

export const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

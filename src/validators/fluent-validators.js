'use strict';

let errors;

function ValidationsContract(){
    errors = [];
};

ValidationsContract.prototype.isRequired = (value, message) =>  {
    if(!value || value.length <= 0){
        errors.push({message: message});
    }
};

ValidationsContract.prototype.hasMinLength = (value, min, message) =>  {
    if(!value || value.length < min){
        errors.push({message: message});
    }
};

ValidationsContract.prototype.hasMaxLength = (value, max, message) =>  {
    if(!value || value.length <= max){
        errors.push({message: message});
    }
};

ValidationsContract.prototype.isFixedLength = (value, length, message) =>  {
    if(!value || value.length !== length){
        errors.push({message: message});
    }
};


ValidationsContract.prototype.isEmail = (value, message) =>  {
    var regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if(!regex.test(value))
        errors.push({message: message});
};

ValidationsContract.prototype.errors = () =>  {
    return errors;
};

ValidationsContract.prototype.clear = () =>  {
     errors = [];
};

ValidationsContract.prototype.isValid = () =>  {
    return errors.length == 0;
};

module.exports = ValidationsContract;
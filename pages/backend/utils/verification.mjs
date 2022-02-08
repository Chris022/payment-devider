export function objectVerificator(requiredFields, optionalFileds){
    return (data) => {
        let keys = Object.keys(data);
        let values = Object.values(data);
    
        //check if all keys are in requiredFields
        let check1 = keys.map((key) => requiredFields.includes(key)).reduce((a,c) => a && c);
    
        //const isEqual = (a, b) => Object.keys(a) === b;
        ////check if the data doesn't include more than the required + optionalFields
        let check2 = true//isEqual(requiredFields.concat(optionalFileds) , keys);
    
        //test if no values is null
        let check3 = keys.map((key) => key ? true : false).reduce((a,c) => a && c);

        return check1 && check2 && check3;
    }
}

export function valueVerificator(){
    return (value) => {
        return value ? true : false;
    }
}
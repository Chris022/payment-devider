export function sendSuccess(message,data){

    return {
        "type":"Success",
        "message":message,
        "data":data
    }
}

export function sendError(message){

    return {
        "type":"Error",
        "message":message
    }
}
class apiError extends Error{
    constructor(statusCode, errors = [], message="Somthing went wrong", stack=""){
        super(message);
        
        this.statusCode = statusCode,
        this.message = message,
        this.success = false,
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {apiError}
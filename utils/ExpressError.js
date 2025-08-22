class ExpressError extends Error{
    constructor(statusCode , messages){
        super();
        this.statusCode = statusCode;
        this.message = messages;
    }
}

module.exports = ExpressError;
class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.name = 'ExpressError';
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ExpressError;
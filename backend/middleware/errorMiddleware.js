const notFound =  (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check for mongoose bad ObjectId
    if(err.name === 'CastError' && err.kind === 'Object Id') {
        message = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: ProcessingInstruction.env.Node_ENV === 'production' ? 'production' : err.stack,
    });

}

export { notFound, errorHandler };
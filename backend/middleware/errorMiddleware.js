

export const pageNotFound = (req, res, next) => {
    const error = new Error(`Page Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};


export const errorHandler = (err, req, res, next) => {
    console.log(err);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError') {
        const CastError = err;
        if (CastError.kind === 'ObjectId') {
            statusCode = 404;
            message = 'Data not found';
        }
    }

    res.status(statusCode).send({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

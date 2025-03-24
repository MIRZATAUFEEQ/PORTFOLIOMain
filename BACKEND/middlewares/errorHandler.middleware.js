import { ApiError } from '../utils/ApiError.js'
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'internal server error',
        err.statusCode = err.statusCode || 500
    if (err.statusCode == 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} entered`
        err = new ApiError(message, 400)
    }
    if (err.name == 'JsonWebTokenError') {
        const message = `json web token is invalid try again`
        err = new ApiError(message, 400)
    }
    if (err.name == 'TokenExpiredError') {
        const message = `json web token is Expired try again`
        err = new ApiError(message, 400)
    }
    if (err.name == 'CastError') {
        const message = `Invalid ${err.path}`
        err = new ApiError(message, 400)
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join(", ");
        err = new ApiError(400, message);
    }

    return res.status(err.statusCode)
        .json({
            success: false,
            message: err.message
        })
}
import { errorResponse } from "../utils/apiResponse.js";

export const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    console.error("\n========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("===========================\n");

    let statusCode = err.status || res.statusCode;

    if (!statusCode || statusCode === 200) {
        statusCode = 500;
    }

    if (err.name === "CastError") {
        return errorResponse(res, "Invalid resource id.", 400);
    }

    if (err.code === 11000) {
        return errorResponse(
            res,
            `${Object.keys(err.keyValue)[0]} already exists.`,
            409
        );
    }

    if (err.name === "ValidationError") {
        return errorResponse(
            res,
            "Validation failed.",
            400,
            Object.values(err.errors).map(e => e.message)
        );
    }

    return errorResponse(
        res,
        err.message || "Internal Server Error",
        statusCode
    );
};
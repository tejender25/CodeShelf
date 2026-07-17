import asyncHandler from "../utils/asyncHandler.js";
import {
    successResponse,
    errorResponse,
} from "../utils/apiResponse.js";

import {
    register,
    login,
    getProfile,
} from "../services/authService.js";

/*
    POST /api/auth/register
*/
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return errorResponse(
            res,
            "Please provide name, email and password",
            400
        );
    }

    if (password.length < 6) {
        return errorResponse(
            res,
            "Password must be at least 6 characters",
            400
        );
    }

    const result = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
    });

    return successResponse(
        res,
        result,
        "Registration successful",
        201
    );
});

/*
    POST /api/auth/login
*/
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(
            res,
            "Email and password are required",
            400
        );
    }

    const result = await login({
        email: email.trim().toLowerCase(),
        password,
    });

    return successResponse(
        res,
        result,
        "Login successful"
    );
});

/*
    GET /api/auth/me
*/
export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await getProfile(req.user._id);

    return successResponse(
        res,
        user,
        "User profile fetched successfully"
    );
});
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    return {
        token: generateToken(user._id),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    return {
        token: generateToken(user._id),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

export const getProfile = async (id) => {
    return await User.findById(id).select("-password");
};
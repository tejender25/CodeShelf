import Snippet from "../models/Snippet.js";

/**
 * Toggle favorite status
 */
export const toggleFavoriteService = async (
    snippetId,
    userId
) => {
    const snippet = await Snippet.findOne({
        _id: snippetId,
        user: userId,
    });

    if (!snippet) {
        const error = new Error("Snippet not found");
        error.status = 404;
        throw error;
    }

    snippet.favorite = !snippet.favorite;

    await snippet.save();

    return snippet;
};

/**
 * Mark snippet as favorite
 */
export const markFavoriteService = async (
    snippetId,
    userId
) => {
    const snippet = await Snippet.findOne({
        _id: snippetId,
        user: userId,
    });

    if (!snippet) {
        const error = new Error("Snippet not found");
        error.status = 404;
        throw error;
    }

    snippet.favorite = true;

    await snippet.save();

    return snippet;
};

/**
 * Remove favorite
 */
export const removeFavoriteService = async (
    snippetId,
    userId
) => {
    const snippet = await Snippet.findOne({
        _id: snippetId,
        user: userId,
    });

    if (!snippet) {
        const error = new Error("Snippet not found");
        error.status = 404;
        throw error;
    }

    snippet.favorite = false;

    await snippet.save();

    return snippet;
};

/**
 * Get all favorite snippets of a user
 */
export const getFavoriteSnippetsService = async (
    userId
) => {
    return await Snippet.find({
        user: userId,
        favorite: true,
    }).sort({
        updatedAt: -1,
    });
};

/**
 * Count favorite snippets
 */
export const getFavoriteCountService = async (
    userId
) => {
    return await Snippet.countDocuments({
        user: userId,
        favorite: true,
    });
};
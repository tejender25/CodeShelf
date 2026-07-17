import Snippet from "../models/Snippet.js";
import parseTags from "../utils/parseTags.js";

/**
 * Create a new snippet
 */
export const createSnippetService = async (userId, payload) => {
    const {
        title,
        description,
        language,
        code,
        tags,
        visibility,
        favorite,
    } = payload;

    const snippet = await Snippet.create({
        title: title.trim(),
        description: description?.trim() || "",
        language,
        code,
        tags: parseTags(tags),
        visibility: visibility || "private",
        favorite: favorite || false,
        user: userId,
    });

    return snippet;
};

/**
 * Get snippet by id and verify ownership
 */
export const getSnippetByIdService = async (snippetId, userId) => {
    const snippet = await Snippet.findById(snippetId);

    if (!snippet) {
        const error = new Error("Snippet not found");
        error.status = 404;
        throw error;
    }

    if (snippet.user.toString() !== userId.toString()) {
        const error = new Error("Unauthorized");
        error.status = 403;
        throw error;
    }

    return snippet;
};

/**
 * Update snippet
 */
export const updateSnippetService = async (
    snippetId,
    userId,
    payload
) => {
    const snippet = await getSnippetByIdService(
        snippetId,
        userId
    );

    if (payload.title !== undefined)
        snippet.title = payload.title.trim();

    if (payload.description !== undefined)
        snippet.description = payload.description.trim();

    if (payload.language !== undefined)
        snippet.language = payload.language;

    if (payload.code !== undefined)
        snippet.code = payload.code;

    if (payload.visibility !== undefined)
        snippet.visibility = payload.visibility;

    if (payload.favorite !== undefined)
        snippet.favorite = payload.favorite;

    if (payload.tags !== undefined)
        snippet.tags = parseTags(payload.tags);

    await snippet.save();

    return snippet;
};

/**
 * Delete snippet
 */
export const deleteSnippetService = async (
    snippetId,
    userId
) => {
    const snippet = await getSnippetByIdService(
        snippetId,
        userId
    );

    await snippet.deleteOne();

    return true;
};

/**
 * Duplicate snippet
 */
export const duplicateSnippetService = async (
    snippetId,
    userId
) => {
    const snippet = await getSnippetByIdService(
        snippetId,
        userId
    );

    const duplicate = await Snippet.create({
        title: `${snippet.title} (Copy)`,
        description: snippet.description,
        language: snippet.language,
        code: snippet.code,
        tags: [...snippet.tags],
        visibility: snippet.visibility,
        favorite: false,
        user: userId,
    });

    return duplicate;
};
import asyncHandler from "../utils/asyncHandler.js";
import {
    successResponse,
    errorResponse,
} from "../utils/apiResponse.js";

import {
    createSnippetService,
    updateSnippetService,
    deleteSnippetService,
    duplicateSnippetService,
} from "../services/snippetCrudService.js";

import {
    getUserSnippetsService,
    getSnippetService,
    getPublicSnippetsService,
} from "../services/snippetQueryService.js";

import {
    toggleFavoriteService,
} from "../services/snippetFavoriteService.js";

import {
    getDashboardStatsService,
} from "../services/statsService.js";

/**
 * POST /api/snippets
 */
export const createSnippet = asyncHandler(async (req, res) => {
    const { title, language, code } = req.body;

    if (!title || !language || !code) {
        return errorResponse(
            res,
            "Title, language and code are required.",
            400
        );
    }

    const snippet = await createSnippetService(
        req.user._id,
        req.body
    );

    return successResponse(
        res,
        snippet,
        "Snippet created successfully.",
        201
    );
});

/**
 * GET /api/snippets
 */
export const getMySnippets = asyncHandler(async (req, res) => {
    const snippets = await getUserSnippetsService(
        req.user._id,
        req.query
    );

    return successResponse(
        res,
        snippets,
        "Snippets fetched successfully."
    );
});

/**
 * GET /api/snippets/:id
 */
export const getSnippet = asyncHandler(async (req, res) => {
    const snippet = await getSnippetService(
        req.params.id,
        req.user._id
    );

    return successResponse(
        res,
        snippet,
        "Snippet fetched successfully."
    );
});

/**
 * PUT /api/snippets/:id
 */
export const updateSnippet = asyncHandler(async (req, res) => {
    const snippet = await updateSnippetService(
        req.params.id,
        req.user._id,
        req.body
    );

    return successResponse(
        res,
        snippet,
        "Snippet updated successfully."
    );
});

/**
 * DELETE /api/snippets/:id
 */
export const deleteSnippet = asyncHandler(async (req, res) => {
    await deleteSnippetService(
        req.params.id,
        req.user._id
    );

    return successResponse(
        res,
        null,
        "Snippet deleted successfully."
    );
});

/**
 * POST /api/snippets/:id/duplicate
 */
export const duplicateSnippet = asyncHandler(async (req, res) => {
    const snippet = await duplicateSnippetService(
        req.params.id,
        req.user._id
    );

    return successResponse(
        res,
        snippet,
        "Snippet duplicated successfully.",
        201
    );
});

/**
 * PATCH /api/snippets/:id/favorite
 */
export const toggleFavorite = asyncHandler(async (req, res) => {
    const snippet = await toggleFavoriteService(
        req.params.id,
        req.user._id
    );

    return successResponse(
        res,
        snippet,
        "Favorite status updated."
    );
});

/**
 * GET /api/snippets/stats
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await getDashboardStatsService(
        req.user._id
    );

    return successResponse(
        res,
        stats,
        "Dashboard statistics fetched successfully."
    );
});

/**
 * GET /api/snippets/explore
 */
export const getPublicSnippets = asyncHandler(async (req, res) => {
    const snippets = await getPublicSnippetsService(
        req.query
    );

    return successResponse(
        res,
        snippets,
        "Public snippets fetched successfully."
    );
});
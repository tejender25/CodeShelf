import Snippet from "../models/Snippet.js";

/**
 * Build query object from request query params
 */
const buildFilters = (userId, query = {}) => {
    const filter = {
        user: userId,
    };

    if (query.search && query.search.trim() !== "") {
        filter.title = {
            $regex: query.search.trim(),
            $options: "i",
        };
    }

    if (
        query.language &&
        query.language !== "all"
    ) {
        filter.language = query.language;
    }

    if (
        query.visibility &&
        ["public", "private"].includes(query.visibility)
    ) {
        filter.visibility = query.visibility;
    }

    if (query.favorite === "true") {
        filter.favorite = true;
    }

    if (query.tag && query.tag.trim() !== "") {
        filter.tags = {
            $regex: query.tag.trim(),
            $options: "i",
        };
    }

    return filter;
};

/**
 * Get all snippets belonging to a user
 */
export const getUserSnippetsService = async (
    userId,
    query = {}
) => {
    const filter = buildFilters(userId, query);

    const page = Math.max(
        parseInt(query.page) || 1,
        1
    );

    const limit = Math.max(
        parseInt(query.limit) || 10,
        1
    );

    const skip = (page - 1) * limit;

    const totalSnippets =
        await Snippet.countDocuments(filter);

    const sortOption = {};

    switch (query.sort) {
        case "oldest":
            sortOption.updatedAt = 1;
            break;

        case "titleAsc":
            sortOption.title = 1;
            break;

        case "titleDesc":
            sortOption.title = -1;
            break;

        case "language":
            sortOption.language = 1;
            break;

        case "newest":
        default:
            sortOption.updatedAt = -1;
    }

    const snippets = await Snippet.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    return {
        snippets,
        pagination: {
            page,
            limit,
            totalSnippets,
            totalPages: Math.ceil(
                totalSnippets / limit
            ),
            hasPrev: page > 1,
            hasNext:
                page <
                Math.ceil(
                    totalSnippets / limit
                ),
        },
    };
};

/**
 * Public explore page
 */
export const getPublicSnippetsService = async (
    query = {}
) => {
    const filter = {
        visibility: "public",
    };

    if (query.search) {
        filter.title = {
            $regex: query.search,
            $options: "i",
        };
    }

    if (
        query.language &&
        query.language !== "all"
    ) {
        filter.language = query.language;
    }

    if (query.tag) {
        filter.tags = {
            $regex: query.tag,
            $options: "i",
        };
    }

    const page = Math.max(
        parseInt(query.page) || 1,
        1
    );

    const limit = Math.max(
        parseInt(query.limit) || 10,
        1
    );

    const skip = (page - 1) * limit;

    const totalSnippets =
        await Snippet.countDocuments(filter);

    const sortOption = {};

    switch (query.sort) {
        case "oldest":
            sortOption.createdAt = 1;
            break;

        case "titleAsc":
            sortOption.title = 1;
            break;

        case "titleDesc":
            sortOption.title = -1;
            break;

        case "language":
            sortOption.language = 1;
            break;

        case "newest":
        default:
            sortOption.createdAt = -1;
    }

    const snippets = await Snippet.find(filter)
        .populate("user", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    return {
        snippets,
        pagination: {
            page,
            limit,
            totalSnippets,
            totalPages: Math.ceil(
                totalSnippets / limit
            ),
            hasPrev: page > 1,
            hasNext:
                page <
                Math.ceil(
                    totalSnippets / limit
                ),
        },
    };
};

/**
 * Single snippet (owner only)
 */
export const getSnippetService = async (
    snippetId,
    userId
) => {
    const snippet = await Snippet.findOne({
        _id: snippetId,
        user: userId,
    });

    if (!snippet) {
        const error = new Error(
            "Snippet not found"
        );
        error.status = 404;
        throw error;
    }

    return snippet;
};
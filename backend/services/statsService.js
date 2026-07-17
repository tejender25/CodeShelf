import mongoose from "mongoose";
import Snippet from "../models/Snippet.js";

/**
 * Dashboard statistics
 */
export const getDashboardStatsService = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    const [
        total,
        publicCount,
        privateCount,
        favoriteCount,
        recentSnippets,
        languageStats,
    ] = await Promise.all([
        Snippet.countDocuments({
            user: objectId,
        }),

        Snippet.countDocuments({
            user: objectId,
            visibility: "public",
        }),

        Snippet.countDocuments({
            user: objectId,
            visibility: "private",
        }),

        Snippet.countDocuments({
            user: objectId,
            favorite: true,
        }),

        Snippet.find({
            user: objectId,
        })
            .sort({
                updatedAt: -1,
            })
            .limit(5)
            .select(
                "title language favorite visibility updatedAt"
            ),

        Snippet.aggregate([
            {
                $match: {
                    user: objectId,
                },
            },
            {
                $group: {
                    _id: "$language",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]),
    ]);

    return {
        overview: {
            total,
            public: publicCount,
            private: privateCount,
            favorite: favoriteCount,
        },
        recentSnippets,
        languageStats,
    };
};

/**
 * Lightweight dashboard summary
 */
export const getQuickStatsService = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    const [total, favorites] = await Promise.all([
        Snippet.countDocuments({
            user: objectId,
        }),

        Snippet.countDocuments({
            user: objectId,
            favorite: true,
        }),
    ]);

    return {
        total,
        favorites,
    };
};

/**
 * Language usage
 */
export const getLanguageUsageService = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    return await Snippet.aggregate([
        {
            $match: {
                user: objectId,
            },
        },
        {
            $group: {
                _id: "$language",
                snippets: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                snippets: -1,
            },
        },
    ]);
};

/**
 * Visibility usage
 */
export const getVisibilityStatsService = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    const [publicCount, privateCount] = await Promise.all([
        Snippet.countDocuments({
            user: objectId,
            visibility: "public",
        }),

        Snippet.countDocuments({
            user: objectId,
            visibility: "private",
        }),
    ]);

    return {
        public: publicCount,
        private: privateCount,
    };
};
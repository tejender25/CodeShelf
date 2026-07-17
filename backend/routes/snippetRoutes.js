import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createSnippet,
    getMySnippets,
    getSnippet,
    updateSnippet,
    deleteSnippet,
    duplicateSnippet,
    toggleFavorite,
    getDashboardStats,
    getPublicSnippets,
} from "../controllers/snippetController.js";

const router = express.Router();

router.get("/explore", getPublicSnippets);

router.use(protect);

router.get("/stats", getDashboardStats);

router.get("/", getMySnippets);

router.post("/", createSnippet);

router.get("/:id", getSnippet);

router.put("/:id", updateSnippet);

router.delete("/:id", deleteSnippet);

router.post("/:id/duplicate", duplicateSnippet);

router.patch("/:id/favorite", toggleFavorite);

export default router;
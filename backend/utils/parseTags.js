const parseTags = (tags) => {
    if (!tags) return [];

    if (Array.isArray(tags)) {
        return tags
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    if (typeof tags === "string") {
        return tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    return [];
};

export default parseTags;
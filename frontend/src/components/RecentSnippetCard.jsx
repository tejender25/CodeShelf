import {
    FiCode,
    FiGlobe,
    FiLock,
    FiStar,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export default function RecentSnippetCard({
    snippet,
}) {
    const navigate = useNavigate();

    return (
        <div className="bg-card border border-border rounded-xl p-5 hover:border-primary transition">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-lg font-semibold">
                        {snippet.title}
                    </h3>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-background text-xs">
                        {snippet.language}
                    </span>
                </div>

                <div className="flex gap-2">
                    {snippet.favorite && (
                        <FiStar
                            fill="currentColor"
                            className="text-yellow-400"
                        />
                    )}

                    {snippet.visibility ===
                    "public" ? (
                        <FiGlobe />
                    ) : (
                        <FiLock />
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm">
                <div className="flex gap-2 items-center text-muted">
                    <FiCode />

                    {new Date(
                        snippet.updatedAt
                    ).toLocaleDateString()}
                </div>

                <button
                    onClick={() =>
                        navigate(
                            `/snippets/${snippet._id}/edit`
                        )
                    }
                    className="text-primary hover:underline"
                >
                    View
                </button>
            </div>
        </div>
    );
}
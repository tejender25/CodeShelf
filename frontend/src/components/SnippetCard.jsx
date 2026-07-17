import {
    FiCopy,
    FiDownload,
    FiEdit2,
    FiGlobe,
    FiHeart,
    FiLock,
    FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";

import CodePreview from "./CodePreview";

const EXTENSIONS = {
    javascript: "js",
    typescript: "ts",
    cpp: "cpp",
    c: "c",
    java: "java",
    python: "py",
    html: "html",
    css: "css",
    json: "json",
    sql: "sql",
    go: "go",
    rust: "rs",
    php: "php",
    bash: "sh",
};

export default function SnippetCard({
    snippet,
    onEdit,
    onDelete,
    onFavorite,
}) {
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(
                snippet.code
            );

            toast.success("Code copied");
        } catch {
            toast.error("Unable to copy code");
        }
    };

    const downloadCode = () => {
        const extension =
            EXTENSIONS[snippet.language] || "txt";

        const blob = new Blob([snippet.code], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = `${snippet.title}.${extension}`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all duration-300">
            {/* Header */}

            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-bold">
                        {snippet.title}
                    </h2>

                    {snippet.description && (
                        <p className="text-muted mt-2">
                            {snippet.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full bg-primary text-sm text-white">
                            {snippet.language}
                        </span>

                        {snippet.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-background border border-border text-xs"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 ml-5">
                    {snippet.visibility ===
                    "public" ? (
                        <FiGlobe
                            className="text-green-400"
                            size={18}
                        />
                    ) : (
                        <FiLock
                            className="text-orange-400"
                            size={18}
                        />
                    )}

                    <button
                        onClick={onFavorite}
                        title={
                            snippet.favorite
                                ? "Remove Favorite"
                                : "Favorite"
                        }
                        className="hover:text-red-500 transition"
                    >
                        <FiHeart
                            size={18}
                            fill={
                                snippet.favorite
                                    ? "currentColor"
                                    : "none"
                            }
                            className={
                                snippet.favorite
                                    ? "text-red-500"
                                    : ""
                            }
                        />
                    </button>
                </div>
            </div>

            {/* Code Preview */}

            <div className="mt-6">
                <CodePreview
                    code={snippet.code}
                    language={snippet.language}
                    maxHeight="240px"
                />
            </div>

            {/* Footer */}

            <div className="flex justify-between items-center mt-6 border-t border-border pt-5">
                <span className="text-xs text-muted">
                    Updated{" "}
                    {new Date(
                        snippet.updatedAt
                    ).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-5">
                    <button
                        onClick={copyCode}
                        title="Copy"
                        className="hover:text-primary transition"
                    >
                        <FiCopy size={18} />
                    </button>

                    <button
                        onClick={downloadCode}
                        title="Download"
                        className="hover:text-primary transition"
                    >
                        <FiDownload size={18} />
                    </button>

                    <button
                        onClick={onEdit}
                        title="Edit"
                        className="hover:text-primary transition"
                    >
                        <FiEdit2 size={18} />
                    </button>

                    <button
                        onClick={onDelete}
                        title="Delete"
                        className="hover:text-red-500 transition"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
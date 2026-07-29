import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FiCopy,
    FiDownload,
    FiGlobe,
} from "react-icons/fi";

import api from "../api/axios";
import Layout from "../components/Layout";
import CodePreview from "../components/CodePreview";

const LANGUAGES = [
    "All",
    "javascript",
    "typescript",
    "cpp",
    "c",
    "java",
    "python",
    "go",
    "rust",
    "php",
    "html",
    "css",
    "json",
    "sql",
    "bash",
];

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

export default function Explore() {
    const [params] = useSearchParams();

    const keyword = (
        params.get("search") || ""
    ).toLowerCase();

    const [snippets, setSnippets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [language, setLanguage] =
        useState("All");

    useEffect(() => {
        loadSnippets();
    }, []);

    const loadSnippets = async () => {
        try {
            setLoading(true);

            const { data } =
                await api.get(
                    "/snippets/explore"
                );

            const response = data.data || data;
            
setSnippets(response.snippets || []);
        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                    "Unable to load snippets"
            );
        } finally {
            setLoading(false);
        }
    };

    const duplicateSnippet =
        async (id) => {
            try {
                await api.post(
                    `/snippets/${id}/duplicate`
                );

                toast.success(
                    "Snippet added to your library"
                );
            } catch (error) {
                toast.error(
                    error.response?.data
                        ?.message ||
                        "Duplicate failed"
                );
            }
        };

    const copyCode = async (code) => {
        try {
            await navigator.clipboard.writeText(
                code
            );

            toast.success(
                "Code copied"
            );
        } catch {
            toast.error(
                "Unable to copy code"
            );
        }
    };

    const downloadCode = (
        title,
        language,
        code
    ) => {
        const extension =
            EXTENSIONS[language] ||
            "txt";

        const blob = new Blob([code], {
            type: "text/plain",
        });

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = `${title}.${extension}`;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(url);
    };

    const filtered =
        useMemo(() => {
            return snippets.filter(
                (snippet) => {
                    const matchesSearch =
                        !keyword ||
                        snippet.title
                            ?.toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        snippet.description
                            ?.toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        snippet.language
                            ?.toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        snippet.tags?.some(
                            (tag) =>
                                tag
                                    .toLowerCase()
                                    .includes(
                                        keyword
                                    )
                        );

                    const matchesLanguage =
                        language ===
                            "All" ||
                        snippet.language ===
                            language;

                    return (
                        matchesSearch &&
                        matchesLanguage
                    );
                }
            );
        }, [
            snippets,
            keyword,
            language,
        ]);
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Explore
                    </h1>

                    <p className="text-muted mt-2">
                        Browse public
                        snippets shared by
                        the community.
                    </p>
                </div>

                <select
                    value={language}
                    onChange={(e) =>
                        setLanguage(
                            e.target
                                .value
                        )
                    }
                    className="bg-card border border-border rounded-xl px-4 py-3"
                >
                    {LANGUAGES.map(
                        (lang) => (
                            <option
                                key={lang}
                            >
                                {lang}
                            </option>
                        )
                    )}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    Loading snippets...
                </div>
            ) : filtered.length ===
              0 ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                    <h2 className="text-2xl font-semibold">
                        No snippets found
                    </h2>

                    <p className="text-muted mt-3">
                        Try changing the
                        search or language
                        filter.
                    </p>
                </div>
            ) : (
                <div className="grid xl:grid-cols-2 gap-6">
                    {filtered.map(
                        (snippet) => (
                            <div
                                key={
                                    snippet._id
                                }
                                className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {
                                                snippet.title
                                            }
                                        </h2>

                                        <p className="text-muted mt-2 line-clamp-2">
                                            {
                                                snippet.description
                                            }
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <span className="bg-primary px-3 py-1 rounded-full text-sm">
                                                {
                                                    snippet.language
                                                }
                                            </span>

                                            {snippet.tags?.map(
                                                (
                                                    tag
                                                ) => (
                                                    <span
                                                        key={
                                                            tag
                                                        }
                                                        className="bg-background border border-border rounded-full px-3 py-1 text-xs"
                                                    >
                                                        #
                                                        {
                                                            tag
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <p className="text-xs text-muted mt-4">
                                            Shared
                                            by{" "}
                                            <span className="font-medium text-white">
                                                {snippet
                                                    .owner
                                                    ?.name ||
                                                    "Anonymous"}
                                            </span>
                                        </p>
                                    </div>

                                    <FiGlobe className="text-green-400" />
                                </div>
                                
                                <div className="mt-5">
                                    <CodePreview
                                        code={snippet.code}
                                        language={snippet.language}
                                        maxHeight="250px"
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6 border-t border-border pt-4">
                                    <button
                                        onClick={() =>
                                            copyCode(
                                                snippet.code
                                            )
                                        }
                                        className="hover:text-primary"
                                    >
                                        <FiCopy />
                                    </button>

                                    <button
                                        onClick={() =>
                                            downloadCode(
                                                snippet.title,
                                                snippet.language,
                                                snippet.code
                                            )
                                        }
                                        className="hover:text-primary"
                                    >
                                        <FiDownload />
                                    </button>

                                    <button
                                        onClick={() =>
                                            duplicateSnippet(
                                                snippet._id
                                            )
                                        }
                                        className="bg-primary px-5 py-2 rounded-lg hover:opacity-90"
                                    >
                                        Duplicate
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </Layout>
    );
}
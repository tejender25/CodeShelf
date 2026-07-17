import { useEffect, useMemo, useState } from "react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Layout from "../components/Layout";
import SnippetCard from "../components/SnippetCard";
import Pagination from "../components/Pagination";

export default function MySnippets() {
    const navigate = useNavigate();

    const [params] = useSearchParams();

    const keyword = (
        params.get("search") || ""
    ).toLowerCase();

    const [snippets, setSnippets] = useState([]);
const [pagination, setPagination] = useState(null);
const [page, setPage] = useState(1);
const [sort, setSort] = useState("newest");
const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSnippets();
    }, [page,sort]);

    const fetchSnippets = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
    `/snippets?page=${page}&limit=10&sort=${sort}`
);

const handleSortChange = (value) => {
    setPage(1);
    setSort(value);
};

const response = data.data || data;

setSnippets(response.snippets);
setPagination(response.pagination);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to load snippets"
            );
        } finally {
            setLoading(false);
        }
    };

    const deleteSnippet = async (id) => {
        const confirmed = window.confirm(
            "Delete this snippet?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/snippets/${id}`);

            fetchSnippets();

            toast.success("Snippet deleted");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Delete failed"
            );
        }
    };

    const toggleFavorite = async (id) => {
        try {
            await api.patch(
                `/snippets/${id}/favorite`
            );

            setSnippets((prev) =>
                prev.map((snippet) =>
                    snippet._id === id
                        ? {
                              ...snippet,
                              favorite:
                                  !snippet.favorite,
                          }
                        : snippet
                )
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to update favorite"
            );
        }
    };

    const filteredSnippets = useMemo(() => {
        if (!keyword) return snippets;

        return snippets.filter((snippet) => {
            const matchesTitle =
                snippet.title
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesDescription =
                snippet.description
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesLanguage =
                snippet.language
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesTags =
                snippet.tags?.some((tag) =>
                    tag
                        .toLowerCase()
                        .includes(keyword)
                );

            return (
                matchesTitle ||
                matchesDescription ||
                matchesLanguage ||
                matchesTags
            );
        });
    }, [snippets, keyword]);

    const changePage = (newPage) => {
    if (
        newPage < 1 ||
        newPage > pagination.totalPages
    )
        return;

    setPage(newPage);

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

    return (
        <Layout>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        My Snippets
                    </h1>

                    <p className="text-muted mt-2">
                        Manage all your saved code
                        snippets.
                    </p>
                </div>

                <div className="flex gap-3 items-center">
    <select
        value={sort}
        onChange={(e) =>
            handleSortChange(
                e.target.value
            )
        }
        className="bg-card border border-border rounded-xl px-4 py-3"
    >
        <option value="newest">
            Newest
        </option>

        <option value="oldest">
            Oldest
        </option>

        <option value="titleAsc">
            Title A-Z
        </option>

        <option value="titleDesc">
            Title Z-A
        </option>

        <option value="language">
            Language
        </option>
    </select>

    <button
        onClick={() =>
            navigate("/snippets/new")
        }
        className="bg-primary px-5 py-3 rounded-xl font-semibold hover:opacity-90"
    >
        + New Snippet
    </button>
</div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    Loading snippets...
                </div>
            ) : filteredSnippets.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                    <h2 className="text-2xl font-semibold">
                        {keyword
                            ? "No matching snippets"
                            : "No snippets found"}
                    </h2>

                    <p className="text-muted mt-3">
                        {keyword
                            ? "Try another search."
                            : "Create your first snippet to get started."}
                    </p>

                    {!keyword && (
                        <button
                            onClick={() =>
                                navigate(
                                    "/snippets/new"
                                )
                            }
                            className="mt-6 bg-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90"
                        >
                            Create Snippet
                        </button>
                    )}
                </div>
            ) : (
                <>
    <div className="grid xl:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => (
            <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onEdit={() =>
                    navigate(
                        `/snippets/${snippet._id}/edit`
                    )
                }
                onDelete={() =>
                    deleteSnippet(
                        snippet._id
                    )
                }
                onFavorite={() =>
                    toggleFavorite(
                        snippet._id
                    )
                }
            />
        ))}
    </div>

    <Pagination
        pagination={pagination}
        onPageChange={changePage}
    />
</>
            )}
        </Layout>
    );
}
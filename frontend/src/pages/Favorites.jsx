import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

import Layout from "../components/Layout";
import SnippetCard from "../components/SnippetCard";

export default function Favorites() {
    const navigate = useNavigate();

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            setLoading(true);

            // Fetch all snippets and filter favorites.
            // If your backend later provides /snippets/favorites,
            // only this function needs to change.
            const { data } = await api.get("/snippets");

            const allSnippets = data.data || data;

            setSnippets(
                allSnippets.filter(
                    (snippet) => snippet.favorite
                )
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to load favorites"
            );
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (id) => {
        try {
            await api.patch(
                `/snippets/${id}/favorite`
            );

            setSnippets((prev) =>
                prev.filter(
                    (snippet) =>
                        snippet._id !== id
                )
            );

            toast.success(
                "Removed from favorites"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to update favorite"
            );
        }
    };

    const deleteSnippet = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this snippet?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/snippets/${id}`);

            setSnippets((prev) =>
                prev.filter(
                    (snippet) =>
                        snippet._id !== id
                )
            );

            toast.success("Snippet deleted");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Delete failed"
            );
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Favorite Snippets
                    </h1>

                    <p className="text-muted mt-2">
                        Quickly access your most
                        important snippets.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    Loading favorites...
                </div>
            ) : snippets.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-semibold">
                        No favorite snippets
                    </h2>

                    <p className="text-muted mt-3">
                        Mark snippets as favorites
                        to see them here.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/snippets")
                        }
                        className="mt-6 bg-primary px-6 py-3 rounded-xl"
                    >
                        Browse Snippets
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {snippets.map((snippet) => (
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
                                removeFavorite(
                                    snippet._id
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
}
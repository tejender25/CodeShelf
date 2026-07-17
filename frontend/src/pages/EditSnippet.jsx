import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Layout from "../components/Layout";
import SnippetEditor from "../components/SnippetEditor";

export default function EditSnippet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSnippet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchSnippet = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/snippets/${id}`
            );

            setSnippet(data.data || data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to load snippet"
            );

            navigate("/snippets");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        try {
            setSaving(true);

            await api.put(
                `/snippets/${id}`,
                values
            );

            toast.success(
                "Snippet updated successfully"
            );

            navigate("/snippets");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update snippet"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center py-20">
                    <h2 className="text-xl font-semibold">
                        Loading snippet...
                    </h2>
                </div>
            </Layout>
        );
    }

    if (!snippet) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold">
                        Snippet not found
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/snippets")
                        }
                        className="mt-6 bg-primary px-6 py-3 rounded-xl"
                    >
                        Back
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Edit Snippet
                    </h1>

                    <p className="text-muted mt-2">
                        Update your snippet and save
                        the latest version.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate("/snippets")
                    }
                    className="border border-border px-5 py-2 rounded-xl hover:bg-card transition"
                >
                    Cancel
                </button>
            </div>

            <SnippetEditor
                initialData={snippet}
                loading={saving}
                onSubmit={handleUpdate}
            />
        </Layout>
    );
}
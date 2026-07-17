import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Layout from "../components/Layout";
import SnippetEditor from "../components/SnippetEditor";

export default function CreateSnippet() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleCreate = async (snippetData) => {
        try {
            setLoading(true);

            const { data } = await api.post(
                "/snippets",
                snippetData
            );

            toast.success("Snippet created successfully");

            const createdSnippet =
                data?.data || data;

            navigate(
                `/snippets/${createdSnippet._id}/edit`
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to create snippet"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Create New Snippet
                </h1>

                <p className="text-muted mt-2">
                    Save reusable code for future
                    projects.
                </p>
            </div>

            <SnippetEditor
                loading={loading}
                onSubmit={handleCreate}
            />
        </Layout>
    );
}
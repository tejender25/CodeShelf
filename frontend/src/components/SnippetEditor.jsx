import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

const LANGUAGES = [
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

export default function SnippetEditor({
    initialData,
    onSubmit,
    loading = false,
}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        language: "javascript",
        visibility: "private",
        tags: "",
        code: "",
    });

    useEffect(() => {
    if (!initialData) return;

    setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        language: initialData.language || "javascript",
        visibility: initialData.visibility || "private",
        tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : "",
        code: initialData.code || "",
    });
}, []);

    const updateField = (
        key,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            toast.error(
                "Title is required"
            );
            return;
        }

        if (!form.code.trim()) {
            toast.error(
                "Code cannot be empty"
            );
            return;
        }

        onSubmit({
            ...form,
            tags: form.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="bg-card border border-border rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Title
                        </label>

                        <input
                            value={form.title}
                            onChange={(e) =>
                                updateField(
                                    "title",
                                    e.target
                                        .value
                                )
                            }
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
                            placeholder="Snippet title"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Language
                        </label>

                        <select
                            value={
                                form.language
                            }
                            onChange={(e) =>
                                updateField(
                                    "language",
                                    e.target
                                        .value
                                )
                            }
                            className="w-full bg-background border border-border rounded-xl px-4 py-3"
                        >
                            {LANGUAGES.map(
                                (lang) => (
                                    <option
                                        key={
                                            lang
                                        }
                                    >
                                        {lang}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Visibility
                        </label>

                        <select
                            value={
                                form.visibility
                            }
                            onChange={(e) =>
                                updateField(
                                    "visibility",
                                    e.target
                                        .value
                                )
                            }
                            className="w-full bg-background border border-border rounded-xl px-4 py-3"
                        >
                            <option value="private">
                                Private
                            </option>

                            <option value="public">
                                Public
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Tags
                        </label>

                        <input
                            value={form.tags}
                            onChange={(e) =>
                                updateField(
                                    "tags",
                                    e.target
                                        .value
                                )
                            }
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
                            placeholder="react, node, api"
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <label className="block mb-2 text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={
                            form.description
                        }
                        onChange={(e) =>
                            updateField(
                                "description",
                                e.target
                                    .value
                            )
                        }
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 resize-none outline-none focus:border-primary"
                        placeholder="Describe this snippet..."
                    />
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <Editor
                    height="600px"
                    language={
                        form.language
                    }
                    theme="vs-dark"
                    value={form.code}
                    onChange={(value) =>
                        updateField(
                            "code",
                            value || ""
                        )
                    }
                    options={{
                        fontSize: 15,
                        minimap: {
                            enabled:
                                false,
                        },
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                    }}
                />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={loading}
                    className="bg-primary px-8 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : "Save Snippet"}
                </button>
            </div>
        </form>
    );
}
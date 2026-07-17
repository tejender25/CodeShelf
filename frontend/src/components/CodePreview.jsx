import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const LANGUAGE_MAP = {
    javascript: "javascript",
    typescript: "typescript",
    cpp: "cpp",
    c: "c",
    java: "java",
    python: "python",
    go: "go",
    rust: "rust",
    php: "php",
    html: "markup",
    css: "css",
    json: "json",
    sql: "sql",
    bash: "bash",
};
export default function CodePreview({
    code,
    language,
    maxHeight = "300px",
}) {
    return (
        <div
            className="rounded-xl overflow-hidden border border-border"
            style={{
                maxHeight,
                overflow: "auto",
            }}
        >
            <SyntaxHighlighter
                language={LANGUAGE_MAP[language] || "text"}
                style={oneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "#0f172a",
                    fontSize: "14px",
                    minHeight: "100%",
                }}
            >
                {code || ""}
            </SyntaxHighlighter>
        </div>
    );
}
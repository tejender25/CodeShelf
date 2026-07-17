import { Link } from "react-router-dom";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center px-6">
            <div className="max-w-lg text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                    <FiAlertTriangle
                        size={46}
                        className="text-red-400"
                    />
                </div>

                <h1 className="mt-8 text-6xl font-bold">
                    404
                </h1>

                <h2 className="mt-3 text-3xl font-semibold">
                    Page Not Found
                </h2>

                <p className="mt-4 text-muted leading-7">
                    The page you're looking for
                    doesn't exist or may have been
                    moved.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 mt-8 bg-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    <FiHome />
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}
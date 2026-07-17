import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiBookOpen, FiLogOut, FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [params, setParams] = useSearchParams();

    const search = params.get("search") || "";

    const handleSearch = (e) => {
        const value = e.target.value;

        const next = new URLSearchParams(params);

        if (value.trim()) next.set("search", value);
        else next.delete("search");

        setParams(next);
    };
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            <Link
                to="/dashboard"
                className="flex items-center gap-3"
            >
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <FiBookOpen />
                </div>

                <div>
                    <h1 className="font-bold text-xl">
                        CodeShelf
                    </h1>

                    <p className="text-xs text-muted">
                        Your Personal Code Library
                    </p>
                </div>
            </Link>

            <div className="hidden md:flex items-center bg-background rounded-xl px-4 py-2 w-96">
                <FiSearch className="text-muted" />

                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="bg-transparent ml-3 w-full outline-none"
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                    <p>{user?.name}</p>

                    <p className="text-xs text-muted">
                        {user?.email}
                    </p>
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-border hover:bg-background transition"
                    title="Toggle Theme"
                >
                    {theme === "dark" ? (
                        <FiSun size={20} />
                    ) : (
                        <FiMoon size={20} />
                    )}
                </button>

                <button onClick={handleLogout}>
                    <FiLogOut size={20} />
                </button>
            </div>
        </header>
    );
}
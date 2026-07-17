import { NavLink } from "react-router-dom";

import {
    FiGrid,
    FiCode,
    FiCompass,
    FiStar,
    FiPlusCircle,
} from "react-icons/fi";

const links = [
    {
        title: "Dashboard",
        icon: FiGrid,
        path: "/dashboard",
    },
    {
        title: "My Snippets",
        icon: FiCode,
        path: "/snippets",
    },
    {
        title: "Favorites",
        icon: FiStar,
        path: "/favorites",
    },
    {
        title: "Explore",
        icon: FiCompass,
        path: "/explore",
    },
    {
        title: "New Snippet",
        icon: FiPlusCircle,
        path: "/snippets/new",
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen hidden lg:block">
            <div className="p-6">
                <nav className="space-y-2">
                    {links.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                        isActive
                                            ? "bg-primary text-white"
                                            : "hover:bg-background"
                                    }`
                                }
                            >
                                <Icon size={18} />

                                {item.title}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
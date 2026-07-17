import { useEffect, useState } from "react";

import {
    FiCode,
    FiGlobe,
    FiLock,
    FiStar,
} from "react-icons/fi";

import api from "../api/axios";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import RecentSnippetCard from "../components/RecentSnippetCard";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    const [loading, setLoading] =
        useState(true);

    const [stats, setStats] = useState({
        overview: {
            total: 0,
            public: 0,
            private: 0,
            favorite: 0,
        },
        recentSnippets: [],
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const { data } = await api.get(
                "/snippets/stats"
            );

            setStats(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back,{" "}
                    {user?.name?.split(" ")[0]} 👋
                </h1>

                <p className="text-muted mt-2">
                    Here's an overview of your
                    snippets.
                </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                <StatCard
                    title="Total Snippets"
                    value={
                        stats.overview.total
                    }
                    icon={FiCode}
                />

                <StatCard
                    title="Public"
                    value={
                        stats.overview.public
                    }
                    icon={FiGlobe}
                    color="bg-green-600"
                />

                <StatCard
                    title="Private"
                    value={
                        stats.overview.private
                    }
                    icon={FiLock}
                    color="bg-orange-600"
                />

                <StatCard
                    title="Favorites"
                    value={
                        stats.overview.favorite
                    }
                    icon={FiStar}
                    color="bg-yellow-500"
                />
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                    Recent Snippets
                </h2>

                {loading ? (
                    <div className="text-muted">
                        Loading...
                    </div>
                ) : stats.recentSnippets
                      .length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-10 text-center">
                        <h3 className="text-xl font-semibold">
                            No snippets yet
                        </h3>

                        <p className="text-muted mt-2">
                            Create your first
                            snippet to get
                            started.
                        </p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-5">
                        {stats.recentSnippets.map(
                            (snippet) => (
                                <RecentSnippetCard
                                    key={
                                        snippet._id
                                    }
                                    snippet={
                                        snippet
                                    }
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
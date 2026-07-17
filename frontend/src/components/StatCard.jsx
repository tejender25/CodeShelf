import React from "react";

export default function StatCard({
    title,
    value,
    icon,
    color = "bg-primary",
}) {
    const Icon = icon;

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-muted text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>
                </div>

                <div
                    className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center`}
                >
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}
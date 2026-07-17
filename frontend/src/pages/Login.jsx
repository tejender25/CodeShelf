import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FiBookOpen } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await login(form.email, form.password);

            toast.success("Welcome back!");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-5">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-card p-8">

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary p-4 rounded-2xl mb-4">
                        <FiBookOpen size={30} />
                    </div>

                    <h1 className="text-3xl font-bold">
                        CodeShelf
                    </h1>

                    <p className="text-muted mt-2">
                        Sign in to your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-2 text-sm">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-primary rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                    >
                        {loading
                            ? "Signing In..."
                            : "Login"}
                    </button>
                </form>

                <p className="text-center mt-6 text-muted">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
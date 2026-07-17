import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FiBookOpen } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (
            form.password !== form.confirmPassword
        ) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            toast.error(
                "Password should be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            await register(
                form.name,
                form.email,
                form.password
            );

            toast.success("Registration successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Registration failed"
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
                        Create Account
                    </h1>

                    <p className="text-muted mt-2">
                        Join CodeShelf today
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                        placeholder="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-primary"
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-primary rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>
                </form>

                <p className="text-center mt-6 text-muted">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary font-semibold"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
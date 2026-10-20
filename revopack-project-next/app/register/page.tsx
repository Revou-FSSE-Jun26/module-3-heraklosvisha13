"use client";

import { useState } from "react" ;
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register, login as loginApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PublicOnlyRoute from "../components/PublicOnlyRoute";

/* ===================================================
   TYPES
   =================================================== */
interface RegisterFormData {
    username : string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

/* ===================================================
   VALIDATE
   =================================================== */
function validate(data: RegisterFormData): RegisterFormErrors {
    const errors: RegisterFormErrors = {};

    if (!data.username.trim()) {
        errors.username = "Username is required";
    } else if (data.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Passwords must be at least 6 characters";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

/* ====================================================
   COMPONENT
   ==================================================== */
export default function RegisterPage() {
    const router = useRouter();
    const { login: setAuthUser } = useAuth();

    const [form,setForm] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(field: keyof RegisterFormData, value: string) {
        const updated = { ...form, [field]: value };
        setForm(updated);
        if (submitted) setErrors(validate(updated));
        if (apiError) setApiError("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        setApiError("");

        try {
            await register(form.username, form.email, form.password);
            const { user, token } = await loginApi(form.email, form.password);
            setAuthUser(user, token);
            router.push("/");
        } catch (err) {
            setApiError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PublicOnlyRoute>
            <main className="max-w-md mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                    <h1 className="text-3xl font-extrabold mb-2 text-center">
                        Create Account
                    </h1>
                    <p className="text-slate-600 text-center mb-8">
                    Join us today! It only takes a minute
                    </p>

                    {/* API Error */}
                    {apiError && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        {/* USERNAME */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Username
                            </label>
                            <input
                                value={form.username}
                                onChange={(e) => handleChange("username", e.target.value)}
                                placeholder="e.g. budi_santoso"
                                className={`w-full border rounded-lg px-4 py-2 text-sm ${errors.username ? "border-red-500" : "border-slate-300"}`} 
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="e.g. budi_santoso@example.com"
                                className={`w-full border rounded-lg px-4 py-2 text-sm ${errors.email ? "border-red-500" : "border-slate-300"}`} 
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                placeholder="min 6 characters"
                                className={`w-full border rounded-lg px-4 py-2 text-sm ${errors.password ? "border-red-500" : "border-slate-300"}`} 
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                placeholder="Type password again"
                                className={`w-full border rounded-lg px-4 py-2 text-sm ${errors.confirmPassword ? "border-red-500" : "border-slate-300"}`} 
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    <p className ="text-center text-sm text-slate-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </main>
        </PublicOnlyRoute>
    );
}


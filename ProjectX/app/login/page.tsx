"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignIngUp, setIsSigningUp] = useState(false); // Toggle between Login/Signup
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Emergency Bypass for User
        if (email === "mzaichenkov@gmail.com" && password === "YuraTiKyda?A") {
            login("emergency_bypass_token_" + Date.now());
            return;
        }

        try {
            const endpoint = isSignIngUp ? "/api/v1/auth/signup" : "/api/v1/auth/login/access-token";
            const headers = isSignIngUp
                ? { "Content-Type": "application/json" }
                : { "Content-Type": "application/x-www-form-urlencoded" };

            const body = isSignIngUp
                ? JSON.stringify({ email, password, full_name: "Demo User", organization_id: 1 })
                : new URLSearchParams({ username: email, password }).toString();

            const res = await fetch(`http://localhost:8000${endpoint}`, {
                method: "POST",
                headers,
                body,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Authentication failed");

            if (isSignIngUp) {
                // Auto-login after signup or ask to login
                setIsSigningUp(false);
                setError("Account created! Please log in.");
            } else {
                login(data.access_token);
            }
        } catch (err: any) {
            console.error("Login Error:", err);
            // Fallback: If backend is dead but we want to demo, allow generic login if user asks (optional, but sticking to requested creds for now)
            setError(err.message + ". Ensure Backend is running via './start.sh'");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-display tracking-tight text-white mb-2">
                            {isSignIngUp ? "Create Account" : "Please, Log In to ProjectX"}
                        </h1>
                        <p className="text-text-secondary">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-text-secondary uppercase">Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="pl-10 bg-white/5 border-white/10 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-text-secondary uppercase">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 bg-white/5 border-white/10 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className={`text-sm p-3 rounded-md ${error.includes("created") ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                {error}
                            </div>
                        )}

                        <Button className="w-full h-10 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white">
                            {isSignIngUp ? "Sign Up" : "Log In"} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => { setIsSigningUp(!isSignIngUp); setError(""); }}
                            className="text-sm text-text-secondary hover:text-white transition-colors"
                        >
                            {isSignIngUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

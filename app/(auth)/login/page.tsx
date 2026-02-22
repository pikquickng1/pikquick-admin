"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/pikquick-logo.svg"
                        alt="PikQuick Logo"
                        width={180}
                        height={50}
                        className="h-12 w-auto"
                    />
                </div>

                {/* Login Card */}
                <div className=" p-8">
                    <h1 className="text-2xl font-semibold text-center mb-2 text-text-primary">
                        Welcome Back, Sign In
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* Email/Phone Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-text-primary">
                                Email Address / Phone Number
                            </Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your email or phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-text-primary">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Log In"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

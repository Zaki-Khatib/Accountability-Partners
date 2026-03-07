import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, User, ArrowRight, Heart, Sparkles, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signup, loginWithGoogle, user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/journey");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast({ title: "Error", description: "All fields are required", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            await signup(email, password, name);
            toast({ title: "Account created", description: "Welcome to Accountability Partners!" });
            navigate("/journey");
        } catch (error: any) {
            toast({ title: "Signup Failed", description: error.message || "Could not create account", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel — Gradient Hero */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                {/* Gradient background */}
                <div className="absolute inset-0 gradient-brand" />

                {/* Abstract shapes */}
                <div className="absolute top-32 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <div>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <Heart className="w-8 h-8 fill-white/80" />
                            <span className="text-2xl font-bold tracking-tight">Accountability Partners</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h1 className="text-5xl font-bold leading-tight">
                            Start your journey.<br />
                            <span className="text-white/80">Together, we grow.</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-md">
                            Join a community of people who hold each other accountable and celebrate every win along the way.
                        </p>

                        <div className="flex gap-6 pt-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-sm">Set Goals</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Rocket className="w-5 h-5" />
                                </div>
                                <span className="text-sm">Stay Motivated</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-white/40 text-sm">
                        © 2026 Accountability Partners. Built with love for builders.
                    </p>
                </div>
            </motion.div>

            {/* Right Panel — Signup Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background"
            >
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
                        <Heart className="w-6 h-6 fill-current text-primary" />
                        <span
                            className="text-xl font-bold tracking-tight cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Accountability Partners
                        </span>
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="text-muted-foreground">
                            Sign up to start your accountability journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 h-12"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-12"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 gradient-brand text-white border-0 text-base font-semibold group"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating Account...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Create Account
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-3 text-muted-foreground">or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            text="signup_with"
                            onSuccess={async (credentialResponse) => {
                                if (credentialResponse.credential) {
                                    try {
                                        setIsLoading(true);
                                        await loginWithGoogle(credentialResponse.credential);
                                        toast({ title: "Account Created", description: "Successfully signed up with Google." });
                                        navigate("/journey");
                                    } catch (err: any) {
                                        toast({ title: "Signup Failed", description: err.message, variant: "destructive" });
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }
                            }}
                            onError={() => {
                                toast({ title: "Error", description: "Google Signup Failed", variant: "destructive" });
                            }}
                        />
                    </div>

                    <p className="text-sm text-center text-muted-foreground pt-4">
                        Already have an account?{" "}
                        <span
                            className="text-primary font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

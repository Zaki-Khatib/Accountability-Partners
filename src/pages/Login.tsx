import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { User, Eye, EyeOff, Facebook, Twitter, Shield } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, loginWithGoogle, user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/journey");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({ title: "Error", description: "Email and password are required", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            toast({ title: "Welcome back!", description: "Successfully logged in." });
            navigate("/journey");
        } catch (error: any) {
            toast({ title: "Login Failed", description: error.message || "Invalid credentials", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-[#eff3f8]">
            {/* Background Illustration Simulation (Abstract Blue Waves) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="absolute w-[150%] h-[150%] -left-[20%] -top-[20%] opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path fill="#2c4295" d="M0,500 C150,600 250,300 500,500 C750,700 850,400 1000,500 L1000,1000 L0,1000 Z" />
                    <path fill="#1a2b72" d="M0,600 C200,800 300,500 600,700 C900,900 950,600 1000,700 L1000,1000 L0,1000 Z" />
                </svg>
            </div>

            {/* Main Layout Area */}
            <div className="w-full flex justify-end items-center p-6 sm:p-12 z-10 max-w-7xl mx-auto">
                {/* Left Side Branding Placeholder (Hidden on small screens) */}
                <div className="hidden lg:flex flex-col flex-1 text-[#1a2b72] px-12">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Accountability<br />Partners</h1>
                    <p className="text-xl font-medium max-w-md">Rowing together towards success. Log in to continue your journey.</p>
                </div>

                {/* Yellow Login Card (Right Side) */}
                <div className="w-full max-w-md bg-[#ffbe1a] rounded-[2rem] shadow-2xl p-10 flex flex-col pt-12 pb-14 border border-black/5">
                    <h2 className="text-[#0d1544] text-3xl font-bold text-center mb-8">Login to continue</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username/Email Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d1544] flex items-center justify-center p-1 rounded-full bg-white">
                                <User className="w-5 h-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Username/Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-full bg-white h-14 pl-14 pr-6 text-base font-medium text-black placeholder:text-gray-400 border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#0d1544]"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d1544] flex items-center justify-center p-1 rounded-full bg-white hover:bg-gray-50 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-full bg-white h-14 pl-14 pr-6 text-base font-medium text-black placeholder:text-gray-400 border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#0d1544]"
                                required
                            />
                        </div>

                        {/* Remmeber me / Forget password */}
                        <div className="flex justify-between items-center text-[#0d1544] text-sm font-medium px-2 py-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-full border-2 border-[#0d1544] text-[#0d1544] focus:ring-[#0d1544] bg-transparent cursor-pointer" />
                                <span>Remember me</span>
                            </label>
                            <button type="button" className="hover:underline opacity-80 hover:opacity-100">
                                Forget password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <Button
                            className="w-full rounded-full bg-[#0d1544] hover:bg-[#080d2b] shadow-lg text-white h-14 text-lg font-bold tracking-wide mt-2"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>

                    {/* Social Login / Sign Up options */}
                    <div className="mt-8 flex flex-col items-center gap-4 text-[#0d1544] font-medium">
                        <p className="text-sm">or sign up using</p>
                        <div className="flex items-center gap-3">
                            <button type="button" className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white shadow hover:scale-105 transition-transform" aria-label="Facebook">
                                <Facebook className="w-5 h-5 fill-current" />
                            </button>
                            <button type="button" className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white shadow hover:scale-105 transition-transform" aria-label="Twitter">
                                <Twitter className="w-5 h-5 fill-current" />
                            </button>
                            <div className="w-10 h-10 overflow-hidden flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition-transform cursor-pointer">
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        if (credentialResponse.credential) {
                                            try {
                                                setIsLoading(true);
                                                await loginWithGoogle(credentialResponse.credential);
                                                toast({ title: "Welcome back!", description: "Successfully logged in with Google." });
                                                navigate("/journey");
                                            } catch (err: any) {
                                                toast({ title: "Login Failed", description: err.message, variant: "destructive" });
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        }
                                    }}
                                    onError={() => {
                                        toast({ title: "Error", description: "Google Login Failed", variant: "destructive" });
                                    }}
                                    useOneTap
                                    type="icon"
                                    shape="circle"
                                />
                            </div>
                        </div>
                        <p className="text-sm mt-4">
                            Don't have an account?{" "}
                            <span
                                className="font-bold cursor-pointer hover:underline"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav button to go back */}
            <Button
                variant="ghost"
                className="absolute top-6 left-6 z-20 hover:bg-white/20 text-[#0d1544]"
                onClick={() => navigate("/")}
            >
                <Shield className="w-5 h-5 mr-2" /> Back
            </Button>
        </div>
    );
}

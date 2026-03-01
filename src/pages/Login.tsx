import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import Navbar from "@/components/Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 pt-24">
            <Navbar visible={true} />
            <Card className="w-full max-w-md shadow-xl glass-card relative z-10">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">Login</CardTitle>
                    <CardDescription>Enter your email to sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button className="w-full gradient-brand text-white border-0" type="submit" disabled={isLoading}>
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
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
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                        Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

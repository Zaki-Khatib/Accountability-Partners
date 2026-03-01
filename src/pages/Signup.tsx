import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import Navbar from "@/components/Navbar";

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
            toast({ title: "Account created", description: "Welcome to Accountability Partners Hub!" });
            navigate("/journey");
        } catch (error: any) {
            toast({ title: "Signup Failed", description: error.message || "Could not create account", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 pt-24">
            <Navbar visible={true} />
            <Card className="w-full max-w-md shadow-xl glass-card relative z-10">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">Sign Up</CardTitle>
                    <CardDescription>Create a new account to start your journey</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button className="w-full gradient-brand text-white border-0" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
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
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                        Already have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate("/login")}>Log in</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

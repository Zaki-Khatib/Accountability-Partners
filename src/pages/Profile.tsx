import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in.</p>
                <Button onClick={() => navigate("/login")} className="ml-4">Go to Login</Button>
            </div>
        );
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ name, photoUrl });
        toast({ title: "Profile updated", description: "Your changes have been saved." });
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast({ title: "Logged out", description: "You have been fully logged out." });
    };

    return (
        <div className="relative min-h-screen pt-24 bg-background">
            <Navbar visible={true} />
            <div className="max-w-2xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-display font-bold mb-8">Your Profile</h1>

                <Card className="glass-card mb-8">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <img src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Profile" className="w-24 h-24 rounded-full border border-border" />
                                <div className="flex-1 space-y-2">
                                    <label htmlFor="photoUrl" className="text-sm font-medium">Profile Photo URL</label>
                                    <Input id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" value={user.email} disabled className="bg-muted" />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                <Button type="button" variant="destructive" onClick={handleLogout}>Log Out</Button>
                                <Button type="submit" className="gradient-brand text-white border-0">Save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

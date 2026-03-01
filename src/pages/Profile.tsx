import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { User as UserIcon, Shield, Target, Quote, Mail, BadgeCheck } from "lucide-react";

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [motto, setMotto] = useState(user?.motto || "");
    const [focusArea, setFocusArea] = useState(user?.focusArea || "");
    const [note, setNote] = useState(user?.note || "");

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in.</p>
                <Button onClick={() => navigate("/login")} className="ml-4">Go to Login</Button>
            </div>
        );
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({ name, motto, focusArea, note });
            toast({ title: "Profile updated", description: "Your changes have been saved." });
        } catch (err) {
            toast({ title: "Update failed", description: "Something went wrong.", variant: "destructive" });
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast({ title: "Logged out", description: "You have been fully logged out." });
    };

    return (
        <div className="relative min-h-screen pt-24 bg-background overflow-x-hidden">
            <Navbar visible={true} />
            <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold mb-2">Settings</h1>
                        <p className="text-muted-foreground">Manage your identity and accountability focus.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Public Profile Card */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon size={20} className="text-primary" />
                                Public Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all opacity-50" />
                                            <img
                                                src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full border-2 border-white/50 relative z-10 shadow-xl object-cover"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg z-20 border border-border">
                                                <BadgeCheck size={20} className="text-primary" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-lg">{user.name}</p>
                                            <p className="text-primary font-mono text-xs tracking-widest uppercase">#{user.tag}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="bg-background/50 border-border/50 focus:border-primary/50"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="motto" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <Quote size={14} /> Personal Motto
                                            </label>
                                            <Input
                                                id="motto"
                                                value={motto}
                                                onChange={(e) => setMotto(e.target.value)}
                                                placeholder="e.g. Growing together with friends"
                                                className="bg-background/50 border-border/50 focus:border-primary/50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-2">
                                        <label htmlFor="focusArea" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Target size={14} /> Focus Area
                                        </label>
                                        <Input
                                            id="focusArea"
                                            value={focusArea}
                                            onChange={(e) => setFocusArea(e.target.value)}
                                            placeholder="e.g. Web Development, Fitness, Writing"
                                            className="bg-background/50 border-border/50 focus:border-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Mail size={14} /> Email Address
                                        </label>
                                        <Input id="email" value={user.email} disabled className="bg-muted opacity-80" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="note" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About Me / My Journey</label>
                                    <Textarea
                                        id="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Share a bit about why you are here..."
                                        className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                                    />
                                </div>

                                <div className="flex justify-between items-center pt-8 border-t border-border/50 gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20"
                                    >
                                        Log Out
                                    </Button>
                                    <Button type="submit" className="gradient-brand text-white border-0 px-8 shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Account Security Placeholder */}
                    <Card className="glass-card opacity-80 grayscale-[0.5]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Shield size={16} className="text-primary" />
                                Account Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground italic">You are logged in via Google. Security settings are managed through your Google Account.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}

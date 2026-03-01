import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import FriendsEasterEgg from "@/components/FriendsEasterEgg";

// Removed MOCK_FRIENDS, using real backend data now

export default function Friends() {
    const { user, updateProfile } = useAuth();
    const [friends, setFriends] = useState<any[]>([]);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [noteInput, setNoteInput] = useState(user?.note || "");
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchFriends = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("/api/users/friends", {
                headers: {
                    "x-auth-token": token
                }
            });
            if (res.ok) {
                const data = await res.json();
                setFriends(data);
            }
        } catch (error) {
            console.error("Failed to fetch friends", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        if (user) {
            fetchFriends();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const handleSaveNote = () => {
        if (user) {
            updateProfile({ note: noteInput });
        }
        setIsEditingNote(false);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`, {
                headers: { "x-auth-token": token || "" }
            });
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddFriend = async (friendId: string) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/friends/${friendId}`, {
                method: "POST",
                headers: { "x-auth-token": token || "" }
            });
            if (res.ok) {
                toast({ title: "Partner Added!", description: "They are now on your friends list." });
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
                fetchFriends(); // Refresh friends list
            }
        } catch (e) {
            console.error(e);
            toast({ title: "Error", description: "Failed to add partner", variant: "destructive" });
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden pt-24 pb-12">
            <AnimatedBackground />
            <Navbar visible={true} />

            <main className="max-w-6xl mx-auto px-6 relative z-10 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                            Your <FriendsEasterEgg>
                                <span
                                    style={{
                                        background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(16, 95%, 68%), hsl(270, 60%, 68%))",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >Friends</span></FriendsEasterEgg>
                        </h1>
                        <p className="text-muted-foreground text-lg mt-2">
                            See how your accountability <FriendsEasterEgg>friends</FriendsEasterEgg> are doing today.
                        </p>
                        {user && (
                            <p className="text-sm font-medium mt-2 p-2 bg-muted/50 rounded-md inline-block">
                                Your Tag: <span className="font-bold text-primary">{user.name}#{user.tag}</span>
                            </p>
                        )}
                    </div>

                    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                        <DialogTrigger asChild>
                            <Button className="gradient-brand text-primary-foreground border-0 gap-2 shadow-lg hover:shadow-xl transition-all">
                                <UserPlus size={18} />
                                Add Partner
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Find a Partner</DialogTitle>
                                <DialogDescription>Search for someone by their exact tag (e.g. John#1234) or by name.</DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2 mt-4">
                                <Input
                                    placeholder="Jane#5678"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Button onClick={handleSearch} disabled={isSearching}>
                                    {isSearching ? "..." : "Search"}
                                </Button>
                            </div>
                            <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
                                {searchResults.length === 0 && searchQuery && !isSearching && (
                                    <p className="text-sm text-muted-foreground text-center">No users found.</p>
                                )}
                                {searchResults.map((result) => (
                                    <div key={result._id} className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img src={result.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-border" />
                                            <div>
                                                <p className="font-semibold text-sm">{result.name}#{result.tag}</p>
                                                <p className="text-xs text-muted-foreground">Level {Math.floor((result.progress || 0) / 10) + 1}</p>
                                            </div>
                                        </div>
                                        {friends.some(f => f._id.toString() === result._id.toString()) ? (
                                            <span className="text-xs bg-muted px-2 py-1 rounded">Added</span>
                                        ) : (
                                            <Button size="sm" onClick={() => handleAddFriend(result._id)}>Add</Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {!user ? (
                    <Card className="glass-card shadow-lg text-center p-12">
                        <p className="text-muted-foreground mb-4">You need to log in to connect with friends.</p>
                        <Button onClick={() => window.location.href = '/login'} className="gradient-brand text-white border-0">
                            Go to Login
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-10">
                        {/* User Note Section */}
                        <div className="flex flex-col items-center justify-center p-8 text-center bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                            <h2 className="text-xl font-bold mb-6 text-foreground relative z-10">Share Your Status</h2>

                            <div className="relative mb-4 group inline-block z-10">
                                {user.note && !isEditingNote && (
                                    <div
                                        onClick={() => setIsEditingNote(true)}
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border/60 shadow-md px-4 py-2 rounded-2xl rounded-bl-sm cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm text-foreground whitespace-nowrap z-20 animate-fade-in"
                                    >
                                        {user.note}
                                    </div>
                                )}
                                <img
                                    src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-full border-4 border-background shadow-xl hover:scale-105 transition-transform cursor-pointer relative z-10"
                                    onClick={() => setIsEditingNote(true)}
                                />
                                {!user.note && !isEditingNote && (
                                    <div
                                        onClick={() => setIsEditingNote(true)}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-medium text-xs px-3 py-1 rounded-full cursor-pointer whitespace-nowrap shadow-md hover:bg-primary/90 transition-colors z-20"
                                    >
                                        + Add Note
                                    </div>
                                )}
                            </div>

                            {isEditingNote ? (
                                <div className="flex items-center gap-2 max-w-sm w-full mx-auto relative z-10 mt-2">
                                    <Input
                                        value={noteInput}
                                        onChange={(e) => setNoteInput(e.target.value)}
                                        placeholder="What's on your mind today?"
                                        className="text-center rounded-full bg-background border-primary/30 focus-visible:ring-primary/50 shadow-sm h-10"
                                        autoFocus
                                        maxLength={40}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveNote();
                                            if (e.key === 'Escape') setIsEditingNote(false);
                                        }}
                                    />
                                    <Button size="sm" onClick={handleSaveNote} className="rounded-full gradient-brand border-0 shadow-md hover:shadow-lg transition-all">Save</Button>
                                </div>
                            ) : (
                                <p className="text-muted-foreground font-medium mt-2 relative z-10">{user.name}</p>
                            )}
                        </div>

                        {/* Friends Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {friends.length === 0 && !isLoading && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-muted-foreground">
                                    No partners found yet. (Wait for others to register!)
                                </div>
                            )}
                            {isLoading && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-muted-foreground">
                                    Loading your partners...
                                </div>
                            )}
                            {friends.map((friend, index) => (
                                <motion.div
                                    key={friend._id || index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="glass-card h-full transition-all hover:border-primary/30 hover:shadow-xl group">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {friend.note && (
                                                        <div className="absolute -top-12 left-1/2 -translate-x-1/4 bg-card border border-border/60 shadow-md px-3 py-1.5 rounded-2xl rounded-bl-sm text-xs font-medium text-foreground whitespace-nowrap z-10 animate-fade-in">
                                                            {friend.note}
                                                        </div>
                                                    )}
                                                    <img
                                                        src={friend.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.email}`}
                                                        alt={friend.name}
                                                        className="w-14 h-14 rounded-full border-2 border-border/50 group-hover:border-primary transition-colors bg-background flex-shrink-0 object-cover"
                                                    />
                                                    <span
                                                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-background rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground'
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <CardTitle className="text-lg font-semibold truncate">{friend.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground truncate">{friend.email}</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Progress details */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-sm font-medium">
                                                    <span className="flex items-center gap-1.5 text-foreground">
                                                        <Activity size={14} className="text-primary" />
                                                        Daily Progress
                                                    </span>
                                                    <span>{friend.progress}%</span>
                                                </div>
                                                <Progress value={friend.progress} className="h-2 bg-secondary" />
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/30">
                                                {friend.progress === 100 ? (
                                                    <>
                                                        <CheckCircle2 size={16} className="text-green-500" />
                                                        <span className="font-medium text-foreground">All tasks completed!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-medium text-foreground">{friend.tasksCompleted}/{friend.totalTasks}</span> tasks done. Let's encourage them!
                                                    </>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

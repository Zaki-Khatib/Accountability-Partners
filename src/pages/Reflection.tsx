import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Reflection() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Map backend array to a dictionary by date string
    const journalsObj: Record<string, string> = {};
    if (user && user.journals) {
        user.journals.forEach(j => {
            const dateStr = new Date(j.date).toDateString();
            journalsObj[dateStr] = j.text;
        });
    }

    const selectedDateString = date?.toDateString() || "";
    const entryForSelectedDate = journalsObj[selectedDateString];

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in.</p>
                <Button onClick={() => navigate("/login")} className="ml-4">Go to Login</Button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-24 pb-12 bg-background">
            <AnimatedBackground />
            <Navbar visible={true} />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 hover:bg-muted/50"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>

                <h1 className="text-4xl font-display font-bold mb-2">Past Reflections</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Review your journaling history by selecting a date below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Calendar Column */}
                    <Card className="glass-card md:col-span-4 h-fit">
                        <CardHeader>
                            <CardTitle>Select Date</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border border-border/50 bg-background pointer-events-auto"
                            />
                        </CardContent>
                    </Card>

                    {/* Journal Entry Column */}
                    <Card className="glass-card md:col-span-8">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Entry for {date ? date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="min-h-[300px] p-6 rounded-xl bg-muted/30 border border-border/50">
                                {entryForSelectedDate ? (
                                    <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
                                        {entryForSelectedDate}
                                    </p>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground pt-12">
                                        <p className="italic">No reflection recorded for this date.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

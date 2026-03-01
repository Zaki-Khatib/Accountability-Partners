import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Save, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function JournalSection() {
    const [entry, setEntry] = useState("");
    const [summary, setSummary] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { addJournal } = useAuth();

    const handleSave = async () => {
        if (!entry.trim()) return;

        setIsSaving(true);
        try {
            await addJournal(entry);
            setSummary("AI Summary disabled for now."); // Optional: Connect actual AI later
            toast({
                title: "Journal Saved",
                description: "Your daily reflection has been recorded securely.",
            });
            setEntry("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not save journal entry.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="shadow-lg border-border/50 bg-card/50 backdrop-blur-md h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                    Daily Journal
                    {summary && (
                        <span className="text-sm font-normal px-3 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-2">
                            <Bot size={14} /> AI Summary
                        </span>
                    )}
                </CardTitle>
                <CardDescription>
                    {summary ? (
                        <span className="italic text-foreground font-medium">"{summary}"</span>
                    ) : (
                        "Reflect on your progress and challenges today."
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                <Textarea
                    placeholder="How did you feel about your tasks today? What went well?"
                    className="flex-1 min-h-[150px] resize-none border-border/50 focus-visible:ring-primary/30"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />
            </CardContent>

            <CardFooter className="justify-between pt-2">
                <Button
                    variant="outline"
                    onClick={() => navigate("/reflection")}
                    className="border-primary/20 hover:bg-primary/5 text-primary hover:text-primary transition-colors"
                >
                    <History className="mr-2 h-4 w-4" /> Past Entries
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={!entry.trim() || isSaving}
                    className="gradient-brand text-primary-foreground border-0 hover:opacity-90 transition-opacity"
                >
                    {isSaving ? "Analyzing..." : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save Entry
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}

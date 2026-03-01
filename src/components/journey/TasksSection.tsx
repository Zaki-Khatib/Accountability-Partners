import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface Task {
    _id: string;
    text: string;
    completed: boolean;
}

export default function TasksSection() {
    const { user, setUser } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await fetch("/api/users/tasks", {
                headers: { "x-auth-token": token }
            });
            if (res.ok) {
                const data = await res.json();
                // If it's the first fetch, data might be just the tasks array or the object
                if (Array.isArray(data)) {
                    setTasks(data);
                } else if (data.tasks) {
                    setTasks(data.tasks);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const updateGlobalProgress = (data: any) => {
        if (user && setUser) {
            setUser({
                ...user,
                progress: data.progress,
                tasksCompleted: data.tasksCompleted,
                totalTasks: data.totalTasks
            });
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch("/api/users/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token || ""
                },
                body: JSON.stringify({ text: newTask.trim() })
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(data.tasks);
                setNewTask("");
                updateGlobalProgress(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const toggleTask = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/tasks/${id}`, {
                method: "PUT",
                headers: { "x-auth-token": token || "" }
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(data.tasks);
                updateGlobalProgress(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteTask = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/tasks/${id}`, {
                method: "DELETE",
                headers: { "x-auth-token": token || "" }
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(data.tasks);
                updateGlobalProgress(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card className="shadow-lg border-border/50 bg-card/50 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    Daily Tasks
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <Activity size={16} className="text-primary" />
                            Your Daily Progress
                        </span>
                        <span className="text-sm font-bold text-primary">{user?.progress || 0}%</span>
                    </div>
                    <Progress value={user?.progress || 0} className="h-2.5" />
                    <p className="text-[10px] text-muted-foreground mt-2 text-center uppercase tracking-wider font-bold">
                        {user?.tasksCompleted || 0} OF {user?.totalTasks || 0} TASKS COMPLETED
                    </p>
                </div>

                <form onSubmit={addTask} className="flex gap-2">
                    <Input
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" className="gradient-brand border-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>

                <div className="space-y-3 mt-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {isLoading ? (
                        <p className="text-muted-foreground text-center py-4 italic">Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${task.completed
                                    ? "bg-muted/30 border-muted text-muted-foreground"
                                    : "bg-background border-border/50 hover:border-primary/30"
                                    }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <Checkbox
                                        id={`task-${task._id}`}
                                        checked={task.completed}
                                        onCheckedChange={() => toggleTask(task._id)}
                                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <label
                                        htmlFor={`task-${task._id}`}
                                        className={`font-medium truncate cursor-pointer transition-all ${task.completed ? "line-through opacity-70" : ""
                                            }`}
                                    >
                                        {task.text}
                                    </label>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

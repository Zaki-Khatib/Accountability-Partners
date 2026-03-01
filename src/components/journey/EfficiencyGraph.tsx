import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
    { name: "Mon", score: 40 },
    { name: "Tue", score: 65 },
    { name: "Wed", score: 55 },
    { name: "Thu", score: 80 },
    { name: "Fri", score: 70 },
    { name: "Sat", score: 90 },
    { name: "Sun", score: 85 },
];

export default function EfficiencyGraph() {
    return (
        <Card className="shadow-lg border-border/50 bg-card/50 backdrop-blur-md h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Efficiency Tracker</CardTitle>
                <CardDescription>Your performance score over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(340, 82%, 52%)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(340, 82%, 52%)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                }}
                                itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="hsl(340, 82%, 52%)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorScore)"
                                activeDot={{ r: 6, fill: "hsl(340, 82%, 52%)", stroke: "hsl(var(--background))", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

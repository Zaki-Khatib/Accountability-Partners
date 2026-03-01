import { useState, useCallback } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TasksSection from "@/components/journey/TasksSection";
import EfficiencyGraph from "@/components/journey/EfficiencyGraph";
import JournalSection from "@/components/journey/JournalSection";
import { motion } from "framer-motion";

const Journey = () => {
    const [navVisible, setNavVisible] = useState(true);

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col pt-24">
            <AnimatedBackground />
            <Navbar visible={navVisible} />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 relative z-10 flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        Your <span
                            style={{
                                background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(16, 95%, 68%), hsl(270, 60%, 68%))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >Journey</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Track your progress, build habits, and reflect on your days.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(0,_1fr)]">
                    {/* Tasks Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1 flex flex-col"
                    >
                        <TasksSection />
                    </motion.div>

                    {/* Graph Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col min-h-[350px]"
                    >
                        <EfficiencyGraph />
                    </motion.div>
                </div>

                {/* Journal Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col min-h-[300px]"
                >
                    <JournalSection />
                </motion.div>

            </main>

            <Footer />
        </div>
    );
};

export default Journey;

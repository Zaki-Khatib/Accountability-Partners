import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FriendsEasterEggProps {
    children: React.ReactNode;
}

const images = [
    "/friends.jpeg",
    "/friends1.jpeg",
    "/friends2.jpeg",
    "/friends3.jpeg",
    "/friends4.jpeg"
];

export default function FriendsEasterEgg({ children }: FriendsEasterEggProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState("");

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const randomImg = images[Math.floor(Math.random() * images.length)];
        setCurrentImg(randomImg);
        setIsOpen(true);
    };

    return (
        <>
            <span
                onClick={handleClick}
                className="cursor-default inline"
            >
                {children}
            </span>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 max-w-lg w-full bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground hover:bg-background transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="aspect-square w-full relative overflow-hidden bg-muted">
                                <img
                                    src={currentImg}
                                    alt="Friends"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white font-display text-2xl font-bold italic">Better Together.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

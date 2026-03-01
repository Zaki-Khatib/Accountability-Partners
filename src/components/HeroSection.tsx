import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

interface HeroSectionProps {
  onNavReady: () => void;
}

export default function HeroSection({ onNavReady }: HeroSectionProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 600));
      setStage(1);
      await new Promise((r) => setTimeout(r, 800));
      setStage(2);
      await new Promise((r) => setTimeout(r, 1200));
      setStage(3);
      await new Promise((r) => setTimeout(r, 800));
      setStage(4);
      onNavReady();
    };
    sequence();
  }, [onNavReady]);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      {/* Morphing shape that fades into navbar title */}
      <motion.div
        initial={{ width: 100, height: 100, borderRadius: "50%", opacity: 1 }}
        animate={{
          width: stage === 0 ? 100 : stage === 1 ? 160 : stage >= 3 ? 220 : 480,
          height: stage === 0 ? 100 : stage === 1 ? 160 : stage >= 3 ? 50 : 140,
          borderRadius: stage <= 1 ? "50%" : "30px",
          y: stage >= 3 ? -340 : 0,
          opacity: stage >= 4 ? 0 : 1,
          scale: stage >= 3 ? 0.6 : 1,
        }}
        transition={{
          duration: stage >= 3 ? 1 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute z-20 flex items-center justify-center gradient-brand shadow-2xl"
        style={{
          boxShadow: "0 30px 80px hsl(340 82% 52% / 0.25)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage >= 2 && stage < 4 ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 px-6"
        >
          <img src="/accountabilitypartnerslogo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
          <span className="text-primary-foreground font-bold text-2xl md:text-3xl whitespace-nowrap tracking-tight">
            Accountability Partners
          </span>
        </motion.div>
      </motion.div>

      {/* Content that fades in after animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: stage >= 4 ? 1 : 0, y: stage >= 4 ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mt-8"
      >
        <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[1.1] mb-6">
          Stay on track with the{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(16, 95%, 68%), hsl(270, 60%, 68%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            people who matter
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Build habits together with friends who genuinely care. Hold each other
          accountable, celebrate wins, and grow side by side.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="rounded-full gradient-brand text-primary-foreground border-0 px-8 text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300"
            onClick={() => { window.location.href = "/journey"; }}
          >
            Get Started
            <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base hover:scale-105 transition-all duration-300 border-2"
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Heart className="mr-2" size={16} />
            See Features
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

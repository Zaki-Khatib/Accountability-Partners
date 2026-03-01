import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="relative inline-block mb-8">
          <h2 className="font-display text-4xl md:text-6xl text-foreground leading-tight">
            Staying consistent is{" "}
            <span
              className="italic inline-block pb-1"
              style={{
                background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(270, 60%, 68%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              hard
            </span>
            .
          </h2>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We all start strong. New year's resolutions, gym memberships, morning routines.
          But without someone to hold you accountable, motivation fades. Studies show that
          having an accountability partner increases your chance of success by{" "}
          <span
            className="font-bold text-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(16, 95%, 68%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            95%
          </span>
          .
        </p>
      </motion.div>
    </section>
  );
}

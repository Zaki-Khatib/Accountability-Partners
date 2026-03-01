import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign up & set your goals",
    description: "Create your profile and define the habits you want to build. Morning workouts, reading, meditation — anything goes.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Target,
    number: "02",
    title: "Get matched with a partner",
    description: "We pair you with someone who shares similar goals and commitment level. You'll keep each other honest.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Track, share & grow together",
    description: "Check in daily, celebrate streaks, and support each other. Watch your consistency skyrocket.",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-pink-200/50 mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Three simple steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Get started in minutes. Transform your habits in weeks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-px bg-gradient-to-r from-pink-200 via-purple-200 to-orange-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="text-center relative"
            >
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                  <step.icon size={28} className="text-white" />
                </div>
                <span className="absolute -top-3 -right-3 text-xs font-bold bg-white text-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-gray-100">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

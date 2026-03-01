import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, CalendarCheck, Users, Zap, Shield, Bell } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Daily Tracking",
    description:
      "Log your habits daily with a simple, beautiful interface. Streaks, check-ins, and gentle reminders keep you on track.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Visualize your progress with clear charts and insights. See patterns, celebrate wins, and identify areas for growth.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Partner Sync",
    description:
      "Get matched with a partner who shares your goals. See each other's progress and motivate one another in real-time.",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Intelligent nudges at the right time. Never miss a check-in with personalized notification schedules.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays yours. End-to-end encryption ensures your habits and progress are completely private.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Streak Power",
    description:
      "Build momentum with streak tracking. Watch your consistency grow and earn milestones along the way.",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={ref} className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-pink-200/50 mb-4">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Simple, powerful tools designed to help you build lasting habits with your partner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative rounded-3xl p-8 bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-50/50 to-purple-50/50" />
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Quote, Rocket, Users, Heart, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FriendsEasterEgg from "@/components/FriendsEasterEgg";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar visible />

      <section className="relative z-10 pt-32 pb-24 px-6 mt-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-8 tracking-tight">
              My <span className="italic gradient-text pr-2 py-1" style={{
                background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(270, 60%, 68%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Story</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
              "To help me and my <FriendsEasterEgg>friends</FriendsEasterEgg> grow together."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Rocket className="text-primary" size={28} />
                The Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Accountability Partners was born from a simple truth: we're better together.
                Founded by Zaki Khatib, this platform started as a personal mission
                to bridge the gap between setting goals and actually reaching them.
              </p>

              <div className="text-lg text-muted-foreground leading-relaxed mt-8">
                <p>
                  Whether it’s waking up early, going for a run, exercising, or finishing a side project,
                  everything feels different when someone is counting on you. I didn’t want to build another
                  complex productivity tool, just a simple space for real connection and shared progress
                  built on consistency and trust.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full gradient-brand p-1 mb-6">
                      <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                        <img src="/zaki.jpeg" alt="Zaki Khatib" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Zaki Khatib</h3>
                    <p className="text-sm text-primary font-medium tracking-widest uppercase mb-4 text-center">Founder & Developer</p>
                    <a
                      href="https://github.com/Zaki-Khatib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                      <Github size={16} />
                      @Zaki-Khatib
                    </a>
                    <div className="flex gap-4 justify-center">
                      <Quote className="text-muted-foreground/30 rotate-180" size={32} />
                      <p className="text-base text-muted-foreground italic max-w-[250px]">
                        "Growth is 10x faster when you have someone to share the journey with."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Decorative Blur */}
              <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </motion.div>
          </div>

          {/* Three pillars section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Users className="text-magenta-500" />,
                title: "Partnership",
                desc: "No more going solo. We pair you with partners who share your drive."
              },
              {
                icon: <Rocket className="text-coral-500" />,
                title: "Efficiency",
                desc: "Track progress in real-time and stay focused on what matters most."
              },
              {
                icon: <Heart className="text-purple-500 heart-hover" />,
                title: "Care",
                desc: "Built on real friendships and the desire to see each other succeed."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all cursor-default group"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

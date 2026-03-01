import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar visible />

      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              About us
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Accountability Partners was born from a simple truth: we're better together.
              Whether it's waking up early, hitting the gym, reading more, or building a
              side project — having someone who's counting on you changes everything.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're a small team of makers who struggled with consistency ourselves. We
              tried apps, journals, and willpower. What actually worked? Texting a friend
              "Did you do it today?" every morning. So we built a better version of that.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is simple: help people build habits that last by pairing them
              with the right partner. No gimmicks, no complex systems — just real human
              accountability, powered by thoughtful technology.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

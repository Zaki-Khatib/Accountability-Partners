import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  visible: boolean;
}

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Dashboard", href: "/journey" },
  { label: "Friends", href: "/friends" },
  { label: "About", href: "/about" },
];

export default function Navbar({ visible }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/accountabilitypartnerslogo.png" alt="Accountability Partners" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}

          <div className="flex items-center gap-4 border-l border-border/50 pl-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-full px-4"
                onClick={() => navigate("/profile")}
              >
                <img src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Profile" className="w-6 h-6 rounded-full" />
                <span>{user.name}</span>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button size="sm" className="gradient-brand text-white border-0 rounded-full" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}

              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2 h-10 w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <UserIcon size={16} />
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full gradient-brand text-primary-foreground border-0 w-fit px-6 mt-2"
                    onClick={() => handleNavClick("/journey")}
                  >
                    Go to Dashboard
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="w-full justify-center rounded-full" onClick={() => { setMobileOpen(false); navigate("/login"); }}>
                    Log in
                  </Button>
                  <Button size="sm" className="w-full justify-center rounded-full gradient-brand border-0 text-white" onClick={() => { setMobileOpen(false); navigate("/signup"); }}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/accountabilitypartnerslogo.png" alt="Accountability Partners" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Made with ❤️ for friends who care
        </p>
      </div>
    </footer>
  );
}

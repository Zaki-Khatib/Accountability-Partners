import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(340, 82%, 52%), hsl(270, 60%, 68%))",
            }}
          >
            <Heart size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            Accountability Partners
          </span>
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

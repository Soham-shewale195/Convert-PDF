import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileStack } from "lucide-react";


const links = [
  { label: "Home", href: "#top" },
  { label: "Tools", href: "#tools" },
  { label: "Image Tools", href: "#image-tools" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <nav className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="flex items-center gap-2 font-semibold">
            <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center">
              <FileStack className="w-5 h-5" />
            </div>
            <span className="text-lg">Convert PDF</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-foreground transition">{l.label}</a></li>
            ))}
          </ul>

          <button className="md:hidden p-2 rounded-lg glass" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 mobile-menu-glass rounded-2xl p-4 space-y-2"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm text-white">{l.label}</a>
            ))}

          </motion.div>
        )}
      </div>
    </header>
  );
}

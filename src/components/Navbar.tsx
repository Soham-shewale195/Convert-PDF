import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileStack } from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";


const links = [
  { label: "Home", href: "/#top" },
  { label: "Tools", href: "/#tools" },
  { label: "Image Tools", href: "/#image-tools" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        if (open) setOpen(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.substring(2);
      if (location.pathname !== "/") {
        navigate({ to: "/" }).then(() => {
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate({ to: href as any });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <nav 
          className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between"
          style={{
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            backgroundColor: "oklch(1 0 0 / 15%)"
          }}
        >
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 font-semibold">
            <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center">
              <FileStack className="w-5 h-5" />
            </div>
            <span className="text-lg">Convert PDF</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="hover:text-foreground transition cursor-pointer">{l.label}</a>
              </li>
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
            style={{
              backdropFilter: "blur(64px) saturate(200%) !important",
              WebkitBackdropFilter: "blur(64px) saturate(200%) !important",
              backgroundColor: "rgba(8, 8, 20, 0.98) !important"
            }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm text-white cursor-pointer">{l.label}</a>
            ))}

          </motion.div>
        )}
      </div>
    </header>
  );
}

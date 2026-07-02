import { Link, useNavigate, useLocation } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="px-4 sm:px-6 pb-8">
      <div className="max-w-7xl mx-auto glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-semibold mb-3 text-lg">
              <span>Convert PDF</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The fastest, most private way to convert documents.
            </p>
          </div>
          <FooterCol
            title="Product"
            items={[
              { label: "Features", href: "/#features" },
              { label: "Image Tools", href: "/#image-tools" },
              { label: "FAQ", href: "/#faq" },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "Our Mission", href: "/mission" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Blog", href: "/blog" },
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Disclaimer", href: "/disclaimer" },
              { label: "Cookie Policy", href: "/cookie" },
            ]}
          />
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} Convert PDF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
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
    }
  };

  return (
    <div>
      <h4 className="font-semibold mb-3 text-sm">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.label}>
            {i.href.startsWith("/") && !i.href.includes("#") ? (
              <Link to={i.href} className="hover:text-foreground transition">
                {i.label}
              </Link>
            ) : (
              <a
                href={i.href}
                onClick={(e) => handleNavClick(e, i.href)}
                className="hover:text-foreground transition cursor-pointer"
              >
                {i.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Custom Design", href: "#custom-design" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      style={
        scrolled ? { borderBottom: "1px solid oklch(0.65 0.12 75 / 0.3)" } : {}
      }
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          data-ocid="nav.home_link"
          className="flex items-center"
          aria-label="JPM Enterprises home"
        >
          <img
            src="/assets/uploads/image-1.png"
            alt="JPM Enterprises"
            className="h-12 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                className={`font-general text-sm font-medium tracking-wide relative group transition-colors duration-200 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ background: "oklch(0.65 0.12 75)" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.menu_toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white/97 backdrop-blur-lg transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              className={`transition-all duration-300 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="font-playfair text-2xl text-foreground hover:text-primary transition-colors"
                style={{
                  color:
                    active === link.href ? "oklch(0.65 0.12 75)" : undefined,
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

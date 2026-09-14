import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useWebsiteSettings } from "../lib/websiteApi";
import { scrollToSection } from "../utils/scrollToSection";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Custom Design", href: "#custom-design" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blogs", to: "/blogs" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export function Navbar() {
  const { data: settings } = useWebsiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navigate = useNavigate();
  const location = useLocation();
  const phoneHref = getPhoneHref(settings?.enquiryPhone ?? "");
  const isLightHeader = scrolled || location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!location.pathname) {
      return;
    }

    setMenuOpen(false);

    if (location.pathname !== "/") {
      setActive(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sections = navLinks
      .filter((link): link is { label: string; href: string } => Boolean(link.href))
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      setActive("#home");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) => right.intersectionRatio - left.intersectionRatio,
          )[0];

        if (visibleSection) {
          setActive(`#${visibleSection.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (href: string) => {
    setActive(href);
    setMenuOpen(false);

    const sectionId = href.replace("#", "");

    if (location.pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    navigate({ to: "/" });
    setTimeout(() => scrollToSection(sectionId), 350);
  };

  const handlePrimaryAction = () => {
    setMenuOpen(false);

    if (phoneHref) {
      window.location.href = phoneHref;
      return;
    }

    handleNav("#contact");
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isLightHeader
          ? "border-b border-border bg-card/95 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-6 py-3 lg:px-8">
        <button
          type="button"
          onClick={() => handleNav("#home")}
          data-ocid="nav.home_link"
          className="flex items-center gap-4"
          aria-label="JPM Enterprises home"
        >
          <img
            src="/assets/uploads/newLogo.png"
            alt="JPM Enterprises"
            decoding="async"
            className="h-14 w-auto object-contain"
          />
        </button>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <li key={link.href ?? link.to}>
              {link.href ? (
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                  className="relative font-general text-sm font-medium text-foreground transition-colors duration-200"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${
                      active === link.href ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to={link.to!}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                  className="relative font-general text-sm font-medium text-foreground transition-colors duration-200"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${
                      active === link.to ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {settings?.enquiryPhone ? (
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-6 py-2.5 font-general text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-foreground shadow-md transition-all duration-300 hover:brightness-110"
            >
              Call Now
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </button>
          ) : null}
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-foreground transition-colors lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          data-ocid="nav.menu_toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-20 z-40 min-h-[calc(100vh-5rem)] bg-card/96 px-6 py-10 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-md flex-col justify-between">
          <ul className="space-y-6">
            {navLinks.map((link, index) => (
              <li
                key={link.href ?? link.to}
                style={{
                  transitionDelay: menuOpen ? `${index * 45}ms` : "0ms",
                }}
                className={`transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {link.href ? (
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="font-playfair text-3xl text-foreground transition-colors hover:text-accent"
                    style={{
                      color:
                        active === link.href ? "oklch(var(--accent))" : undefined,
                    }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.to!}
                    onClick={() => setMenuOpen(false)}
                    className="font-playfair text-3xl text-foreground transition-colors hover:text-accent"
                    style={{
                      color:
                        active === link.to ? "oklch(var(--accent))" : undefined,
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="rounded-[--radius] border border-border bg-card/90 p-6 shadow-lg backdrop-blur-sm">
            <p className="mb-2 font-general text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Design Support
            </p>
            <p className="mb-5 font-playfair text-2xl font-semibold text-foreground">
              Planning a new sofa story?
            </p>
            <div className="space-y-3 font-general text-sm text-muted-foreground">
              {settings?.enquiryPhone ? <p>{settings.enquiryPhone}</p> : null}
              {settings?.enquiryEmail ? <p>{settings.enquiryEmail}</p> : null}
              {settings?.address ? <p>{settings.address}</p> : null}
            </div>
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-general text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground shadow-md transition-all duration-300 hover:brightness-110"
            >
              {settings?.enquiryPhone ? "Call Now" : "Contact Us"}
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

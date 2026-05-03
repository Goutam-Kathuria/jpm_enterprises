import { useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useWebsiteSettings } from "../lib/websiteApi";
import { scrollToSection } from "../utils/scrollToSection";

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
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    const sections = navLinks
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
          ? "bg-white/88 shadow-[0_18px_45px_oklch(0.12_0.01_60_/_0.08)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              borderBottom: "1px solid oklch(0.65 0.12 75 / 0.16)",
            }
          : undefined
      }
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-8 lg:px-10">
        <button
          type="button"
          onClick={() => handleNav("#home")}
          data-ocid="nav.home_link"
          className="flex items-center gap-4"
          aria-label="JPM Enterprises home"
        >
          <img
            src="/assets/uploads/image-1.png"
            alt="JPM Enterprises"
            className="h-16 w-auto object-contain"
          />
        </button>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                className={`relative font-general text-sm font-medium tracking-[0.12em] transition-colors duration-200 ${
                  isLightHeader ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0"
                  }`}
                  style={{ background: "oklch(0.65 0.12 75)" }}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {settings?.enquiryPhone ? (
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 whitespace-nowrap font-general text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                color: "oklch(0.12 0.01 60)",
                boxShadow: "0 12px 28px oklch(0.65 0.12 75 / 0.28)",
              }}
            >
              Call Now
              <ArrowUpRight size={15} />
            </button>
          ) : null}
        </div>

        <button
          type="button"
          className={`rounded-full p-2 transition-colors lg:hidden ${
            isLightHeader ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMenuOpen((open) => !open)}
          data-ocid="nav.menu_toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-20 z-40 min-h-[calc(100vh-5rem)] bg-[oklch(0.98_0.008_84_/_0.96)] px-6 py-10 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-md flex-col justify-between">
          <ul className="space-y-6">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: menuOpen ? `${index * 45}ms` : "0ms",
                }}
                className={`transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="font-playfair text-3xl text-foreground transition-colors"
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

          <div
            className="rounded-[28px] p-6"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.82), oklch(0.95 0.01 84 / 0.94))",
              border: "1px solid oklch(0.65 0.12 75 / 0.16)",
            }}
          >
            <p
              className="mb-2 font-general text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
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
              className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 font-general text-xs font-semibold tracking-[0.2em] uppercase"
              style={{
                background: "oklch(0.65 0.12 75)",
                color: "oklch(0.12 0.01 60)",
              }}
            >
              {settings?.enquiryPhone ? "Call Now" : "Contact Us"}
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

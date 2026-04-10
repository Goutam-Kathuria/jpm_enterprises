import { useNavigate } from "@tanstack/react-router";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
} from "react-icons/si";
import { scrollToSection } from "../utils/scrollToSection";

const quickLinks = [
  { label: "Home", section: "home" },
  { label: "Collection", section: "collection" },
  { label: "Custom Design", section: "custom-design" },
  { label: "Why Us", section: "why-us" },
  { label: "Gallery", section: "gallery" },
  { label: "Contact", section: "contact" },
];

const serviceLinks = [
  { label: "Custom Sofas", anchor: "custom-sofas" },
  { label: "Fabric Selection", anchor: "fabric-selection" },
  { label: "Interior Consultation", anchor: "interior-consultation" },
  { label: "Delivery & Installation", anchor: "delivery-installation" },
];

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    Icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com/jpmenterpriseshissar",
  },
  { Icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: SiPinterest, label: "Pinterest", href: "https://pinterest.com" },
  { Icon: SiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  const navigate = useNavigate();

  const handleQuickLink = (section: string) => {
    if (window.location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate({ to: "/" });
      setTimeout(() => scrollToSection(section), 350);
    }
  };

  const handleServiceLink = (anchor: string) => {
    navigate({ to: "/services" });
    setTimeout(() => scrollToSection(anchor), 350);
  };

  return (
    <footer
      style={{
        background: "oklch(0.12 0.01 60)",
        color: "oklch(0.92 0.008 85)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/uploads/image-1.png"
              alt="JPM Enterprises"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p
              className="font-general text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.7 0.015 80)" }}
            >
              Crafting comfort and designing luxury since 2005. Premium
              handcrafted sofas made to last a lifetime.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "oklch(0.2 0.01 60)",
                    color: "oklch(0.7 0.015 80)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "oklch(0.65 0.12 75)";
                    e.currentTarget.style.color = "oklch(0.12 0.01 60)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "oklch(0.2 0.01 60)";
                    e.currentTarget.style.color = "oklch(0.7 0.015 80)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-playfair text-base font-semibold mb-5"
              style={{ color: "oklch(0.92 0.008 85)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleQuickLink(link.section)}
                    data-ocid={`footer.${link.section.replace("-", "_")}_link`}
                    className="font-general text-sm transition-colors duration-200 text-left"
                    style={{ color: "oklch(0.7 0.015 80)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(0.65 0.12 75)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(0.7 0.015 80)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-playfair text-base font-semibold mb-5"
              style={{ color: "oklch(0.92 0.008 85)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <button
                    type="button"
                    onClick={() => handleServiceLink(service.anchor)}
                    data-ocid={`footer.${service.anchor.replace("-", "_")}_link`}
                    className="font-general text-sm transition-colors duration-200 text-left"
                    style={{ color: "oklch(0.7 0.015 80)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(0.65 0.12 75)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(0.7 0.015 80)";
                    }}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-playfair text-base font-semibold mb-5"
              style={{ color: "oklch(0.92 0.008 85)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <p
                  className="font-general text-sm"
                  style={{ color: "oklch(0.7 0.015 80)" }}
                >
                  Plot No. 1/1 & 1/2, Paschim Vihar, Phase-III, Kaimri Road, Opp. Ananda Hospital, Hisar, District- Hisar, Haryana-125001.
                </p>
              </li>
              <li>
                <a
                  href="tel:+919468396001"
                  className="font-general text-sm transition-colors"
                  style={{ color: "oklch(0.7 0.015 80)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "oklch(0.65 0.12 75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "oklch(0.7 0.015 80)";
                  }}
                >
                  +91 94683 96001
                </a>
              </li>
              <li>
                <a
                  href="mailto:jpmenterprises2602@gmail.com"
                  className="font-general text-sm transition-colors"
                  style={{ color: "oklch(0.7 0.015 80)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "oklch(0.65 0.12 75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "oklch(0.7 0.015 80)";
                  }}
                >
                  jpmenterprises2602@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid oklch(0.65 0.12 75 / 0.4)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-general text-xs"
            style={{ color: "oklch(0.5 0.01 60)" }}
          >
            © {currentYear} JPM Enterprises. All Rights Reserved.
          </p>
          <p
            className="font-general text-xs"
            style={{ color: "oklch(0.5 0.01 60)" }}
          >
            Built with <span style={{ color: "oklch(0.65 0.12 75)" }}>♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors"
              style={{ color: "oklch(0.6 0.01 60)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "oklch(0.65 0.12 75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "oklch(0.6 0.01 60)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

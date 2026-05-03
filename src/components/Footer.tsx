import { useNavigate } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useWebsiteSettings } from "../lib/websiteApi";
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

function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export function Footer() {
  const navigate = useNavigate();
  const { data: settings } = useWebsiteSettings();

  const socialLinks = [
    {
      Icon: SiInstagram,
      label: "Instagram",
      href: settings?.instagramUrl ?? "",
    },
    {
      Icon: SiFacebook,
      label: "Facebook",
      href: settings?.facebookUrl ?? "",
    },
    {
      Icon: SiX,
      label: "X",
      href: settings?.twitterUrl ?? "",
    },
    {
      Icon: SiLinkedin,
      label: "LinkedIn",
      href: settings?.linkedinUrl ?? "",
    },
  ].filter((link) => link.href);

  const handleQuickLink = (section: string) => {
    if (window.location.pathname === "/") {
      scrollToSection(section);
      return;
    }

    navigate({ to: "/" });
    setTimeout(() => scrollToSection(section), 350);
  };

  const handleServiceLink = (anchor: string) => {
    navigate({ to: "/services" });
    setTimeout(() => scrollToSection(anchor), 350);
  };

  return (
    <footer
      style={{
        background:
          "radial-gradient(circle at top left, oklch(0.2 0.02 65), oklch(0.12 0.01 60) 48%)",
        color: "oklch(0.92 0.008 85)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-12 grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.75fr_0.75fr_1fr]">
          <div>
            <img
              src="/assets/uploads/image-1.png"
              alt="JPM Enterprises"
              className="mb-5 h-12 w-auto brightness-0 invert"
            />
            <p
              className="max-w-md font-general text-sm leading-relaxed"
              style={{ color: "oklch(0.72 0.015 82)" }}
            >
              Bespoke sofas, rich upholstery, and refined craftsmanship for
              homes that want comfort with character.
            </p>

            {socialLinks.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "oklch(1 0 0 / 0.08)",
                      color: "oklch(0.88 0.01 84)",
                      border: "1px solid oklch(0.65 0.12 75 / 0.2)",
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h4
              className="mb-5 font-playfair text-lg font-semibold"
              style={{ color: "oklch(0.95 0.005 85)" }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleQuickLink(link.section)}
                    data-ocid={`footer.${link.section.replace("-", "_")}_link`}
                    className="font-general text-sm transition-colors duration-200"
                    style={{ color: "oklch(0.72 0.015 82)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5 font-playfair text-lg font-semibold"
              style={{ color: "oklch(0.95 0.005 85)" }}
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
                    className="font-general text-sm transition-colors duration-200"
                    style={{ color: "oklch(0.72 0.015 82)" }}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5 font-playfair text-lg font-semibold"
              style={{ color: "oklch(0.95 0.005 85)" }}
            >
              Connect
            </h4>
            <div className="space-y-4 font-general text-sm">
              {settings?.address ? (
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  />
                  <p style={{ color: "oklch(0.72 0.015 82)" }}>
                    {settings.address}
                  </p>
                </div>
              ) : null}

              {settings?.enquiryPhone ? (
                <a
                  href={getPhoneHref(settings.enquiryPhone)}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ color: "oklch(0.72 0.015 82)" }}
                >
                  <Phone
                    size={16}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  />
                  {settings.enquiryPhone}
                </a>
              ) : null}

              {settings?.enquiryEmail ? (
                <a
                  href={`mailto:${settings.enquiryEmail}`}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ color: "oklch(0.72 0.015 82)" }}
                >
                  <Mail
                    size={16}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  />
                  {settings.enquiryEmail}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-general text-xs"
            style={{ color: "oklch(0.56 0.01 72)" }}
          >
            © {currentYear} JPM Enterprises. Crafted with care, built to last.
          </p>
          <p
            className="font-general text-xs"
            style={{ color: "oklch(0.56 0.01 72)" }}
          >
            Luxury sofas, custom furniture, and detail-led interiors from Hisar.
          </p>
        </div>
      </div>
    </footer>
  );
}

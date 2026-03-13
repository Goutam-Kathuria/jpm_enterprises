import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function ContactSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div ref={leftRef} className="reveal">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Reach Us
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="font-general text-secondary-foreground leading-relaxed mb-10">
              Whether you have a specific design in mind or you're just
              beginning to explore, our team is here to guide you. Visit our
              showroom or reach out below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                >
                  <Phone size={18} style={{ color: "oklch(0.55 0.14 65)" }} />
                </div>
                <div>
                  <p className="font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                    Phone
                  </p>
                  <p className="font-general text-foreground font-medium">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                >
                  <Mail size={18} style={{ color: "oklch(0.55 0.14 65)" }} />
                </div>
                <div>
                  <p className="font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <p className="font-general text-foreground font-medium">
                    info@jpmenterprises.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                >
                  <MapPin size={18} style={{ color: "oklch(0.55 0.14 65)" }} />
                </div>
                <div>
                  <p className="font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                    Address
                  </p>
                  <p className="font-general text-foreground font-medium">
                    45 Furniture Hub, Design District,
                    <br />
                    Mumbai, India — 400 001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={rightRef} className="reveal">
            <div
              className="bg-card p-8 rounded-sm"
              style={{ border: "1px solid oklch(0.87 0.02 80)" }}
            >
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6">
                Send an Inquiry
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    data-ocid="contact.name_input"
                    className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                    style={{
                      borderColor: "oklch(0.87 0.02 80)",
                      color: "oklch(0.12 0.01 60)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    data-ocid="contact.email_input"
                    className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                    style={{
                      borderColor: "oklch(0.87 0.02 80)",
                      color: "oklch(0.12 0.01 60)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    data-ocid="contact.phone_input"
                    className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                    style={{
                      borderColor: "oklch(0.87 0.02 80)",
                      color: "oklch(0.12 0.01 60)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your dream sofa..."
                    data-ocid="contact.message_textarea"
                    className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      borderColor: "oklch(0.87 0.02 80)",
                      color: "oklch(0.12 0.01 60)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full font-general py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "oklch(0.65 0.12 75)",
                    color: "oklch(0.12 0.01 60)",
                    boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.3)",
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

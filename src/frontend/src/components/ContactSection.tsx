import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter a valid email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  const digitsOnly = fields.phone.replace(/\D/g, "");
  if (!fields.phone.trim()) {
    errors.phone = "Enter a valid phone number";
  } else if (
    !/^\d+$/.test(digitsOnly) ||
    digitsOnly.length < 10 ||
    digitsOnly.length > 15
  ) {
    errors.phone = "Enter a valid phone number";
  }

  if (!fields.message.trim()) {
    errors.message = "Message must be at least 10 characters";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

const errorBorder = "oklch(0.55 0.2 25)";
const normalBorder = "oklch(0.87 0.02 80)";
const goldBorder = "oklch(0.65 0.12 75)";

export function ContactSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFields({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  const inputBorderColor = (field: keyof FormFields) =>
    errors[field] ? errorBorder : normalBorder;

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
              Whether you have a specific design in mind or you&apos;re just
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
                    +91 94683 96001
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
                    jpmenterprises2602@gmail.com
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
                    Plot No. 1/1 & 1/2, Paschim Vihar, Phase-III, Kaimri Road, Opp. Ananda Hospital, Hisar, District- Hisar, Haryana-125001.
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

              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="py-10 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                  >
                    <svg
                      role="img"
                      aria-label="Success checkmark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="oklch(0.55 0.14 65)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Success</title>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-playfair text-xl font-semibold text-foreground mb-2">
                    Inquiry Sent!
                  </p>
                  <p className="font-general text-sm text-muted-foreground leading-relaxed">
                    Your inquiry has been sent successfully. Our team will
                    contact you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-general text-xs font-semibold tracking-wider uppercase px-5 py-2.5 border transition-all duration-300"
                    style={{
                      borderColor: "oklch(0.65 0.12 75)",
                      color: "oklch(0.65 0.12 75)",
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
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
                      value={fields.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      data-ocid="contact.name_input"
                      className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: inputBorderColor("name"),
                        color: "oklch(0.12 0.01 60)",
                      }}
                      onFocus={(e) => {
                        if (!errors.name) {
                          e.currentTarget.style.borderColor = goldBorder;
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                        }
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.name
                          ? errorBorder
                          : normalBorder;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.name && (
                      <p
                        data-ocid="contact.name_input.error_state"
                        className="mt-1.5 font-general text-xs"
                        style={{ color: errorBorder }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
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
                      value={fields.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      data-ocid="contact.email_input"
                      className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: inputBorderColor("email"),
                        color: "oklch(0.12 0.01 60)",
                      }}
                      onFocus={(e) => {
                        if (!errors.email) {
                          e.currentTarget.style.borderColor = goldBorder;
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                        }
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.email
                          ? errorBorder
                          : normalBorder;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.email && (
                      <p
                        data-ocid="contact.email_input.error_state"
                        className="mt-1.5 font-general text-xs"
                        style={{ color: errorBorder }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
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
                      value={fields.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      data-ocid="contact.phone_input"
                      className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: inputBorderColor("phone"),
                        color: "oklch(0.12 0.01 60)",
                      }}
                      onFocus={(e) => {
                        if (!errors.phone) {
                          e.currentTarget.style.borderColor = goldBorder;
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                        }
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.phone
                          ? errorBorder
                          : normalBorder;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.phone && (
                      <p
                        data-ocid="contact.phone_input.error_state"
                        className="mt-1.5 font-general text-xs"
                        style={{ color: errorBorder }}
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
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
                      value={fields.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      data-ocid="contact.message_textarea"
                      className="w-full px-4 py-3 font-general text-sm bg-input border rounded-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        borderColor: inputBorderColor("message"),
                        color: "oklch(0.12 0.01 60)",
                      }}
                      onFocus={(e) => {
                        if (!errors.message) {
                          e.currentTarget.style.borderColor = goldBorder;
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px oklch(0.65 0.12 75 / 0.15)";
                        }
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.message
                          ? errorBorder
                          : normalBorder;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.message && (
                      <p
                        data-ocid="contact.message_textarea.error_state"
                        className="mt-1.5 font-general text-xs"
                        style={{ color: errorBorder }}
                      >
                        {errors.message}
                      </p>
                    )}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

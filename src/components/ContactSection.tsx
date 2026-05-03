import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { submitWebsiteInquiry, useWebsiteSettings } from "../lib/websiteApi";
import { toast } from "sonner";

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

  if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  const phoneDigits = fields.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone number";
  }

  if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export function ContactSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const { data: settings } = useWebsiteSettings();
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    { Icon: SiX, label: "X", href: settings?.twitterUrl ?? "" },
    {
      Icon: SiLinkedin,
      label: "LinkedIn",
      href: settings?.linkedinUrl ?? "",
    },
  ].filter((link) => link.href);

  const handleChange = (field: keyof FormFields, value: string) => {
    setFields((previous) => ({ ...previous, [field]: value }));

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await submitWebsiteInquiry({
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        message: fields.message.trim(),
        source: "contact_page",
      });
      setSubmitted(true);
      setErrors({});
      setFields({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      toast.success("Thank you — we received your enquiry.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div ref={leftRef} className="reveal">
            <p
              className="mb-4 font-general text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Contact
            </p>
            <h2 className="font-playfair text-4xl font-bold text-foreground lg:text-5xl">
              All contact information is dynamically managed through the admin settings.
            </h2>
            <p className="mt-6 max-w-xl font-general text-base leading-relaxed text-secondary-foreground">
              Phone number, email, address, and social profiles are no longer
              hardcoded. Update them once in settings and the website will stay
              in sync.
            </p>

            <div className="mt-10 space-y-5">
              {settings?.enquiryPhone ? (
                <a
                  href={getPhoneHref(settings.enquiryPhone)}
                  className="flex items-start gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_18px_38px_oklch(0.12_0.01_60_/_0.05)]"
                  style={{ border: "1px solid oklch(0.9 0.015 82)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
                  >
                    <Phone size={18} style={{ color: "oklch(0.55 0.14 65)" }} />
                  </div>
                  <div>
                    <p className="font-general text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Call
                    </p>
                    <p className="mt-1 font-general text-sm font-medium text-foreground">
                      {settings.enquiryPhone}
                    </p>
                  </div>
                </a>
              ) : null}

              {settings?.enquiryEmail ? (
                <a
                  href={`mailto:${settings.enquiryEmail}`}
                  className="flex items-start gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_18px_38px_oklch(0.12_0.01_60_/_0.05)]"
                  style={{ border: "1px solid oklch(0.9 0.015 82)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
                  >
                    <Mail size={18} style={{ color: "oklch(0.55 0.14 65)" }} />
                  </div>
                  <div>
                    <p className="font-general text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </p>
                    <p className="mt-1 font-general text-sm font-medium text-foreground">
                      {settings.enquiryEmail}
                    </p>
                  </div>
                </a>
              ) : null}

              {settings?.address ? (
                <div
                  className="flex items-start gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_18px_38px_oklch(0.12_0.01_60_/_0.05)]"
                  style={{ border: "1px solid oklch(0.9 0.015 82)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
                  >
                    <MapPin
                      size={18}
                      style={{ color: "oklch(0.55 0.14 65)" }}
                    />
                  </div>
                  <div>
                    <p className="font-general text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Visit
                    </p>
                    <p className="mt-1 font-general text-sm font-medium leading-relaxed text-foreground">
                      {settings.address}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {socialLinks.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
                    style={{ border: "1px solid oklch(0.9 0.015 82)" }}
                  >
                    <Icon size={14} style={{ color: "oklch(0.65 0.12 75)" }} />
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div ref={rightRef} className="reveal">
            <div
              className="rounded-[32px] bg-white p-8 shadow-[0_28px_60px_oklch(0.12_0.01_60_/_0.08)] lg:p-9"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <h3 className="font-playfair text-3xl font-semibold text-foreground">
                Send an inquiry
              </h3>
              <p className="mt-3 font-general text-sm leading-relaxed text-muted-foreground">
                Submit the form and our team will reply using the contact details
                stored in admin settings.
              </p>

              {submitted ? (
                <div className="py-14 text-center">
                  <div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
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
                  <p className="font-playfair text-2xl font-semibold text-foreground">
                    Enquiry received
                  </p>
                  <p className="mx-auto mt-3 max-w-md font-general text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. We will get back to you shortly
                    using the details you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                      border: "1px solid oklch(0.65 0.12 75 / 0.3)",
                      color: "oklch(0.65 0.12 75)",
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {[
                    {
                      id: "contact-name",
                      label: "Full Name",
                      field: "name" as const,
                      type: "text",
                      placeholder: "Your full name",
                    },
                    {
                      id: "contact-email",
                      label: "Email Address",
                      field: "email" as const,
                      type: "email",
                      placeholder: "you@example.com",
                    },
                    {
                      id: "contact-phone",
                      label: "Phone Number",
                      field: "phone" as const,
                      type: "tel",
                      placeholder: "Your phone number",
                    },
                  ].map((input) => (
                    <div key={input.id}>
                      <label
                        htmlFor={input.id}
                        className="mb-2 block font-general text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {input.label}
                      </label>
                      <input
                        id={input.id}
                        type={input.type}
                        value={fields[input.field]}
                        onChange={(event) =>
                          handleChange(input.field, event.target.value)
                        }
                        placeholder={input.placeholder}
                        className="w-full rounded-[18px] border bg-[oklch(0.98_0.008_85)] px-4 py-3 font-general text-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_3px_oklch(0.65_0.12_75_/_0.14)]"
                        style={{
                          borderColor: errors[input.field]
                            ? "oklch(0.55 0.2 25)"
                            : "oklch(0.9 0.015 82)",
                        }}
                      />
                      {errors[input.field] ? (
                        <p
                          className="mt-2 font-general text-xs"
                          style={{ color: "oklch(0.55 0.2 25)" }}
                        >
                          {errors[input.field]}
                        </p>
                      ) : null}
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block font-general text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      value={fields.message}
                      onChange={(event) =>
                        handleChange("message", event.target.value)
                      }
                      placeholder="Tell us about the style, space, finish, and timeline you have in mind."
                      rows={5}
                      className="w-full rounded-[18px] border bg-[oklch(0.98_0.008_85)] px-4 py-3 font-general text-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_3px_oklch(0.65_0.12_75_/_0.14)]"
                      style={{
                        borderColor: errors.message
                          ? "oklch(0.55 0.2 25)"
                          : "oklch(0.9 0.015 82)",
                      }}
                    />
                    {errors.message ? (
                      <p
                        className="mt-2 font-general text-xs"
                        style={{ color: "oklch(0.55 0.2 25)" }}
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    data-ocid="contact.submit_button"
                    className="w-full rounded-full px-6 py-4 font-general text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                      color: "oklch(0.12 0.01 60)",
                      boxShadow: "0 18px 34px oklch(0.65 0.12 75 / 0.22)",
                    }}
                  >
                    {submitting ? "Sending…" : "Send Inquiry"}
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

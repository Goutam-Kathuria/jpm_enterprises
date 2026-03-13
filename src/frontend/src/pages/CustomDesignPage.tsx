import { useSearch } from "@tanstack/react-router";
import { CheckCircle, Home, Layers, Palette, Ruler } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const steps = [
  {
    number: "01",
    icon: <Palette size={22} />,
    title: "Choose Design",
    desc: "Browse our curated catalogue or share your vision with our designers.",
  },
  {
    number: "02",
    icon: <Layers size={22} />,
    title: "Select Material",
    desc: "Choose from premium leathers, linens, velvets, and more.",
  },
  {
    number: "03",
    icon: <Ruler size={22} />,
    title: "Customize Size",
    desc: "We build to your exact dimensions — no compromise, no off-the-shelf.",
  },
  {
    number: "04",
    icon: <Home size={22} />,
    title: "Get It Built",
    desc: "Our craftsmen bring your vision to life and deliver to your door.",
  },
];

const sofaTypeMap: Record<string, string> = {
  "luxury-leather-sofa": "Leather",
  "modern-sofa": "Modern",
  "l-shape-sofa": "L-Shape",
  "recliner-sofa": "Recliner",
  "minimalist-fabric-sofa": "Modern",
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  sofaType: string;
  fabric: string;
  color: string;
  size: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  sofaType?: string;
}

export function CustomDesignPage() {
  const search = useSearch({ strict: false }) as { product?: string };
  const productSlug = search.product ?? "";
  const preSelectedSofaType = sofaTypeMap[productSlug] ?? "";

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    sofaType: preSelectedSofaType,
    fabric: "",
    color: "",
    size: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Name is required (min 2 characters)";
    if (!form.phone.trim() || !/^[0-9]{10,15}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid phone number (10–15 digits)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address";
    if (!form.sofaType) newErrors.sofaType = "Please select a sofa type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      sofaType: "",
      fabric: "",
      color: "",
      size: "",
      notes: "",
    });
  };

  const inputStyle = {
    background: "oklch(0.97 0.005 80)",
    border: "1px solid oklch(0.87 0.02 80)",
    color: "oklch(0.15 0.01 60)",
    outline: "none",
  };

  const errorInputStyle = {
    ...inputStyle,
    border: "1px solid oklch(0.55 0.18 25)",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Intro */}
        <section
          className="pt-36 pb-20 text-center"
          style={{ background: "oklch(0.97 0.008 80)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Bespoke Craftsmanship
            </p>
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Design Your <span className="italic">Perfect Sofa</span>
            </h1>
            <p className="font-general text-secondary-foreground leading-relaxed text-lg">
              Every JPM sofa is crafted to your exact specifications. Choose
              your style, material, size, and colour — our master craftsmen
              bring your vision to life.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground">
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-card p-6 rounded-sm"
                  style={{ border: "1px solid oklch(0.87 0.02 80)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.65 0.12 75)" }}
                    >
                      <span style={{ color: "oklch(0.12 0.01 60)" }}>
                        {step.icon}
                      </span>
                    </span>
                    <span
                      className="font-playfair text-2xl font-bold"
                      style={{ color: "oklch(0.65 0.12 75 / 0.3)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-general text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request Form */}
        <section
          className="py-20"
          style={{ background: "oklch(0.97 0.008 80)" }}
        >
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p
                className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: "oklch(0.65 0.12 75)" }}
              >
                Get Started
              </p>
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground">
                Request Your Custom Sofa
              </h2>
            </div>

            {submitted ? (
              <div
                data-ocid="custom_design.success_state"
                className="text-center py-16 px-8 rounded-sm"
                style={{
                  border: "1px solid oklch(0.87 0.02 80)",
                  background: "oklch(1 0 0)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                >
                  <CheckCircle
                    size={32}
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  Inquiry Received!
                </h3>
                <p className="font-general text-secondary-foreground leading-relaxed mb-8">
                  Your inquiry has been sent. Our team will contact you within
                  24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "oklch(0.65 0.12 75)",
                    color: "oklch(0.12 0.01 60)",
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-sm p-8 space-y-6"
                style={{
                  border: "1px solid oklch(0.87 0.02 80)",
                  background: "oklch(1 0 0)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="cd-name"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Full Name{" "}
                      <span style={{ color: "oklch(0.65 0.12 75)" }}>*</span>
                    </label>
                    <input
                      id="cd-name"
                      type="text"
                      data-ocid="custom_design.name_input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-sm font-general text-sm focus:ring-0"
                      style={errors.name ? errorInputStyle : inputStyle}
                    />
                    {errors.name && (
                      <p
                        className="font-general text-xs mt-1"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="cd-phone"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Phone Number{" "}
                      <span style={{ color: "oklch(0.65 0.12 75)" }}>*</span>
                    </label>
                    <input
                      id="cd-phone"
                      type="tel"
                      data-ocid="custom_design.phone_input"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="10-digit number"
                      className="w-full px-4 py-3 rounded-sm font-general text-sm"
                      style={errors.phone ? errorInputStyle : inputStyle}
                    />
                    {errors.phone && (
                      <p
                        className="font-general text-xs mt-1"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="cd-email"
                    className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                  >
                    Email Address{" "}
                    <span style={{ color: "oklch(0.65 0.12 75)" }}>*</span>
                  </label>
                  <input
                    id="cd-email"
                    type="email"
                    data-ocid="custom_design.email_input"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-sm font-general text-sm"
                    style={errors.email ? errorInputStyle : inputStyle}
                  />
                  {errors.email && (
                    <p
                      className="font-general text-xs mt-1"
                      style={{ color: "oklch(0.55 0.18 25)" }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Sofa Type */}
                  <div>
                    <label
                      htmlFor="cd-sofa-type"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Sofa Type{" "}
                      <span style={{ color: "oklch(0.65 0.12 75)" }}>*</span>
                    </label>
                    <select
                      id="cd-sofa-type"
                      data-ocid="custom_design.sofa_type_select"
                      value={form.sofaType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, sofaType: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-sm font-general text-sm"
                      style={errors.sofaType ? errorInputStyle : inputStyle}
                    >
                      <option value="">Select sofa type</option>
                      <option>L-Shape</option>
                      <option>Recliner</option>
                      <option>Modern</option>
                      <option>Sectional</option>
                      <option>Leather</option>
                      <option>Other</option>
                    </select>
                    {errors.sofaType && (
                      <p
                        className="font-general text-xs mt-1"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        {errors.sofaType}
                      </p>
                    )}
                  </div>

                  {/* Preferred Fabric */}
                  <div>
                    <label
                      htmlFor="cd-fabric"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Preferred Fabric
                    </label>
                    <select
                      id="cd-fabric"
                      data-ocid="custom_design.fabric_select"
                      value={form.fabric}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fabric: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-sm font-general text-sm"
                      style={inputStyle}
                    >
                      <option value="">Select fabric</option>
                      <option>Linen</option>
                      <option>Velvet</option>
                      <option>Leather</option>
                      <option>Microfiber</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Color Preference */}
                  <div>
                    <label
                      htmlFor="cd-color"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Color Preference
                    </label>
                    <input
                      id="cd-color"
                      type="text"
                      data-ocid="custom_design.color_input"
                      value={form.color}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, color: e.target.value }))
                      }
                      placeholder="e.g. Ivory, Charcoal, Beige"
                      className="w-full px-4 py-3 rounded-sm font-general text-sm"
                      style={inputStyle}
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label
                      htmlFor="cd-size"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                    >
                      Size
                    </label>
                    <select
                      id="cd-size"
                      data-ocid="custom_design.size_select"
                      value={form.size}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, size: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-sm font-general text-sm"
                      style={inputStyle}
                    >
                      <option value="">Select size</option>
                      <option>2-Seater</option>
                      <option>3-Seater</option>
                      <option>4-Seater</option>
                      <option>L-Shape</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="cd-notes"
                    className="block font-general text-xs font-semibold tracking-wider uppercase mb-2 text-foreground"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="cd-notes"
                    data-ocid="custom_design.notes_textarea"
                    value={form.notes}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    placeholder="Any specific requirements, dimensions, or references..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-sm font-general text-sm resize-none"
                    style={inputStyle}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    data-ocid="custom_design.submit_button"
                    className="w-full font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "oklch(0.65 0.12 75)",
                      color: "oklch(0.12 0.01 60)",
                      boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.3)",
                    }}
                  >
                    Submit Custom Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

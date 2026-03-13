import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { scrollToSection } from "../utils/scrollToSection";

const services = [
  {
    id: "custom-sofas",
    ocid: "services.custom_sofas_section",
    label: "Custom Sofas",
    tagline: "Crafted to Your Vision",
    description:
      "At JPM Enterprises, every sofa begins with your story. Our bespoke creation process starts with a personal consultation where our designers listen — truly listen — to your aesthetic preferences, lifestyle needs, and spatial requirements. From a detailed sketch through to the final stitch, every step is done by hand in our Mumbai workshop. We source only Grade-A materials: kiln-dried hardwood frames, tempered steel springs, and premium upholstery fabrics that stand the test of time.",
    features: [
      "Personal design consultation",
      "Handcrafted by master upholsterers",
      "400+ fabric and leather swatches",
      "Exact-dimension builds — no standard sizing",
      "60–90 day delivery from final approval",
    ],
  },
  {
    id: "fabric-selection",
    ocid: "services.fabric_selection_section",
    label: "Fabric Selection",
    tagline: "Luxury Materials for Every Taste",
    description:
      "Choosing the right material is as important as the form. Our fabric library spans over 400 options — imported European linens with a natural weave, supple full-grain Italian leathers that deepen in character over time, performance velvets that resist wear while maintaining opulence, and moisture-wicking microfibers ideal for family homes. Our material consultants will guide you through texture, durability, and colorfastness so your sofa remains beautiful for decades.",
    features: [
      "Full-grain Italian and Indian leathers",
      "Belgian linen and Belgian velvet",
      "Performance and pet-friendly microfibers",
      "Boucle, chenille, and woven jacquards",
      "Custom fabric sourcing on request",
    ],
  },
  {
    id: "interior-consultation",
    ocid: "services.interior_consultation_section",
    label: "Interior Consultation",
    tagline: "Design Guidance from Experts",
    description:
      "Unsure where to begin? Our complimentary interior consultation service pairs you with a certified design professional who will visit your home, assess the existing palette, lighting, and traffic flow, and provide tailored recommendations for sofa form, finish, and placement. We work alongside your interior designer or independently — whatever suits you best. The goal is a living space that feels cohesive, considered, and unmistakably yours.",
    features: [
      "Complimentary home visit (Mumbai metro area)",
      "Certified interior design professionals",
      "3D space planning and mood boards",
      "Coordination with existing décor",
      "Post-delivery styling walkthrough",
    ],
  },
  {
    id: "delivery-installation",
    ocid: "services.delivery_installation_section",
    label: "Delivery & Installation",
    tagline: "White-Glove Service to Your Door",
    description:
      "Your custom sofa deserves a delivery experience that matches its craftsmanship. Our dedicated logistics team handles every detail: protective wrapping in breathable cotton covers, climate-controlled transport, and a two-person installation crew who will carefully place, assemble, and position your sofa — then remove all packaging. We operate across Maharashtra with extended service to Delhi, Bangalore, Chennai, and Hyderabad. International shipping is available on request.",
    features: [
      "Climate-controlled vehicle transport",
      "Two-person white-glove delivery team",
      "Full assembly and placement service",
      "Packaging removal and site clean-up",
      "Pan-India and international delivery available",
    ],
  },
];

export function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => scrollToSection(hash), 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="pt-36 pb-20 text-center"
          style={{ background: "oklch(0.97 0.008 80)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              What We Offer
            </p>
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="italic">Services</span>
            </h1>
            <p className="font-general text-secondary-foreground leading-relaxed text-lg">
              From bespoke creation to white-glove delivery, every JPM service
              is designed to make your experience as exceptional as the
              furniture itself.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            data-ocid={service.ocid}
            className="py-20"
            style={{
              background: i % 2 === 0 ? "oklch(1 0 0)" : "oklch(0.97 0.008 80)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Text */}
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <p
                    className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  >
                    {service.tagline}
                  </p>
                  <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    {service.label}
                  </h2>
                  <p className="font-general text-secondary-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: "oklch(0.65 0.12 75)" }}
                        />
                        <span className="font-general text-sm text-foreground">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative card */}
                <div className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
                  <div
                    className="rounded-sm p-10 flex flex-col items-center justify-center text-center min-h-64"
                    style={{
                      border: "1px solid oklch(0.87 0.02 80)",
                      background:
                        i % 2 === 0 ? "oklch(0.97 0.008 80)" : "oklch(1 0 0)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
                    >
                      <span
                        className="font-playfair text-3xl font-bold"
                        style={{ color: "oklch(0.65 0.12 75)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-playfair text-2xl font-semibold text-foreground mb-3">
                      {service.label}
                    </h3>
                    <p
                      className="font-general text-sm"
                      style={{ color: "oklch(0.65 0.12 75)" }}
                    >
                      {service.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}

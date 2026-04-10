import { Home, Layers, Palette, Ruler } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SofaConfigurator } from "../components/SofaConfigurator";

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

export function CustomDesignPage() {
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

        {/* How It Works */}
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

        {/* Sofa Configurator */}
        <section
          className="py-20"
          style={{ background: "oklch(0.97 0.008 80)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p
                className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: "oklch(0.65 0.12 75)" }}
              >
                Get Started
              </p>
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground">
                Build Your Custom Sofa
              </h2>
              <p className="font-general text-muted-foreground mt-3 max-w-xl mx-auto">
                Walk through our guided configurator — it takes less than two
                minutes.
              </p>
            </div>
            <SofaConfigurator />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

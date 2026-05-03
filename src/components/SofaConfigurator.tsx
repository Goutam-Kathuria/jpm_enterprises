import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  type LucideIcon,
  MoveHorizontal,
  PaintBucket,
  Ruler,
  Sofa,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type SofaStyle = "L-Shape" | "Recliner" | "3-Seater" | "Custom";
type Fabric =
  | "Linen"
  | "Velvet"
  | "Leather"
  | "Microfiber"
  | "Cotton"
  | "Suede";
type Tone =
  | "Ivory"
  | "Charcoal"
  | "Sand"
  | "Slate Blue"
  | "Forest Green"
  | "Warm White"
  | "Blush"
  | "Midnight";

interface StyleOption {
  value: SofaStyle;
  label: string;
  description: string;
  image: string;
  Icon: LucideIcon;
}

interface FabricOption {
  value: Fabric;
  image: string;
  fill: string;
}

interface ColorOption {
  value: Tone;
  swatch: string;
}

const stepCount = 6;

const styleOptions: StyleOption[] = [
  {
    value: "L-Shape",
    label: "L-Shape",
    description:
      "Perfect for open-plan living spaces with a bold corner arrangement.",
    image: "/assets/generated/sofa-lshape.dim_800x600.jpg",
    Icon: Sofa,
  },
  {
    value: "Recliner",
    label: "Recliner",
    description:
      "Ultimate comfort with adjustable recline positions for relaxation.",
    image: "/assets/generated/sofa-recliner.dim_800x600.jpg",
    Icon: MoveHorizontal,
  },
  {
    value: "3-Seater",
    label: "3-Seater",
    description:
      "Classic proportions, ideal for families and everyday lounging.",
    image: "/assets/generated/sofa-modern.dim_800x600.jpg",
    Icon: Armchair,
  },
  {
    value: "Custom",
    label: "Custom",
    description:
      "Fully bespoke. We build exactly to your unique vision and space.",
    image: "/assets/generated/hero-sofa.dim_1600x900.jpg",
    Icon: Sparkles,
  },
];

const fabricOptions: FabricOption[] = [
  {
    value: "Linen",
    image: "/assets/generated/sofa-fabric.dim_800x600.jpg",
    fill: "linear-gradient(135deg, #ede2cf 0%, #e7dbc8 48%, #f5ecdd 100%)",
  },
  {
    value: "Velvet",
    image: "/assets/generated/gallery-5.dim_600x800.jpg",
    fill: "linear-gradient(135deg, #7e6bb2 0%, #8f7fc0 55%, #9988c9 100%)",
  },
  {
    value: "Leather",
    image: "/assets/generated/sofa-leather.dim_800x600.jpg",
    fill: "linear-gradient(135deg, #8f6243 0%, #9a6d4d 55%, #aa7d5b 100%)",
  },
  {
    value: "Microfiber",
    image: "/assets/generated/gallery-2.dim_800x600.jpg",
    fill: "linear-gradient(135deg, #c3bfc0 0%, #b1adaf 55%, #cbc7c8 100%)",
  },
  {
    value: "Cotton",
    image: "/assets/generated/gallery-1.dim_600x800.jpg",
    fill: "linear-gradient(135deg, #eddabd 0%, #efe2cc 50%, #f7eddc 100%)",
  },
  {
    value: "Suede",
    image: "/assets/generated/about-craftsmanship.dim_800x600.jpg",
    fill: "linear-gradient(135deg, #b08d64 0%, #b9986f 52%, #c3a47d 100%)",
  },
];

const colorOptions: ColorOption[] = [
  { value: "Ivory", swatch: "#F1ECE0" },
  { value: "Charcoal", swatch: "#494743" },
  { value: "Sand", swatch: "#D8BA92" },
  { value: "Slate Blue", swatch: "#7383A3" },
  { value: "Forest Green", swatch: "#567249" },
  { value: "Warm White", swatch: "#F7F4EE" },
  { value: "Blush", swatch: "#F0B79C" },
  { value: "Midnight", swatch: "#20203A" },
];

const cardBorder = "oklch(0.84 0.03 80)";
const gold = "oklch(0.65 0.12 75)";
const goldDark = "oklch(0.58 0.13 68)";

function summaryLine(style: SofaStyle, fabric: Fabric, tone: Tone) {
  return `Crafted in ${fabric.toLowerCase()} with a ${tone.toLowerCase()} palette for a ${style.toLowerCase()} sofa silhouette.`;
}

function formatCentimeters(value: number): string {
  return `${value}cm`;
}

export function SofaConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [style, setStyle] = useState<SofaStyle>("L-Shape");
  const [fabric, setFabric] = useState<Fabric>("Microfiber");
  const [tone, setTone] = useState<Tone>("Warm White");
  const [width, setWidth] = useState(200);
  const [depth, setDepth] = useState(110);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const selectedStyle = styleOptions.find((option) => option.value === style);
  const progressWidth = `${((currentStep + 1) / stepCount) * 100}%`;
  const phoneDigits = phone.replace(/\D/g, "");
  const canSubmit = name.trim().length >= 2 && phoneDigits.length >= 10;

  const goNext = () => {
    if (currentStep === stepCount - 1) {
      if (!canSubmit) return;
      setIsComplete(true);
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, stepCount - 1));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setStyle("L-Shape");
    setFabric("Microfiber");
    setTone("Warm White");
    setWidth(200);
    setDepth(110);
    setNotes("");
    setName("");
    setPhone("");
  };

  return (
    <div className="max-w-[720px] mx-auto">
      <div
        className="relative overflow-hidden rounded-[26px] bg-white shadow-[0_28px_70px_oklch(0.58_0.08_65_/_0.18)]"
        style={{ border: "1px solid oklch(0.92 0.01 82)" }}
      >
        {!isComplete && (
          <div
            className="absolute left-0 top-0 h-1.5 transition-all duration-300"
            style={{
              width: progressWidth,
              background: `linear-gradient(90deg, ${gold}, oklch(0.74 0.13 82))`,
            }}
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top center, oklch(0.98 0.01 84), transparent 55%)",
          }}
        />

        <div
          key={isComplete ? "complete" : currentStep}
          className="relative px-6 py-8 sm:px-10 sm:py-10 animate-[fadeIn_0.35s_ease]"
        >
          {isComplete ? (
            <div className="py-8 sm:py-12">
              <div className="flex justify-center mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    border: `2px solid ${gold}`,
                    background: "oklch(0.98 0.01 82)",
                  }}
                >
                  <CheckCircle2 size={38} style={{ color: goldDark }} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="font-playfair text-4xl font-bold text-foreground mb-4">
                  Your Sofa Journey Begins!
                </h3>
                <p className="font-general text-lg text-secondary-foreground leading-relaxed max-w-2xl mx-auto">
                  Thank you, {name.trim() || "there"}. Our craftsmen will reach
                  out at {phone || "your number"} within 24 hours.
                </p>
              </div>

              <div
                className="rounded-[18px] p-6 mb-8"
                style={{
                  border: `1px solid ${cardBorder}`,
                  background: "oklch(0.98 0.008 85)",
                }}
              >
                <div className="space-y-3 font-general text-lg">
                  <p>
                    <span style={{ color: goldDark }} className="font-semibold">
                      Style:
                    </span>{" "}
                    {style}
                  </p>
                  <p>
                    <span style={{ color: goldDark }} className="font-semibold">
                      Fabric:
                    </span>{" "}
                    {fabric}
                  </p>
                  <p>
                    <span style={{ color: goldDark }} className="font-semibold">
                      Color:
                    </span>{" "}
                    {tone}
                  </p>
                  <p>
                    <span style={{ color: goldDark }} className="font-semibold">
                      Size:
                    </span>{" "}
                    {formatCentimeters(width)} x {formatCentimeters(depth)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={resetWizard}
                  className="font-general px-10 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: gold,
                    color: "oklch(0.12 0.01 60)",
                    boxShadow: "0 14px 24px oklch(0.65 0.12 75 / 0.22)",
                  }}
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p
                  className="font-general text-sm font-semibold tracking-[0.28em] uppercase mb-4"
                  style={{ color: goldDark }}
                >
                  Step {currentStep + 1} of {stepCount}
                </p>
                <h3 className="font-playfair text-4xl font-bold text-foreground mb-3">
                  {currentStep === 0 && "Choose Your Sofa Style"}
                  {currentStep === 1 && "Select Your Fabric"}
                  {currentStep === 2 && "Pick Your Color"}
                  {currentStep === 3 && "Define Your Size"}
                  {currentStep === 4 && "Any Special Requests?"}
                  {currentStep === 5 && "Almost There!"}
                </h3>
                <p className="font-general text-lg text-secondary-foreground leading-relaxed">
                  {currentStep === 0 &&
                    "Select the silhouette that best fits your space and lifestyle."}
                  {currentStep === 1 &&
                    "Each material tells a story. Choose yours."}
                  {currentStep === 2 &&
                    "Your color sets the mood of the entire room."}
                  {currentStep === 3 &&
                    "We craft to your exact dimensions with no compromise."}
                  {currentStep === 4 &&
                    "Share details that will make your sofa truly yours."}
                  {currentStep === 5 &&
                    "Let us know how to reach you to begin your journey."}
                </p>
              </div>

              {currentStep === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {styleOptions.map((option) => {
                    const selected = style === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStyle(option.value)}
                        className="relative overflow-hidden rounded-[18px] border p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor: selected ? gold : cardBorder,
                          background: selected
                            ? "oklch(0.97 0.015 82)"
                            : "oklch(0.985 0.005 82)",
                          boxShadow: selected
                            ? "0 10px 28px oklch(0.65 0.12 75 / 0.14)"
                            : "none",
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.88)), url('${option.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                            style={{
                              background: selected
                                ? gold
                                : "oklch(0.92 0.012 82)",
                              color: selected
                                ? "oklch(0.12 0.01 60)"
                                : "oklch(0.42 0.03 60)",
                            }}
                          >
                            <option.Icon size={24} />
                          </div>
                          <p className="font-playfair text-2xl font-semibold text-foreground mb-2">
                            {option.label}
                          </p>
                          <p className="font-general text-sm leading-7 text-secondary-foreground">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fabricOptions.map((option) => {
                    const selected = fabric === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFabric(option.value)}
                        className="overflow-hidden rounded-[18px] border text-left transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor: selected ? gold : cardBorder,
                          background: "oklch(0.985 0.005 82)",
                          boxShadow: selected
                            ? "0 10px 28px oklch(0.65 0.12 75 / 0.14)"
                            : "none",
                        }}
                      >
                        <div
                          className="h-20 sm:h-24"
                          style={{
                            background: option.fill,
                          }}
                        />
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="font-general text-base font-semibold text-foreground">
                            {option.value}
                          </span>
                          {selected && (
                            <Check size={18} style={{ color: goldDark }} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="flex flex-wrap items-start gap-5 sm:gap-4">
                    {colorOptions.map((option) => {
                      const selected = tone === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setTone(option.value)}
                          className="flex flex-col items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <span
                            className="w-14 h-14 rounded-full border-[3px]"
                            style={{
                              background: option.swatch,
                              borderColor: selected
                                ? gold
                                : "oklch(0.83 0.03 82)",
                              boxShadow: selected
                                ? "0 0 0 5px oklch(0.65 0.12 75 / 0.15)"
                                : "none",
                            }}
                          />
                          <span className="font-general text-sm text-secondary-foreground">
                            {option.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="mt-10 rounded-[18px] border overflow-hidden"
                    style={{ borderColor: cardBorder }}
                  >
                    <div
                      className="h-40 sm:h-44"
                      style={{
                        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.15), rgba(15,13,10,0.1)), url('${selectedStyle?.image ?? styleOptions[0].image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="px-5 py-4 bg-white/90">
                      <div className="flex items-center gap-3 mb-2">
                        <PaintBucket size={18} style={{ color: goldDark }} />
                        <p className="font-general text-sm font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                          Current Mood
                        </p>
                      </div>
                      <p className="font-general text-base text-secondary-foreground">
                        {summaryLine(style, fabric, tone)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-10">
                  <div>
                    <div className="flex items-end justify-between mb-3">
                      <label
                        htmlFor="sofa-width"
                        className="font-general text-2xl font-semibold uppercase text-foreground"
                      >
                        Width
                      </label>
                      <p
                        className="font-general text-2xl font-semibold"
                        style={{ color: goldDark }}
                      >
                        {formatCentimeters(width)}{" "}
                        <span className="text-base font-medium text-muted-foreground">
                          cm
                        </span>
                      </p>
                    </div>
                    <input
                      id="sofa-width"
                      type="range"
                      min="100"
                      max="300"
                      step="10"
                      value={width}
                      onChange={(event) => setWidth(Number(event.target.value))}
                      className="jpm-range"
                    />
                    <div className="flex items-center justify-between mt-2 font-general text-sm text-muted-foreground">
                      <span>100cm</span>
                      <span>300cm</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-end justify-between mb-3">
                      <label
                        htmlFor="sofa-depth"
                        className="font-general text-2xl font-semibold uppercase text-foreground"
                      >
                        Depth
                      </label>
                      <p
                        className="font-general text-2xl font-semibold"
                        style={{ color: goldDark }}
                      >
                        {formatCentimeters(depth)}{" "}
                        <span className="text-base font-medium text-muted-foreground">
                          cm
                        </span>
                      </p>
                    </div>
                    <input
                      id="sofa-depth"
                      type="range"
                      min="80"
                      max="150"
                      step="5"
                      value={depth}
                      onChange={(event) => setDepth(Number(event.target.value))}
                      className="jpm-range"
                    />
                    <div className="flex items-center justify-between mt-2 font-general text-sm text-muted-foreground">
                      <span>80cm</span>
                      <span>150cm</span>
                    </div>
                  </div>

                  <div
                    className="rounded-[18px] border px-5 py-4 flex items-center justify-center gap-3"
                    style={{
                      borderColor: cardBorder,
                      background: "oklch(0.98 0.01 82)",
                    }}
                  >
                    <Sofa size={18} style={{ color: goldDark }} />
                    <p className="font-general text-base text-secondary-foreground">
                      Your sofa:{" "}
                      <span
                        className="font-semibold"
                        style={{ color: goldDark }}
                      >
                        {formatCentimeters(width)}
                      </span>{" "}
                      wide x{" "}
                      <span
                        className="font-semibold"
                        style={{ color: goldDark }}
                      >
                        {formatCentimeters(depth)}
                      </span>{" "}
                      deep
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={7}
                    placeholder="Anything special? Tell us about special dimensions, fabric details, delivery requirements or finishing touches."
                    className="w-full rounded-[18px] border px-4 py-4 font-general text-lg leading-8 outline-none resize-none transition-colors"
                    style={{
                      borderColor: cardBorder,
                      background: "oklch(0.985 0.005 82)",
                      color: "oklch(0.16 0.01 60)",
                    }}
                  />
                  <p className="font-general text-sm text-muted-foreground mt-3">
                    Optional. Skip if no special requests.
                  </p>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="custom-name"
                      className="block font-general text-sm font-semibold tracking-[0.16em] uppercase text-foreground mb-3"
                    >
                      Your Name <span style={{ color: goldDark }}>*</span>
                    </label>
                    <input
                      id="custom-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-[14px] border px-4 py-4 font-general text-lg outline-none transition-colors"
                      style={{
                        borderColor: cardBorder,
                        background: "oklch(0.985 0.005 82)",
                        color: "oklch(0.16 0.01 60)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="custom-phone"
                      className="block font-general text-sm font-semibold tracking-[0.16em] uppercase text-foreground mb-3"
                    >
                      Phone Number <span style={{ color: goldDark }}>*</span>
                    </label>
                    <input
                      id="custom-phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="10-15 digit number"
                      className="w-full rounded-[14px] border px-4 py-4 font-general text-lg outline-none transition-colors"
                      style={{
                        borderColor: cardBorder,
                        background: "oklch(0.985 0.005 82)",
                        color: "oklch(0.16 0.01 60)",
                      }}
                    />
                  </div>

                  <div
                    className="rounded-[18px] border p-5"
                    style={{
                      borderColor: cardBorder,
                      background: "oklch(0.98 0.01 82)",
                    }}
                  >
                    <p
                      className="font-general text-sm font-semibold tracking-[0.16em] uppercase mb-4"
                      style={{ color: goldDark }}
                    >
                      Your Configuration
                    </p>
                    <div className="space-y-2 font-general text-base">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Style</span>
                        <span className="font-semibold text-foreground">
                          {style}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Fabric</span>
                        <span className="font-semibold text-foreground">
                          {fabric}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Color</span>
                        <span className="font-semibold text-foreground">
                          {tone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-semibold text-foreground">
                          {formatCentimeters(width)} x{" "}
                          {formatCentimeters(depth)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mt-10">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 rounded-[14px] px-7 py-4 font-general text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-200"
                  style={{
                    border: `2px solid ${currentStep === 0 ? "oklch(0.9 0.01 82)" : gold}`,
                    color: currentStep === 0 ? "oklch(0.78 0.01 82)" : goldDark,
                    background: "white",
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentStep === stepCount - 1 && !canSubmit}
                  className="inline-flex items-center gap-2 rounded-[14px] px-8 py-4 font-general text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background:
                      currentStep === stepCount - 1 && !canSubmit
                        ? "oklch(0.84 0.02 82)"
                        : gold,
                    color:
                      currentStep === stepCount - 1 && !canSubmit
                        ? "oklch(0.55 0.02 70)"
                        : "oklch(0.12 0.01 60)",
                    boxShadow:
                      currentStep === stepCount - 1 && !canSubmit
                        ? "none"
                        : "0 12px 24px oklch(0.65 0.12 75 / 0.22)",
                  }}
                >
                  {currentStep === stepCount - 1 ? "Build My Sofa ✦" : "Next"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

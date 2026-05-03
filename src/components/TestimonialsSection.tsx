import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useWebsiteReviews } from "../lib/websiteApi";

const accentColors = [
  "oklch(0.65 0.12 75)",
  "oklch(0.58 0.1 210)",
  "oklch(0.55 0.09 155)",
  "oklch(0.57 0.12 35)",
  "oklch(0.58 0.11 330)",
];

function getInitials(name: string) {
  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "JC";
}

export function TestimonialsSection() {
  const headerRef = useScrollReveal();
  const { data: reviews = [], isLoading, error } = useWebsiteReviews();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    if (reviews.length === 0) {
      return;
    }

    setCurrent((index) => (index + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    if (reviews.length === 0) {
      return;
    }

    setCurrent((index) => (index - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (current >= reviews.length) {
      setCurrent(0);
    }
  }, [current, reviews.length]);

  useEffect(() => {
    if (paused || reviews.length < 2) {
      return;
    }

    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [next, paused, reviews.length]);

  const activeReview = reviews[current];

  return (
    <section id="testimonials" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="reveal mb-16 text-center">
          <p
            className="mb-3 font-general text-sm font-semibold uppercase tracking-[0.25em]"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            Reviews
          </p>
          <h2 className="font-playfair text-4xl font-bold text-foreground lg:text-5xl">
            Client voices that shape every sofa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-general text-base leading-relaxed text-muted-foreground">
            Real feedback from homeowners and designers who trust JPM for
            premium comfort, beautiful finishes, and service that feels
            effortless.
          </p>
        </div>

        {error && !isLoading ? (
          <div
            className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 text-center"
            style={{ border: "1px solid oklch(0.9 0.015 82)" }}
          >
            <p className="font-playfair text-2xl font-semibold text-foreground">
              Reviews couldn&apos;t be loaded
            </p>
            <p className="mt-3 font-general text-sm text-muted-foreground">
              The carousel is wired to the review API, so this usually means the
              website service isn&apos;t reachable right now.
            </p>
          </div>
        ) : null}

        {!error ? (
          isLoading ? (
            <div
              className="mx-auto max-w-4xl rounded-[32px] bg-white p-10"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <div className="mb-6 h-5 w-28 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
              <div className="mb-4 h-10 w-full animate-pulse rounded-[20px] bg-[oklch(0.95_0.01_82)]" />
              <div className="mb-4 h-10 w-4/5 animate-pulse rounded-[20px] bg-[oklch(0.95_0.01_82)]" />
              <div className="h-10 w-3/4 animate-pulse rounded-[20px] bg-[oklch(0.95_0.01_82)]" />
            </div>
          ) : activeReview ? (
            <div
              className="relative mx-auto max-w-4xl"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className="absolute -top-5 left-2 opacity-15"
                style={{ color: "oklch(0.65 0.12 75)" }}
              >
                <Quote size={84} fill="oklch(0.65 0.12 75)" />
              </div>

              <div
                className="overflow-hidden rounded-[34px] bg-white p-8 shadow-[0_24px_55px_oklch(0.12_0.01_60_/_0.08)] lg:p-10"
                style={{ border: "1px solid oklch(0.9 0.015 82)" }}
              >
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <span
                    className="rounded-full px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                      background: "oklch(0.65 0.12 75 / 0.1)",
                      color: "oklch(0.55 0.14 65)",
                    }}
                  >
                    {reviews.length} published reviews
                  </span>
                  <div className="flex items-center gap-2">
                    {reviews.map((review, index) => (
                      <button
                        key={review.id}
                        type="button"
                        onClick={() => setCurrent(index)}
                        data-ocid={`testimonials.dot.${index + 1}`}
                        className="h-2.5 rounded-full transition-all duration-300"
                        style={{
                          width: index === current ? "28px" : "10px",
                          background:
                            index === current
                              ? "oklch(0.65 0.12 75)"
                              : "oklch(0.9 0.015 82)",
                        }}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="font-playfair text-2xl italic leading-relaxed text-foreground lg:text-3xl">
                  "{activeReview.description}"
                </p>

                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {activeReview.profilePic ? (
                      <img
                        src={activeReview.profilePic}
                        alt={activeReview.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full font-general text-lg font-bold text-white"
                        style={{
                          background:
                            accentColors[current % accentColors.length],
                        }}
                      >
                        {getInitials(activeReview.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-playfair text-xl font-semibold text-foreground">
                        {activeReview.name}
                      </p>
                      <p className="font-general text-sm uppercase tracking-[0.16em] text-muted-foreground">
                        JPM Client
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      data-ocid="testimonials.prev_button"
                      onClick={prev}
                      className="rounded-full p-3 transition-colors duration-200"
                      style={{
                        border: "1px solid oklch(0.88 0.02 82)",
                        color: "oklch(0.45 0.03 70)",
                      }}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      data-ocid="testimonials.next_button"
                      onClick={next}
                      className="rounded-full p-3 transition-colors duration-200"
                      style={{
                        border: "1px solid oklch(0.88 0.02 82)",
                        color: "oklch(0.45 0.03 70)",
                      }}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="mx-auto max-w-3xl rounded-[28px] bg-white p-10 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <p className="font-playfair text-2xl font-semibold text-foreground">
                Review cards will appear here once testimonials are added
              </p>
              <p className="mt-3 font-general text-sm text-muted-foreground">
                The review slider is fully wired and waiting for website review
                data.
              </p>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}

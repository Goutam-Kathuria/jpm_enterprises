import { useState, useEffect } from "react";
import {
  resolveWebsiteApiBaseUrl,
  resolveWebsiteAssetUrl,
  useWebsiteBanners,
} from "../lib/websiteApi";

export function BannerSection() {
  const { data: banners = [] } = useWebsiteBanners();
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseUrl = resolveWebsiteApiBaseUrl();

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  const bannerImageUrl = currentBanner?.image
    ? /^https?:\/\//i.test(currentBanner.image)
      ? currentBanner.image
      : resolveWebsiteAssetUrl(currentBanner.image, baseUrl) || currentBanner.image
    : "";

  return (
    <section id="banner" className="relative w-full mt-24 mb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Image Container */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-xl">
          {/* Banner Image */}
          {bannerImageUrl && (
            currentBanner?.product ? (
              <a
                href={`/product/${currentBanner.product.slug}`}
                className="block w-full h-full"
                aria-label={`View ${currentBanner.product.name}`}
              >
                <img
                  src={bannerImageUrl}
                  alt={currentBanner.product.name}
                  className="w-full h-full object-cover transition-opacity duration-700"
                />
              </a>
            ) : (
              <img
                src={bannerImageUrl}
                alt="Banner"
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            )
          )}

          {/* Dot Indicators - Only show if more than 1 banner */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

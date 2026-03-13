import { AboutSection } from "./components/AboutSection";
import { CollectionSection } from "./components/CollectionSection";
import { ContactSection } from "./components/ContactSection";
import { CustomDesignSection } from "./components/CustomDesignSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WhyChooseSection } from "./components/WhyChooseSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <CustomDesignSection />
        <WhyChooseSection />
        <GallerySection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

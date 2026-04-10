import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
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
import { CustomDesignPage } from "./pages/CustomDesignPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

function HomePage() {
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

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetailPage,
});

const customDesignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/custom-design",
  component: CustomDesignPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  customDesignRoute,
  servicesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

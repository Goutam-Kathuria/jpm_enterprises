import {
  Outlet,
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
import { WebsiteAnalyticsPing } from "./components/WebsiteAnalyticsPing";
import { WhyChooseSection } from "./components/WhyChooseSection";
import {
  buildLocalBusinessSchema,
  buildWebsiteSchema,
  useDocumentMetadata,
} from "./lib/seo";
import { useWebsiteSettings } from "./lib/websiteApi";
import { CustomDesignPage } from "./pages/CustomDesignPage";
import { Toaster } from "./components/ui/sonner";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

function HomePage() {
  const { data: settings } = useWebsiteSettings();

  useDocumentMetadata({
    title: "Luxury Sofa Collections and Custom Furniture",
    description:
      "Explore JPM Enterprises for collection-focused sofa designs, custom furniture solutions, gallery showcases, and premium handcrafted furniture from Hisar.",
    path: "/",
    keywords: [
      "luxury sofa manufacturer",
      "custom sofa design",
      "furniture store in Hisar",
      "premium sofa collections",
      "bespoke furniture India",
    ],
    structuredData: [buildWebsiteSchema(), buildLocalBusinessSchema(settings)],
  });

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

function AppRootLayout() {
  return (
    <>
      <WebsiteAnalyticsPing />
      <Outlet />
    </>
  );
}

const rootRoute = createRootRoute({
  component: AppRootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productSlug",
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
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

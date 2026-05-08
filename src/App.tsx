import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AboutSection } from "./components/AboutSection";
import { BlogSection } from "./components/BlogSection";
import { CollectionSection } from "./components/CollectionSection";
import { ContactSection } from "./components/ContactSection";
import { CustomDesignSection } from "./components/CustomDesignSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { SeoHead } from "./components/SeoHead";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WebsiteAnalyticsPing } from "./components/WebsiteAnalyticsPing";
import { WhyChooseSection } from "./components/WhyChooseSection";
import { Toaster } from "./components/ui/sonner";
import { useWebsiteBlogs } from "./lib/blogs";
import {
  buildBlogListingSchema,
  buildItemListSchema,
  buildLocalBusinessSchema,
  buildWebsiteSchema,
} from "./lib/seo";
import { useWebsiteProducts, useWebsiteSettings } from "./lib/websiteApi";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { BlogsPage } from "./pages/BlogsPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { CustomDesignPage } from "./pages/CustomDesignPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

function HomePage() {
  const { data: settings } = useWebsiteSettings();
  const { data: products = [] } = useWebsiteProducts();
  const { data: blogContent } = useWebsiteBlogs();
  const featuredProducts = products.slice(0, 8);
  const featuredBlogs = blogContent.posts.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Luxury Sofa Collections and Custom Furniture"
        description="Explore JPM Enterprises for collection-focused sofa designs, custom furniture solutions, gallery showcases, and premium handcrafted furniture from Hisar."
        path="/"
        keywords={[
          "luxury sofa manufacturer",
          "custom sofa design",
          "furniture store in Hisar",
          "premium sofa collections",
          "bespoke furniture India",
        ]}
        structuredData={[
          buildWebsiteSchema(),
          buildLocalBusinessSchema(settings),
          ...(featuredProducts.length > 0
            ? [
                buildItemListSchema(
                  "JPM Featured Sofa Collection",
                  featuredProducts.map((product) => ({
                    name: product.name,
                    path: `/product/${product.slug}`,
                    image: product.image,
                  })),
                ),
              ]
            : []),
          ...(featuredBlogs.length > 0
            ? [buildBlogListingSchema(featuredBlogs)]
            : []),
        ]}
      />
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <CustomDesignSection />
        <WhyChooseSection />
        <GallerySection />
        <BlogSection />
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

const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});

const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blogs",
  component: BlogsPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blogs/$blogSlug",
  component: BlogDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  customDesignRoute,
  servicesRoute,
  collectionsRoute,
  galleryRoute,
  blogsRoute,
  blogDetailRoute,
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

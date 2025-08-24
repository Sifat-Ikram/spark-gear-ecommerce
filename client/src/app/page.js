import Banner from "@/components/homepage/banner/Banner";
import BrandSection from "@/components/homepage/brands/BrandSection";
import CategoriesSection from "@/components/homepage/categories/CategoriesSection";
import WhyChooseUs from "@/components/homepage/choose/WhyChooseUs";
import FeaturedProducts from "@/components/homepage/featuredProduct/FeaturedProducts";
import HeroProductHighlight from "@/components/homepage/highlights/HeroProductHighlight";
import IntroSection from "@/components/homepage/intro/IntroSection";
import NewArrival from "@/components/homepage/new-arrivals/NewArrival";

export const metadata = {
  title: "Spark Gear | Best Gadget Shop for Innovative Tech Products",
  description:
    "Discover the latest gadgets, electronics, and accessories at Spark Gear. From laptops to USB drives, shop quality products at the best prices.",
  keywords: [
    "gadgets",
    "electronics",
    "tech shop",
    "laptops",
    "headphones",
    "USB drives",
    "Spark Gear",
  ],
  openGraph: {
    title: "Spark Gear – Your Trusted Gadget Shop",
    description:
      "Shop premium gadgets and electronics at Spark Gear. Explore featured products, new arrivals, and exclusive deals.",
    url: "https://sparkgear.com",
    siteName: "Spark Gear",
    images: [
      {
        url: "https://sparkgear.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spark Gear Gadgets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://sparkgear.com",
  },
};

export default function Home() {
  return (
    <div className="my-20 space-y-20">
      <Banner />
      <div className="w-11/12 mx-auto flex flex-col space-y-20">
        <IntroSection />
        <CategoriesSection />
        <WhyChooseUs />
        <FeaturedProducts />
        <BrandSection />
      </div>
      <HeroProductHighlight />
      <div className="w-11/12 mx-auto flex flex-col space-y-20">
        <NewArrival />
      </div>
    </div>
  );
}

import AppDownload from "@/components/homepage/appDownload/AppDownload";
import Banner from "@/components/homepage/banner/Banner";
import BrandSection from "@/components/homepage/brands/BrandSection";
import CategoriesSection from "@/components/homepage/categories/CategoriesSection";
import WhyChooseUs from "@/components/homepage/choose/WhyChooseUs";
import FeaturedProducts from "@/components/homepage/featuredProduct/FeaturedProducts";
import HeroProductHighlight from "@/components/homepage/highlights/HeroProductHighlight";
import IntroSection from "@/components/homepage/intro/IntroSection";
import NewArrival from "@/components/homepage/new-arrivals/NewArrival";
import TestimonialSection from "@/components/homepage/testimonial/TestimonialSection";
import MainLayout from "./main-layout/layout";

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

const Home = async () => {
  const res = await fetch(
    "https://spark-gear-server.vercel.app/api/banner/active",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");
  const banner = await res.json();

  const reviewRes = await fetch(
    "https://spark-gear-server.vercel.app/api/reviews/highest-rated",
    {
      next: { revalidate: 60 },
    }
  );

  if (!reviewRes.ok) throw new Error("Failed to fetch reviews");

  const { data: reviews } = await reviewRes.json();

  return (
    <MainLayout>
      <div className="my-20 space-y-20 xl:space-y-32 2xl:space-y-44">
        {/* <Banner banner={banner.activeBanner} /> */}
        <div className="w-11/12 mx-auto flex flex-col space-y-20 xl:space-y-32 2xl:space-y-44">
          <IntroSection />
          <CategoriesSection />
          <FeaturedProducts />
        </div>
        <WhyChooseUs />
        <div className="w-11/12 mx-auto flex flex-col space-y-20 xl:space-y-32 2xl:space-y-44">
          <BrandSection />
          <HeroProductHighlight />
          <NewArrival />
        </div>
        <AppDownload />
        <div className="w-11/12 mx-auto flex flex-col space-y-20 xl:space-y-32 2xl:space-y-44">
          <TestimonialSection reviews={reviews} />
        </div>
      </div>
    </MainLayout>
  );
};
export default Home;

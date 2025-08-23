import Banner from "@/components/homepage/banner/Banner";
import CategoriesSection from "@/components/homepage/categories/CategoriesSection";
import WhyChooseUs from "@/components/homepage/choose/WhyChooseUs";
import FeaturedProducts from "@/components/homepage/featuredProduct/FeaturedProducts";
import HeroProductHighlight from "@/components/homepage/highlights/HeroProductHighlight";
import IntroSection from "@/components/homepage/intro/IntroSection";
import NewArrival from "@/components/homepage/new-arrivals/NewArrival";

export default function Home() {
  return (
    <div className="my-20 space-y-20">
      <Banner />
      <div className="w-11/12 mx-auto flex flex-col space-y-20">
        <IntroSection />
        <CategoriesSection />
        <WhyChooseUs />
        <FeaturedProducts />
      </div>
      <HeroProductHighlight />
      <div className="w-11/12 mx-auto flex flex-col space-y-20">
        <NewArrival />
      </div>
    </div>
  );
}

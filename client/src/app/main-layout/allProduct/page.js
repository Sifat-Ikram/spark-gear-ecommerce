import Cover from "@/components/card/Cover";
import ProductSection from "@/components/productpage/ProductSection";


export const metadata = {
  title: "Our Products - Spark Gear",
  description:
    "Explore our wide range of products, carefully curated to meet your needs. Discover quality products with easy filtering and seamless browsing.",
  keywords:
    "products, buy online, electronics, gadgets, computers, mobile, headphon, mice",
  openGraph: {
    title: "Our Products - [Your Brand Name]",
    description:
      "Explore our wide range of products, carefully curated to meet your needs.",
    url: "https://yourdomain.com/products",
    siteName: "Spark Gear",
    type: "website",
  },
};

export default async function ProductsPage() {
  const res = await fetch("https://spark-gear-server.vercel.app/api/product", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();

  return (
    <div className="w-full min-h-screen">
      <Cover
        title="Discover Our Collection"
        subtitle="Explore our wide range of products, carefully curated to meet your
          needs. Use the filters below to find exactly what you are looking for."
        bgImage={"https://i.ibb.co/Z1Fn3kqN/istockphoto-1165052026-612x612.jpg"}
      />
      <ProductSection products={products} />
    </div>
  );
}

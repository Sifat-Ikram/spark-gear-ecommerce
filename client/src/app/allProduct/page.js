import Cover from "@/components/card/Cover";
import FilterBar from "@/components/productpage/FilterBar";
import ProductSection from "@/components/productpage/ProductSection";

export default async function ProductsPage() {
  // ISR (revalidate every 60 seconds)
  const res = await fetch("http://localhost:5000/api/product", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();

  return (
    <div className="w-full min-h-screen">
      <Cover title="Our Products" />
      <div className="w-full text-center py-20 px-4">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">
          Discover Our Collection
        </h2>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
          Explore our wide range of products, carefully curated to meet your
          needs. Use the filters below to find exactly what you are looking for.
        </p>
      </div>
      <ProductSection products={products} />
    </div>
  );
}

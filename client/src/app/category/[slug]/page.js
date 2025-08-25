import Image from "next/image";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const categoryName = slug.replace(/-/g, " ").toUpperCase();

  return {
    title: `${categoryName} | Spark Gear`,
    description: `Browse the best ${categoryName} products in our store. High-quality items at competitive prices.`,
    openGraph: {
      title: `${categoryName} | Spark Gear`,
      description: `Check out our latest ${categoryName} products.`,
      url: `http://localhost:3000/category/${slug}`,
      images: [
        {
          url: `http://localhost:3000/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${categoryName} products`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `http://localhost:5000/api/product/category/${slug}`,
    {
      next: { revalidate: 60 }, // ISR
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <section className="px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={product.images?.[0]?.url || "/placeholder.png"} // fallback
                alt={product.images?.[0]?.alt || product.name}
                height={160}
                width={160}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-sm md:text-base font-medium mb-1">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

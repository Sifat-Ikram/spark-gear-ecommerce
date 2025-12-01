import CategoryDetails from "@/components/categorypage/CategoryDetails";

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
      url: `https://spark-gear-six.vercel.app/category/${slug}`,
      images: [
        {
          url: `https://spark-gear-six.vercel.app/og-default.png`,
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
    `https://spark-gear-server.vercel.app/api/product/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  const resCategory = await fetch(
    `https://spark-gear-server.vercel.app/api/category/category/${slug}`
  );

  const category = await resCategory.json();

  return (
    <section>
      <CategoryDetails category={category} products={products} />
    </section>
  );
}

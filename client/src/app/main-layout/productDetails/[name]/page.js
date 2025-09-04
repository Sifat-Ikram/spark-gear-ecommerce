import DescriptionSection from "@/components/product-details/DescriptionSection";
import DetailsTop from "@/components/product-details/DetailsTop";
import ReviewSection from "@/components/product-details/ReviewSection";
import SimilarProducts from "@/components/product-details/SimilarProducts";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { name } = await params;
  const res = await fetch(`http://localhost:5000/api/product`);
  const products = await res.json();
  const product = products.find((p) => p.slug === name);

  if (!product) {
    return {
      title: "Product Not Found | Spark Gear",
      description: "This product does not exist in our store.",
    };
  }

  return {
    title: `${product.slug} | Spark Gear`,
    description: product?.shortDescription,
    openGraph: {
      title: product.title,
      description: product?.shortDescription,
      url: `http://localhost:3000/api/product/${name}`,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  };
}

async function getProductBySlug(name) {
  const res = await fetch(`http://localhost:5000/api/product`);
  if (!res.ok) return null;

  const products = await res.json();
  return products.find((p) => p.slug === name);
}

const DetailPage = async ({ params }) => {
  const { name } = await params;
  const product = await getProductBySlug(name);
  if (!product) return notFound();

  return (
    <main className="w-full mx-auto space-y-20 pb-10 min-h-screen">
      <DetailsTop product={product} />
      <DescriptionSection product={product} />
      <ReviewSection name={product.name} />
      <SimilarProducts productName={product.name} category={product.category} />
    </main>
  );
};

export default DetailPage;

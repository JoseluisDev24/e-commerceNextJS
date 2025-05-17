import { getProductById } from "@/api/products";
import ProductDetail from "@/components/products/ProductDetail";
import { notFound } from "next/navigation";




export default async function ProductDetailPage(
  {params}: {params: Promise<{ id: string }>;
}) {
  try {
    const productId = (await params).id;
    const product = await getProductById(productId);
    return (
      <div>
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return notFound();
  }
}

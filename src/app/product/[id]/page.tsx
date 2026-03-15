import { notFound } from "next/navigation";
import styles from "./page.module.css";
import AddToCartButton from "@/components/product/AddToCartButton";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Wait for the route params locally
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  let parsedImages = [""];
  try {
    parsedImages = JSON.parse(product.images);
  } catch(e) {}

  const mainImage = parsedImages.length > 0 ? parsedImages[0] : "";

  let availableSizes: string[] = [];
  try {
    availableSizes = JSON.parse(product.sizes);
  } catch(e) {}

  return (
    <div className={`container ${styles.page}`}>
      <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", color: "var(--color-text-light)" }}>
        <FiChevronLeft /> Back to Shop
      </Link>
      
      <div className={styles.layout}>
        <div className={styles.imageContainer}>
          <img src={mainImage} alt={product.name} className={styles.image} />
          {parsedImages.length > 1 && (
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {parsedImages.map((src, idx) => (
                <img key={idx} src={src} alt="Thumbnail view" style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "1px solid var(--color-border)" }} />
              ))}
            </div>
          )}
        </div>
        
        <div className={styles.details}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>Rs. {product.price.toFixed(2)}</div>
          
          <div className={styles.description}>
            {product.description}
          </div>
          
          <div className={styles.actions}>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: mainImage
              }} 
              availableSizes={availableSizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

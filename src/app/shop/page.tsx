import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import prisma from "@/lib/db";

import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : 'All';

  let whereClause = {};
  if (category !== 'All' && category !== 'New Arrivals') {
    whereClause = { category };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.title}>All Collections</h1>
        <p className={styles.description}>
          Browse our full range of elegantly designed women's wear. From office-ready styles to perfect weekend outfits.
        </p>
      </header>

      {/* Simple standard static filter UI for MVP look */}
      <div className={styles.filters}>
        <Link href="/shop" className={`${styles.filterBtn} ${category === 'All' ? styles.active : ''}`}>All</Link>
        <Link href="/shop?category=New Arrivals" className={`${styles.filterBtn} ${category === 'New Arrivals' ? styles.active : ''}`}>New Arrivals</Link>
        <Link href="/shop?category=Dresses" className={`${styles.filterBtn} ${category === 'Dresses' ? styles.active : ''}`}>Dresses</Link>
        <Link href="/shop?category=Tops" className={`${styles.filterBtn} ${category === 'Tops' ? styles.active : ''}`}>Tops</Link>
        <Link href="/shop?category=Bottoms" className={`${styles.filterBtn} ${category === 'Bottoms' ? styles.active : ''}`}>Bottoms</Link>
      </div>

      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map(product => {
            let parsedImages = [""];
            try {
              parsedImages = JSON.parse(product.images);
            } catch(e) {}
            return (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={parsedImages}
              category={product.category}
            />
          )})
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
            <p>No products found. Stay tuned for our upcoming collections!</p>
          </div>
        )}
      </div>
    </div>
  );
}

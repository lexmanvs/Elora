import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

// Server Component fetching from DB
export default async function Home() {
  // Fetch some products for the "Featured" section
  // In a real app we might fetch only those marked "featured"
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // Dummy placeholder image for hero
  const heroImageUrl = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop";

  return (
    <>
      <section className={styles.hero}>
        <img src={heroImageUrl} alt="Elora Fashion" className={styles.heroBg} loading="eager" />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Elevate Your Everyday Elegance</h1>
          <p className={styles.subtitle}>
            Discover our latest collection of premium women's clothing. Designed for comfort, confidence, and effortless style.
          </p>
          <div className={styles.buttonWrapper}>
            <Link href="/shop" passHref>
              <Button size="lg" variant="primary">Shop Collection</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <h2 className={styles.sectionTitle}>Featured Arrivals</h2>
        
        {featuredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => {
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
            )})}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "var(--color-text-light)" }}>
            <p>Products are coming soon!</p>
            <p>Admin, please log in to add catalog items.</p>
          </div>
        )}
      </section>

      {/* Another banner section could go here */}
      <section style={{ backgroundColor: "var(--color-primary)", padding: "4rem 0", color: "white", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            The Elora Promise
          </h2>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.6" }}>
            We believe in quality over quantity. Every piece is meticulously crafted using premium fabrics that honor your comfort and elevate your style.
          </p>
        </div>
      </section>
    </>
  );
}

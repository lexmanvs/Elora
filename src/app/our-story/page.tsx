import styles from "./page.module.css";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function OurStoryPage() {
  return (
    <div className="container">
      <div className={styles.storyHeader}>
        <h1 className={styles.title}>Our Story</h1>
        <p className={styles.subtitle}>Discover the journey of Elora and the inspiration behind every stitch.</p>
      </div>
      
      <div className={styles.storyContent}>
        <div className={styles.storyImages}>
          <img src="/elora_story_logo.jpg" alt="Elora Atelier" className={styles.mainImage} />
        </div>
        
        <div className={styles.textContent}>
          <h2 className={styles.heading}>The Vision</h2>
          <p className={styles.paragraph}>
            Elora was born out of a passion for crafting premium, elegant, and empowering women's wear. We realized that true elegance lies in simplicity, quality fabrics, and timeless design. Our mission is to make every woman feel confident and beautiful, no matter the occasion.
          </p>
          
          <h2 className={styles.heading}>Our Craft</h2>
          <p className={styles.paragraph}>
            We work exclusively with boutique artisans and ethical textile producers. Every piece in our collection is meticulously crafted with attention to the smallest details—from the perfect drape of a dress to the softest touch of our everyday garments.
          </p>
          
          <h2 className={styles.heading}>The Promise</h2>
          <p className={styles.paragraph}>
            When you wear Elora, you wear a commitment to quality. We don't just sell clothes; we offer a wardrobe that stands the test of time, season after season. Let us be part of your story.
          </p>
          
          <div style={{ marginTop: "3rem" }}>
            <Link href="/shop" passHref>
              <Button size="lg">Explore Our Collections</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

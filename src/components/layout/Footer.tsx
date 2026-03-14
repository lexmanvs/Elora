import Link from "next/link";
import styles from "./Footer.module.css";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <Link href="/" className={styles.logo}>Elora</Link>
            <p>
              Premium women's clothing designed for modern everyday wear, 
              office-ready styles, and effortless elegance.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <a href="https://www.instagram.com/elora_by_pournamy/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-text)", textDecoration: "none", fontSize: "0.95rem" }}>
                <FiInstagram size={20} />
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>
          
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Shop</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/shop">All Products</Link></li>
              <li><Link href="/shop?category=New Arrivals">New Arrivals</Link></li>
              <li><Link href="/shop">Collections</Link></li>
              <li><Link href="/our-story">Our Story</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Help</h3>
            <ul className={styles.linkList}>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Elora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

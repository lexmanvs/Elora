"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingBag, FiMenu, FiUser, FiInstagram } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <button className={styles.iconButton} style={{ display: "none" }} aria-label="Menu">
          {/* Mobile menu to be implemented later if needed */}
          <FiMenu />
        </button>

        <Link href="/" className={styles.logo}>
          Elora
        </Link>

        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/shop" className={styles.navLink}>Shop</Link>
          <Link href="/shop" className={styles.navLink}>Collections</Link>
          <Link href="/our-story" className={styles.navLink}>Our Story</Link>
        </nav>

        <div className={styles.navActions}>
          <a href="https://www.instagram.com/elora_by_pournamy/" target="_blank" rel="noopener noreferrer" className={styles.iconButton} aria-label="Instagram">
            <FiInstagram />
          </a>
          <Link href="/admin/login" className={styles.iconButton} aria-label="Admin Profile">
            <FiUser />
          </Link>
          <Link href="/cart" className={styles.iconButton} aria-label="Cart">
            <FiShoppingBag />
            {mounted && totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

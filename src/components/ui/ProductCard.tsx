"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

export default function ProductCard({ id, name, price, images, category }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds on hover
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentIndex(0); // Reset to main image on mouse leave
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  return (
    <Link 
      href={`/product/${id}`} 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageWrapper}>
        {images.map((imgUrl, idx) => (
          <img 
            key={idx}
            src={imgUrl} 
            alt={`${name} - preview ${idx}`} 
            className={`${styles.image} ${idx === currentIndex ? styles.active : ''}`} 
            loading="lazy" 
          />
        ))}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.price}>Rs. {price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

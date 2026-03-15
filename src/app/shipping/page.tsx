"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";

export default function ShippingAndReturns() {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!trackingId.trim()) {
      setError("Please enter a valid tracking ID.");
      return;
    }

    // Basic UUID validation regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(trackingId.trim())) {
      setError("Invalid tracking ID format. It should look like: xxxxxxxx-xxxx-...");
      return;
    }

    // Redirect to the existing secure order tracking page
    router.push(`/order/${trackingId.trim()}`);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shipping & Tracking</h1>
        <p className={styles.subtitle}>Track your package or read about our policies</p>
      </header>

      <section className={styles.trackCard}>
        <h2 className={styles.trackTitle}>Track Your Order</h2>
        <form onSubmit={handleTrackOrder} className={styles.trackForm}>
          <div className={styles.trackInputWrapper}>
            <input 
              type="text" 
              placeholder="Paste your Unique Tracking ID here..." 
              className={styles.trackInput}
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
          <Button type="submit" size="lg">Track Package</Button>
        </form>
      </section>

      <section className={styles.infoSection}>
        <h2 className={styles.infoTitle}>Shipping Policy</h2>
        <p className={styles.infoText}>
          At Elora, we strive to deliver your elegant wardrobe additions as swiftly as possible. 
          Standard shipping typically takes 3-5 business days within the domestic region. 
          Once your order is placed, you will receive a confirmation message containing your Unique Tracking ID.
        </p>
        <p className={styles.infoText}>
          Please note that during peak seasons or promotional events, processing times may be slightly extended. 
          We appreciate your patience and promise it will be worth the wait.
        </p>
      </section>

      <section className={styles.infoSection}>
        <h2 className={styles.infoTitle}>Return Policy</h2>
        <p className={styles.infoText}>
          We want you to feel confident and beautiful in every Elora piece. If you are not completely satisfied 
          with your purchase, we accept returns within 14 days of delivery for a full refund or exchange.
        </p>
        <p className={styles.infoText}>
          Items must be unworn, unwashed, and in their original condition with all tags attached. 
          To initiate a return, please contact our support team with your Order Number and we will guide you 
          through the seamless process.
        </p>
      </section>
    </div>
  );
}

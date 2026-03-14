"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save order to backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          totalAmount: totalPrice,
          items: cart,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order.");
      
      const data = await res.json();
      const orderNumber = data.orderNumber;

      // 2. Clear Cart
      clearCart();

      // 3. Prepare WhatsApp Message
      const waNumber = "1234567890"; // Replace with brand's actual WhatsApp number (e.g., 919876543210 for India)
      let message = `Hello Elora! \nI would like to place an order.\n\n*Order ID:* ${orderNumber}\n*Name:* ${formData.name}\n*Total:* Rs. ${totalPrice.toFixed(2)}\n\n*Items:*\n`;
      
      cart.forEach(item => {
        const sizeStr = item.size ? ` Size: ${item.size}` : '';
        message += `- ${item.quantity}x ${item.name}${sizeStr} (Rs. ${item.price.toFixed(2)})\n`;
      });
      message += `\n*Delivery Address:*\n${formData.address}\n\nCan you confirm my order?`;

      // Redirect to WhatsApp
      const encodedMsg = encodeURIComponent(message);
      window.location.href = `https://wa.me/${waNumber}?text=${encodedMsg}`;
      
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!mounted || cart.length === 0) return null;

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className={styles.input} 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>WhatsApp Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Delivery Address</label>
            <textarea 
              id="address" 
              name="address" 
              required 
              className={styles.textarea}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <ul className={styles.itemList}>
            {cart.map((item) => (
              <li key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                <span>{item.quantity}x {item.name} {item.size ? `(${item.size})` : ''}</span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <span>Order Total:</span>
            <span>Rs. {totalPrice.toFixed(2)}</span>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order via WhatsApp"}
          </Button>
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "1rem" }}>
            You will be redirected to WhatsApp to finalize your purchase.
          </p>
        </form>
      </div>
    </div>
  );
}

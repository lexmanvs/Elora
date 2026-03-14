"use client";

import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="container" style={{ padding: "4rem 0" }}>Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
        <div className={styles.emptyCart}>
          <p style={{ marginBottom: "2rem", color: "var(--color-text-light)" }}>Your cart is currently empty.</p>
          <Link href="/shop" passHref>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Your Shopping Cart</h1>

      <div className={styles.layout}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name} {item.size ? `(${item.size})` : ''}</h3>
                <div className={styles.itemPrice}>Rs. {item.price.toFixed(2)}</div>
                
                <div className={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className={styles.quantityBtn}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className={styles.quantityBtn}>
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              <button onClick={() => removeFromCart(item.id, item.size)} className={styles.removeBtn} aria-label="Remove item">
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Items ({totalItems})</span>
            <span>Rs. {totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>Rs. {totalPrice.toFixed(2)}</span>
          </div>

          <Link href="/checkout" passHref>
            <Button fullWidth size="lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

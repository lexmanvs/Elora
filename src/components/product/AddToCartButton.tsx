"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  availableSizes: string[];
}

export default function AddToCartButton({ product, availableSizes }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(availableSizes.length > 0 ? availableSizes[0] : "");

  const handleAdd = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {availableSizes.length > 0 && (
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500", color: "var(--color-text-light)" }}>Select Size</label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {availableSizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{ 
                  padding: "0.5rem 1rem", 
                  border: `1px solid ${selectedSize === size ? 'var(--color-primary-dark)' : 'var(--color-border)'}`,
                  background: selectedSize === size ? 'var(--color-primary-dark)' : 'transparent',
                  color: selectedSize === size ? 'white' : 'inherit',
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button 
        size="lg" 
        variant={added ? "secondary" : "primary"} 
        fullWidth 
        onClick={handleAdd}
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </Button>
    </div>
  );
}

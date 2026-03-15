"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { addProduct } from "./actions";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      await addProduct(formData);
      
      setSuccess(true);
      if (formRef.current) {
        formRef.current.reset(); // Clear the form on success
      }
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while creating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", height: "fit-content" }}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Add New Product</h2>
      
      {error && <div style={{ color: "var(--color-error)", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</div>}
      {success && <div style={{ color: "var(--color-success)", marginBottom: "1rem", fontSize: "0.9rem" }}>Product created successfully!</div>}
      
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Name</label>
          <input type="text" name="name" required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Price (Rs.)</label>
          <input type="number" step="0.01" name="price" required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Category</label>
          <select name="category" required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
            <option value="Dresses">Dresses</option>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Accessories">Accessories</option>
            <option value="New Arrivals">New Arrivals</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Available Sizes</label>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "0.5rem 0" }}>
            {["XS", "S", "M", "L", "XL", "XXL", "Free Size"].map(size => (
              <label key={size} style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                <input type="checkbox" name="sizes" value={size} />
                <span style={{ fontSize: "0.9rem" }}>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Upload Images</label>
          <input type="file" name="imageFiles" multiple accept="image/*" style={{ width: "100%", padding: "0.5rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Image URLs (One per line) - Optional</label>
          <textarea name="images" placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..." rows={3} style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", resize: "vertical" }}></textarea>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Description</label>
          <textarea name="description" required rows={4} style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", resize: "vertical" }}></textarea>
        </div>

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}

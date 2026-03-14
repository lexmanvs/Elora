import { addProduct, deleteProduct } from "./actions";
import Button from "@/components/ui/Button";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function ProductsAdmin() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Product Management</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
        
        {/* ADD PRODUCT FORM */}
        <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", height: "fit-content" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Add New Product</h2>
          
          <form action={addProduct} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

            <Button type="submit" fullWidth>Create Product</Button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Inventory ({products.length})</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {products.length === 0 ? (
              <p style={{ color: "var(--color-text-light)" }}>No products added yet.</p>
            ) : (
              products.map(product => {
                let parsedImages = [];
                try {
                  parsedImages = JSON.parse(product.images);
                } catch(e) {}
                const mainImage = parsedImages.length > 0 ? parsedImages[0] : "";

                return (
                <div key={product.id} style={{ display: "flex", gap: "1rem", padding: "1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", alignItems: "center" }}>
                  <img src={mainImage} alt={product.name} style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{product.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-primary-dark)" }}>Rs. {product.price.toFixed(2)} • {product.category}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)" }}>{parsedImages.length} images</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)" }}>
                      Sizes: {(() => {
                        try {
                          const sizesList = JSON.parse(product.sizes);
                          return sizesList.length > 0 ? sizesList.join(", ") : "None specified";
                        } catch(e) {
                          return "None specified";
                        }
                      })()}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/admin/products/${product.id}/edit`} style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", color: "var(--color-text)", textDecoration: "none", fontSize: "0.9rem" }}>
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <button type="submit" style={{ color: "var(--color-error)", cursor: "pointer", padding: "0.5rem", background: "rgba(217, 83, 79, 0.1)", borderRadius: "var(--radius-sm)", border: "none" }}>
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              )})
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

import { updateProduct } from "../../actions";
import Button from "@/components/ui/Button";
import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  let imagesRaw = "";
  try {
    const list = JSON.parse(product.images);
    imagesRaw = list.join("\n");
  } catch(e) {}

  let sizesList: string[] = [];
  try {
    sizesList = JSON.parse(product.sizes);
  } catch(e) {}

  // A tiny wrapper action to hit `updateProduct` and then redirect
  // since `updateProduct` only revalidates and we want to go back to `/admin/products`.
  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProduct(formData);
    redirect("/admin/products");
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/products" style={{ color: "var(--color-text-light)", textDecoration: "none" }}>← Back</Link>
        <h1 style={{ fontSize: "2rem" }}>Edit Product: {product.name}</h1>
      </div>

      <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", maxWidth: "800px" }}>
        <form action={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <input type="hidden" name="id" value={product.id} />
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Name</label>
            <input type="text" name="name" defaultValue={product.name} required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Price (Rs.)</label>
            <input type="number" step="0.01" name="price" defaultValue={product.price} required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Category</label>
            <select name="category" defaultValue={product.category} required style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
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
                  <input type="checkbox" name="sizes" value={size} defaultChecked={sizesList.includes(size)} />
                  <span style={{ fontSize: "0.9rem" }}>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Upload New Images</label>
            <input type="file" name="imageFiles" multiple accept="image/*" style={{ width: "100%", padding: "0.5rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Image URLs (One per line)</label>
            <textarea name="images" defaultValue={imagesRaw} rows={4} style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", resize: "vertical" }}></textarea>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Description</label>
            <textarea name="description" defaultValue={product.description} required rows={6} style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", resize: "vertical" }}></textarea>
          </div>

          <Button type="submit" fullWidth size="lg">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}

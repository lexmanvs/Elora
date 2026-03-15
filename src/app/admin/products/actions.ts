"use server"

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imagesRaw = formData.get("images") as string | null;
  const category = formData.get("category") as string;
  const sizesRaw = formData.getAll("sizes") as string[];
  const imageFiles = formData.getAll("imageFiles") as File[];
  
  const uploadedUrls: string[] = [];
  for (const file of imageFiles) {
    if (file instanceof File && file.size > 0 && file.name && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const uploadDir = join(process.cwd(), 'public/uploads/products');
      const filepath = join(uploadDir, filename);
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filepath, buffer);
      uploadedUrls.push(`/uploads/products/${filename}`);
    }
  }

  // Parse newlines to array
  const imagesList = imagesRaw ? imagesRaw.split("\n").map(u => u.trim()).filter(Boolean) : [];
  const allImages = [...uploadedUrls, ...imagesList];

  if (!name || !price || allImages.length === 0) {
    throw new Error("Missing required fields or images");
  }

  const images = JSON.stringify(allImages);
  
  // Serialize sizes array
  const sizes = JSON.stringify(sizesRaw);

  await prisma.product.create({
    data: { name, description, price, images, sizes, category }
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.product.delete({ where: { id } });
  
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imagesRaw = formData.get("images") as string | null;
  const category = formData.get("category") as string;
  const sizesRaw = formData.getAll("sizes") as string[];
  const imageFiles = formData.getAll("imageFiles") as File[];
  
  const uploadedUrls: string[] = [];
  for (const file of imageFiles) {
    if (file instanceof File && file.size > 0 && file.name && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const uploadDir = join(process.cwd(), 'public/uploads/products');
      const filepath = join(uploadDir, filename);
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filepath, buffer);
      uploadedUrls.push(`/uploads/products/${filename}`);
    }
  }

  if (!id || !name || !price) {
    throw new Error("Missing required fields");
  }

  // Parse newlines to array
  const imagesList = imagesRaw ? imagesRaw.split("\n").map(u => u.trim()).filter(Boolean) : [];
  const allImages = [...uploadedUrls, ...imagesList];
  const images = JSON.stringify(allImages);
  
  // Serialize sizes array
  const sizes = JSON.stringify(sizesRaw);

  await prisma.product.update({
    where: { id },
    data: { name, description, price, images, sizes, category }
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

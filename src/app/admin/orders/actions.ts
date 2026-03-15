"use server"

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function updateOrderStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  
  if (!id || !status) return;
  
  await prisma.order.update({
    where: { id },
    data: { status }
  });
  
  revalidatePath("/admin/orders");
}

export async function deleteOrder(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.order.delete({ where: { id } });
  
  revalidatePath("/admin/orders");
}

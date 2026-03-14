import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, address, phone, totalAmount, items } = body;

    // Generate a short, readable order number
    const orderNumber = "ELR-" + uuidv4().substring(0, 8).toUpperCase();

    // Create order in SQLite
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        address,
        phone,
        totalAmount,
        status: "Pending",
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber }, { status: 201 });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

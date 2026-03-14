import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderTrackingPage({ params }: PageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id }
  });

  if (!order) {
    notFound();
  }

  let items = [];
  try {
    items = JSON.parse(order.items);
  } catch (e) {
    console.error("Failed to parse items for order", order.id);
  }

  // Define steps for the progress bar
  const STEPS = ["Pending", "Payment Waiting", "Payment Confirmed", "Order Placed", "Shipped", "Delivered"];
  const currentStepIndex = STEPS.indexOf(order.status);
  const progressPercentage = currentStepIndex >= 0 ? (currentStepIndex / (STEPS.length - 1)) * 100 : 0;

  return (
    <div className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>Order Details</h1>
        <p style={{ color: "var(--color-text-light)" }}>Tracking your Elora package</p>
      </div>

      <div style={{ background: "var(--color-white)", padding: "2.5rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px dashed var(--color-border)" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{order.orderNumber}</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ 
              display: "inline-block",
              padding: "0.5rem 1rem", 
              borderRadius: "2rem", 
              fontSize: "0.9rem",
              fontWeight: "600",
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-primary-dark)"
            }}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Status Pipeline Progress Bar */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: currentStepIndex >= 0 ? "var(--color-text)" : "var(--color-text-light)" }}>Order Placed</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: currentStepIndex >= 4 ? "var(--color-text)" : "var(--color-text-light)" }}>Shipped</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: currentStepIndex >= 5 ? "var(--color-text)" : "var(--color-text-light)" }}>Delivered</span>
          </div>
          <div style={{ height: "6px", backgroundColor: "var(--color-background)", borderRadius: "3px", overflow: "hidden", position: "relative" }}>
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              height: "100%", 
              width: `${progressPercentage}%`, 
              backgroundColor: "var(--color-primary-dark)",
              transition: "width 0.5s ease-in-out"
            }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--color-text-light)", textTransform: "uppercase", letterSpacing: "1px" }}>Order Items</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((item: any, index: number) => (
                <li key={index} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: index < items.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  <div>
                    <span style={{ fontWeight: "500" }}>{item.quantity}x {item.name}</span>
                    {item.size && <span style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginLeft: "0.5rem" }}>(Size: {item.size})</span>}
                  </div>
                  <span style={{ fontWeight: "500" }}>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: "2px solid var(--color-border)", fontSize: "1.2rem", fontWeight: "600" }}>
              <span>Total</span>
              <span>Rs. {order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div>
             <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--color-text-light)", textTransform: "uppercase", letterSpacing: "1px" }}>Delivery Details</h3>
             <div style={{ padding: "1.5rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-sm)" }}>
                <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{order.customerName}</p>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>{order.phone}</p>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{order.address}</p>
             </div>
          </div>
        </div>
        
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link href="/shop" passHref>
             <Button variant="secondary">Continue Shopping</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

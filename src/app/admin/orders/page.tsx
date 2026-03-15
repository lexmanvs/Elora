import prisma from "@/lib/db";
import OrderStatusSelect from "./OrderStatusSelect";
import ShareOrderLink from "./ShareOrderLink";
import CopyTrackingId from "./CopyTrackingId";

export default async function OrdersAdmin() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Order Management</h1>
      </div>

      <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
        
        {orders.length === 0 ? (
          <p style={{ color: "var(--color-text-light)", textAlign: "center", padding: "2rem 0" }}>No orders have been placed yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {orders.map(order => {
              
              // Parse items safely
              let items = [];
              try {
                items = JSON.parse(order.items);
              } catch (e) {
                console.error("Failed to parse items for order", order.id);
              }

              return (
                <div key={order.id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px dashed var(--color-border)" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                        <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Order {order.orderNumber}</h3>
                        <ShareOrderLink orderId={order.id} />
                        <CopyTrackingId trackingId={order.id} />
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "0.5rem" }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--color-primary-dark)" }}>Rs. {order.totalAmount.toFixed(2)}</div>
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", marginBottom: "0.5rem", color: "var(--color-text-light)" }}>Customer Details</h4>
                      <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>{order.customerName}</p>
                      <p style={{ fontSize: "0.9rem", color: "var(--color-text)", marginBottom: "0.25rem" }}>Phone: {order.phone}</p>
                      <p style={{ fontSize: "0.9rem", color: "var(--color-text)", whiteSpace: "pre-wrap" }}>{order.address}</p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.95rem", marginBottom: "0.5rem", color: "var(--color-text-light)" }}>Order Items</h4>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {items.map((item: any, index: number) => (
                          <li key={index} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

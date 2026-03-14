import prisma from "@/lib/db";

export default async function DashboardOverview() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard Overview</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
        <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ color: "var(--color-text-light)", marginBottom: "0.5rem" }}>Total Products</h3>
          <div style={{ fontSize: "3rem", fontWeight: "600", color: "var(--color-primary-dark)" }}>{productsCount}</div>
        </div>
        <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ color: "var(--color-text-light)", marginBottom: "0.5rem" }}>Total Orders</h3>
          <div style={{ fontSize: "3rem", fontWeight: "600", color: "var(--color-primary-dark)" }}>{ordersCount}</div>
        </div>
      </div>

      <div style={{ background: "var(--color-white)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Order No.</th>
                <th style={{ padding: "1rem" }}>Customer</th>
                <th style={{ padding: "1rem" }}>Total</th>
                <th style={{ padding: "1rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--color-secondary)" }}>
                  <td style={{ padding: "1rem" }}>{order.orderNumber}</td>
                  <td style={{ padding: "1rem" }}>{order.customerName}</td>
                  <td style={{ padding: "1rem" }}>Rs. {order.totalAmount.toFixed(2)}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "1rem", 
                      fontSize: "0.85rem",
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary-dark)"
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
}

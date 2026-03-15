import Link from "next/link";
import Button from "@/components/ui/Button";

export default function OrderNotFound() {
  return (
    <div className="container" style={{ padding: "8rem 0", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: "5rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>Tracking ID Not Found</h2>
      
      <p style={{ color: "var(--color-text-light)", maxWidth: "500px", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.6" }}>
        We couldn't find an order with the tracking link you provided. Please double-check the ID or verify that the link hasn't expired.
      </p>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link href="/shop" passHref>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
        <Link href="/shipping" passHref>
          <Button variant="secondary" size="lg">Try Another ID</Button>
        </Link>
      </div>
    </div>
  );
}

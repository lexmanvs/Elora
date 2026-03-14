"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "./actions";

interface Props {
  orderId: string;
  currentStatus: string;
}

const STATUS_OPTIONS = [
  "Pending",
  "Payment Waiting",
  "Payment Confirmed",
  "Order Placed",
  "Shipped",
  "Delivered"
];

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", orderId);
      formData.append("status", newStatus);
      await updateOrderStatus(formData);
    });
  };

  return (
    <select 
      value={currentStatus} 
      onChange={handleChange}
      disabled={isPending}
      style={{
        marginTop: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--color-border)",
        backgroundColor: isPending ? "var(--color-background)" : "var(--color-secondary)",
        color: "var(--color-primary-dark)",
        fontSize: "0.85rem",
        fontWeight: "500",
        cursor: isPending ? "not-allowed" : "pointer",
        appearance: "auto", 
        minWidth: "160px"
      }}
    >
      {STATUS_OPTIONS.map(status => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
}

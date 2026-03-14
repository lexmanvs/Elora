"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface Props {
  orderId: string;
}

export default function ShareOrderLink({ orderId }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // In a real production app, you might want to dynamically get the origin.
      // E.g., const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${window.location.origin}/order/${orderId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      title="Copy Link to Clipboard"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.35rem",
        padding: "0.4rem 0.75rem",
        backgroundColor: copied ? "var(--color-secondary)" : "var(--color-background)",
        color: copied ? "var(--color-primary-dark)" : "var(--color-text)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.8rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all var(--transition-fast)"
      }}
    >
      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}

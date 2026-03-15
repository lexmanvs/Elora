"use client";

import { useState } from "react";
import { FiHash, FiCheck } from "react-icons/fi";

interface Props {
  trackingId: string;
}

export default function CopyTrackingId({ trackingId }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      title="Copy Tracking ID"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.35rem",
        padding: "0.4rem 0.75rem",
        backgroundColor: copied ? "var(--color-secondary)" : "var(--color-white)",
        color: copied ? "var(--color-primary-dark)" : "var(--color-text)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.8rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all var(--transition-fast)"
      }}
    >
      {copied ? <FiCheck size={14} /> : <FiHash size={14} />}
      {copied ? "ID Copied!" : "Copy ID"}
    </button>
  );
}

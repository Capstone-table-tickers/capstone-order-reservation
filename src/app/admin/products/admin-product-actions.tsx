"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminProductActionsProps {
  productId: string;
  productName: string;
}

export function AdminProductActions({ productId, productName }: AdminProductActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate "${productName}"? It will be hidden from customers but not permanently deleted.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to deactivate product. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-400 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 disabled:opacity-50"
    >
      {isDeleting ? "…" : "Deactivate"}
    </button>
  );
}

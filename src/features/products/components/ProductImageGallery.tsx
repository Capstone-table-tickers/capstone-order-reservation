"use client";

import { useState } from "react";
import Image from "next/image";
import type { PublicProductImage } from "../types";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=800&q=80";

interface ProductImageGalleryProps {
  images: PublicProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  // Sort: primary first, then gallery
  const sorted = [
    ...images.filter((img) => img.isPrimary),
    ...images.filter((img) => !img.isPrimary),
  ];

  const displayImages = sorted.length > 0 ? sorted : [{ id: "placeholder", url: PLACEHOLDER, isPrimary: true }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = displayImages[activeIndex] ?? displayImages[0];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
        <Image
          key={activeImage.url}
          src={activeImage.url}
          alt={`${productName} — image ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {images.length === 0 && (
          <div className="absolute inset-0 flex items-end justify-start p-4">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
              No image available
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails — only show when there are multiple images */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition ${
                index === activeIndex
                  ? "ring-2 ring-[var(--color-brand-600)] ring-offset-2"
                  : "opacity-60 hover:opacity-90"
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <Image
                src={image.url}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

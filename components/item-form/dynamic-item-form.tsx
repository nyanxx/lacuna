"use client";
import dynamic from "next/dynamic";
export const CreateItemForm = dynamic(
  () => import("@/components/item-form/create-item-form"),
  {
    ssr: false,
  },
);

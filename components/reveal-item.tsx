"use client";
import React, { createContext, useContext, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { LacunaItem } from "@/app/types";
import dynamic from "next/dynamic";
const ContentViewer = dynamic(() => import("@/components/lacuna-item-view"), {
  ssr: false,
});

type RevealContextType = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const RevealContext = createContext<RevealContextType | undefined>(undefined);

export function RevealProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <RevealContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </RevealContext.Provider>
  );
}

function RevealItem({ item }: { item: LacunaItem }) {
  const context = useContext(RevealContext);
  if (!context) {
    throw new Error("RevealItem must be used within a RevealProvider");
  }

  if (!context.isVisible) return null;

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="max-w-5xl mx-auto px-4 my-10">
          <ContentViewer content={item.content} />
        </div>
      </CardContent>
    </Card>
  );
}

export function RevealAction() {
  const context = useContext(RevealContext);
  if (!context) {
    throw new Error("RevealAction must be used within a RevealProvider");
  }

  return (
    <Button
      type="button"
      variant={context.isVisible ? "outline" : "default"}
      onClick={() => context.setIsVisible(!context.isVisible)}
    >
      {context.isVisible ? "Hide" : "I did my best"}
    </Button>
  );
}

export default RevealItem;

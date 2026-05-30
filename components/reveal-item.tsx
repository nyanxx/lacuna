"use client";
import React, { createContext, useContext, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

function RevealItem({ content }: { content: string }) {
  const context = useContext(RevealContext);
  if (!context) {
    throw new Error("RevealItem must be used within a RevealProvider");
  }

  if (!context.isVisible) return null;

  return (
    <Card>
      <CardContent className="pt-4">{content}</CardContent>
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

"use client"

import { Button } from "@/components/ui/button";
import { LucideCoffee } from "lucide-react";

export default function BuyMeCoffeeButton({ 
  username = "asimdevprov", 
  variant = "default", 
  size = "default",
  className = "" 
}) {
  return (
    <Button 
      asChild 
      variant={variant}
      size={size}
      className={`bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 border-[#FFDD00] ${className}`}
    >
      <a 
        href={`https://www.buymeacoffee.com/${username}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <LucideCoffee className="h-4 w-4" />
        Buy Me a Coffee
      </a>
    </Button>
  );
}
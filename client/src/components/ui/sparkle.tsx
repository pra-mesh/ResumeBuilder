"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SparkleProps {
  onClick: () => Promise<void>;
  tooltip?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Sparkle({
  onClick,
  tooltip = "AI Assistant - Click to generate content",
  className,
  size = "sm",
}: SparkleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const buttonSizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "p-0 hover:bg-primary/10 transition-all duration-200 hover:scale-110",
              buttonSizeClasses[size],
              className
            )}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2
                className={cn("animate-spin text-primary", sizeClasses[size])}
              />
            ) : (
              <Sparkles
                className={cn(
                  "text-primary hover:text-primary/80",
                  sizeClasses[size]
                )}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

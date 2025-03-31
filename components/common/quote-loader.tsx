import { cn } from "@/lib/utils";
import React from "react";
import { PiSpinnerGap } from "react-icons/pi";

interface QuoteLoaderProps {
  className?: string;
}

const QuoteLoader: React.FC<QuoteLoaderProps> = ({ className }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col gap-2">
      <PiSpinnerGap
        className={cn(
          "animate-spin size-5 font-semibold text-neutral-800 dark:text-neutral-300",
          className
        )}
      />
      <span className="text-neutral-950 dark:text-neutral-100 font-semibold">Loading...</span>
    </div>
  );
};

export default QuoteLoader;

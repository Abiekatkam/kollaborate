import { cn } from "@/lib/utils";
import { PiSpinnerGap } from "react-icons/pi";

interface CircleLoaderProps {
  className?: string;
  text: string;
}

const CircleLoader: React.FC<CircleLoaderProps> = ({ className, text }) => {
  return (
    <>
      <PiSpinnerGap
        className={cn(
          "animate-spin size-5 font-semibold text-neutral-800 dark:text-neutral-300",
          className
        )}
      />
      {text && (
        <span className="text-sm italic text-neutral-400 dark:text-neutral-500">
          {text}
        </span>
      )}
    </>
  );
};

export default CircleLoader;

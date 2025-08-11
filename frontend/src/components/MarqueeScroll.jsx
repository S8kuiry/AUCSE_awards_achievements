import React from "react";
import { twMerge } from "tailwind-merge";

export function MarqueeScroll({
  className,
  direction = "left",
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  const isReverse = direction === "right";

  return (
    <div
      {...props}
      className={twMerge(
        "group relative overflow-hidden",
        vertical ? "h-full" : "w-full",
        className
      )}
    >
      <div
        className={twMerge(
          "flex w-max",
          vertical ? "flex-col" : "flex-row",
          isReverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-6 mx-6">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

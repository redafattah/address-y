"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PriceSlider({ value, onChange }: PriceSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full py-8 px-8 border">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">Prix / nuitée</span>
        <span className="text-sm font-semibold text-primary">{value} MAD</span>
      </div>

      <SliderPrimitive.Root
        value={[value]}
        onValueChange={(val: number[]) => onChange(val[0])}
        min={100}
        max={5000}
        step={50}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Badge className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-5">
            {value} MAD
            <div className="absolute border-[6px] left-1/2 -translate-x-1/2 border-transparent border-t-primary top-full" />
          </Badge>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>

      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>100 MAD</span>
        <span>5000 MAD</span>
      </div>
    </div>
  );
}

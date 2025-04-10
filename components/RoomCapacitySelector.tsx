"use client";

import { Bed, Bath, User, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomCapacitySelectorProps {
  beds: number;
  baths: number;
  guests: number;
  onChange: (data: { beds: number; baths: number; guests: number }) => void;
}

export default function RoomCapacitySelector({
  beds,
  baths,
  guests,
  onChange,
}: RoomCapacitySelectorProps) {
  const handleChange = (key: "beds" | "baths" | "guests", value: number) => {
    onChange({ beds, baths, guests, [key]: value });
  };

  const renderCounter = (
    label: string,
    Icon: React.ElementType,
    key: "beds" | "baths" | "guests",
    value: number,
    min: number = 0
  ) => (
    <div className="flex items-center justify-between border rounded-lg px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="w-7 h-7"
          onClick={() => handleChange(key, Math.max(min, value - 1))}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-6 text-center">{value}</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="w-7 h-7"
          onClick={() => handleChange(key, value + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {renderCounter("Beds", Bed, "beds", beds)}
      {renderCounter("Baths", Bath, "baths", baths)}
      {renderCounter("Guests", User, "guests", guests, 1)}
    </div>
  );
}

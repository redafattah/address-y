"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tangier",
  "Agadir",
  "Fes",
  "Oujda",
  "Tetouan",
];

const formatDate = (date: Date | undefined) =>
  date ? format(date, "MMM dd, yyyy") : "";

export const SearchFilter = () => {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState("");
  const [guestFilter, setGuestFilter] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (selectedCity) query.append("city", selectedCity);
    if (guestFilter) query.append("guests", guestFilter.toString());
    if (dateRange?.from) query.append("from", dateRange.from.toISOString());
    if (dateRange?.to) query.append("to", dateRange.to.toISOString());

    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <div className="w-full bg-white border rounded-xl shadow-md p-6 space-y-4 md:space-y-0 md:flex md:items-end md:flex-wrap md:gap-4">
      {/* City Selector */}
      <div className="w-full md:w-[200px] text-black">
        <label className="block text-sm font-medium text-gray-700 mb-1">Où allez vous ?</label>
        <Select onValueChange={setSelectedCity} value={selectedCity}>
          <SelectTrigger className="w-full h-11 px-4">
            <SelectValue placeholder="Select your stay" />
          </SelectTrigger>
          <SelectContent >
            {moroccanCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Guests Selector */}
      <div className="w-full md:w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <Select onValueChange={(val) => setGuestFilter(Number(val))} value={guestFilter?.toString() ?? ""}>
          <SelectTrigger className="w-full h-11 px-4 text-black">
            <SelectValue placeholder="Guests" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(8).keys()].map((num) => (
              <SelectItem key={num + 1} value={(num + 1).toString()}>
                {num + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="w-full md:w-[300px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex gap-2">
              <Input
                placeholder="Arrivée"
                value={dateRange?.from ? formatDate(dateRange.from) : ""}
                readOnly
                className="h-11 text-black"
              />
              <Input
                placeholder="Départ"
                value={dateRange?.to ? formatDate(dateRange.to) : ""}
                readOnly
                className="h-11 text-black"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-4">
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto">
        <Button onClick={handleSearch} className="w-full md:w-auto h-11">
          Search
        </Button>
      </div>
    </div>
  );
};

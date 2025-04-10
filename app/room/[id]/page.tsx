"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { supabase } from "@/lib/supabaseClient";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  guests: number;
  cover_image_url: string;
  image_urls: string[];
  available_from: string;
  available_to: string;
  description: string;
}

const RoomDetailsPage = () => {
  const params = useParams();
  const roomIdParam = params.id;
  const roomId = typeof roomIdParam === "string" ? parseInt(roomIdParam, 10) : NaN;

  const [room, setRoom] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedGuests, setSelectedGuests] = useState<number>(1);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 10 },
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", roomId)
        .single();

      if (error) {
        console.error("Failed to fetch listing:", error.message);
      } else {
        setRoom(data);
        setDateRange({
          from: new Date(data.available_from),
          to: new Date(data.available_to),
        });
      }
      setLoading(false);
    };

    if (!isNaN(roomId)) {
      fetchRoom();
    }
  }, [roomId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!room) return <div className="p-6 text-center">Room not found.</div>;

  const availableFrom = new Date(room.available_from);
  const availableTo = new Date(room.available_to);

  const formatDate = (date: Date | undefined) =>
    date && !isNaN(date.getTime()) ? format(date, "yyyy-MM-dd") : "";

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24)
        )
      : 0;

  const totalPrice = nights * room.price * selectedGuests;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Image Carousel */}
      <div className="relative mb-8">
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {[room.cover_image_url, ...(room.image_urls || [])].map((src, i) => (
            <div
              key={i}
              className="keen-slider__slide relative h-[250px] sm:h-[300px] md:h-[400px]"
            >
              <Image
                src={src}
                alt={`${room.title} image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Info Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">{room.title}</h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-1">{room.address}</p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                fill={i < 4 ? "currentColor" : "none"}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-1">(120 reviews)</span>
          </div>

          <p className="mb-6 text-sm sm:text-base text-gray-800">{room.description}</p>

          {/* Calendar Viewer */}
          <div className="mb-6 w-fit border-none shadow-none">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Disponibilité</h3>
            <DayPicker
              mode="single"
              selected={undefined}
              numberOfMonths={isMobile ? 1 : 2}
              disabled={(date) => date < availableFrom || date > availableTo}
              modifiers={{
                available: { from: availableFrom, to: availableTo },
              }}
              modifiersStyles={{
                available: { backgroundColor: "#e0f7fa", color: "#006064" },
              }}
              className="!text-gray-900 border-none rounded-md p-2 bg-white shadow-none"
            />
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="w-full lg:w-1/3 border rounded-xl shadow-lg p-4 sm:p-6 h-fit space-y-5">
          <p className="text-lg sm:text-xl font-semibold">
            {room.price} Dh{" "}
            <span className="text-sm font-normal text-muted-foreground">/ night</span>
          </p>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Arrivée"
                    value={formatDate(dateRange?.from)}
                    readOnly
                    className="h-11"
                  />
                  <Input
                    placeholder="Départ"
                    value={formatDate(dateRange?.to)}
                    readOnly
                    className="h-11"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-4">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={isMobile ? 1 : 2}
                  disabled={{ before: availableFrom, after: availableTo }}
                  className="!text-gray-900"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <Select
              onValueChange={(value) => setSelectedGuests(Number(value))}
              defaultValue="1"
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue
                  placeholder={`${selectedGuests} Guest${selectedGuests > 1 ? "s" : ""}`}
                />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10).keys()].map((num) => (
                  <SelectItem key={num + 1} value={(num + 1).toString()}>
                    {num + 1} Guest{num + 1 > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Guests: <strong>{selectedGuests}</strong></p>
            <p>
              Dates:{" "}
              {dateRange?.from && dateRange?.to
                ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                : "Select dates"}
            </p>
          </div>

          {nights > 0 && (
            <div className="text-sm">
              <p className="mb-1"><strong>Total nights:</strong> {nights}</p>
              <p className="font-semibold text-base sm:text-lg">Total: {totalPrice} Dh</p>
            </div>
          )}

          <Link
            href={{
              pathname: `/booking/${room.id}`,
              query: {
                from: dateRange?.from?.toISOString().split("T")[0],
                to: dateRange?.to?.toISOString().split("T")[0],
                guests: selectedGuests,
              },
            }}
          >
            <Button
              className="w-full h-11"
              disabled={!dateRange?.from || !dateRange?.to}
            >
              Réserver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
